import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Discussion, Vote } from '../types/discussion';

// Supabase client - reads from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

const POLL_ID = 'biggboss9';

// Session ID management
function getSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}

/**
 * Fetch all discussions for the poll
 */
export async function fetchDiscussions(): Promise<Discussion[]> {
    const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .eq('poll_id', POLL_ID)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching discussions:', error);
        throw error;
    }

    return data || [];
}

/**
 * Post a new comment or reply
 */
export async function postComment(
    authorName: string,
    text: string,
    authorEmail?: string,
    parentId?: string,
    parentType?: string
): Promise<Discussion> {
    const discussion: Partial<Discussion> = {
        poll_id: POLL_ID,
        author_name: authorName,
        author_email: authorEmail,
        text: text,
        parent_id: parentId || null,
        parent_type: parentType || null,
        item_type: parentId ? 'reply' : 'comment',
    };

    const { data, error } = await supabase
        .from('discussions')
        .insert([discussion])
        .select()
        .single();

    if (error) {
        console.error('Error posting comment:', error);
        throw error;
    }

    return data;
}

/**
 * Fetch all votes for the poll
 */
export async function fetchVotes(): Promise<Vote[]> {
    const { data, error } = await supabase
        .from('votes')
        .select('*');

    if (error) {
        console.error('Error fetching votes:', error);
        throw error;
    }

    return data || [];
}

/**
 * Toggle vote (like/dislike) for a discussion
 * Based on UNIQUE constraint (discussion_id, session_id, vote_type)
 */
export async function toggleVote(
    discussionId: string,
    voteType: 'like' | 'dislike'
): Promise<void> {
    const sessionId = getSessionId();

    // Check for existing vote of this type
    const { data: existingVotes } = await supabase
        .from('votes')
        .select('*')
        .eq('discussion_id', discussionId)
        .eq('session_id', sessionId)
        .eq('vote_type', voteType);

    if (existingVotes && existingVotes.length > 0) {
        // Remove vote if clicking same button
        await supabase
            .from('votes')
            .delete()
            .eq('discussion_id', discussionId)
            .eq('session_id', sessionId)
            .eq('vote_type', voteType);
    } else {
        // Remove opposite vote type if exists
        const oppositeType = voteType === 'like' ? 'dislike' : 'like';
        await supabase
            .from('votes')
            .delete()
            .eq('discussion_id', discussionId)
            .eq('session_id', sessionId)
            .eq('vote_type', oppositeType);

        // Add new vote
        await supabase.from('votes').insert([{
            discussion_id: discussionId,
            session_id: sessionId,
            vote_type: voteType,
        }]);
    }
}

/**
 * Subscribe to realtime updates for discussions and votes
 */
export function subscribeToRealtime(
    onDiscussionChange: () => void,
    onVoteChange: () => void
): { discussionsChannel: RealtimeChannel; votesChannel: RealtimeChannel } {

    // Subscribe to discussions INSERT events
    const discussionsChannel = supabase
        .channel('discussions-channel')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'discussions'
            },
            (payload) => {
                console.log('New discussion received:', payload);
                onDiscussionChange();
            }
        )
        .subscribe((status) => {
            console.log('Discussions channel status:', status);
        });

    // Subscribe to votes INSERT and DELETE events
    const votesChannel = supabase
        .channel('votes-channel')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'votes'
            },
            (payload) => {
                console.log('New vote received:', payload);
                onVoteChange();
            }
        )
        .on(
            'postgres_changes',
            {
                event: 'DELETE',
                schema: 'public',
                table: 'votes'
            },
            (payload) => {
                console.log('Vote removed:', payload);
                onVoteChange();
            }
        )
        .subscribe((status) => {
            console.log('Votes channel status:', status);
        });

    return { discussionsChannel, votesChannel };
}

/**
 * Unsubscribe from realtime channels
 */
export function unsubscribeFromRealtime(
    discussionsChannel: RealtimeChannel | null,
    votesChannel: RealtimeChannel | null
): void {
    if (discussionsChannel) {
        supabase.removeChannel(discussionsChannel);
    }
    if (votesChannel) {
        supabase.removeChannel(votesChannel);
    }
}
