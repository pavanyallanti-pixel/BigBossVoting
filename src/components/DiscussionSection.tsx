import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Send, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';
import { fetchDiscussions, fetchVotes, postComment, toggleVote, subscribeToRealtime, unsubscribeFromRealtime } from '../services/supabase';
import { Discussion, Vote } from '../types/discussion';
import { RealtimeChannel } from '@supabase/supabase-js';

export const DiscussionSection = () => {
    const [discussions, setDiscussions] = React.useState<Discussion[]>([]);
    const [votes, setVotes] = React.useState<Vote[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [submitting, setSubmitting] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    // Form state
    const [commentText, setCommentText] = React.useState('');
    const [authorName, setAuthorName] = React.useState('');
    const [authorEmail, setAuthorEmail] = React.useState('');

    // Reply state
    const [replyTo, setReplyTo] = React.useState<{ id: string; name: string } | null>(null);

    // Collapsed threads
    const [collapsedThreads, setCollapsedThreads] = React.useState<Set<string>>(new Set());

    // Realtime channels
    const discussionsChannelRef = React.useRef<RealtimeChannel | null>(null);
    const votesChannelRef = React.useRef<RealtimeChannel | null>(null);

    const MAX_CHARS = 700;

    const loadDiscussions = React.useCallback(async () => {
        try {
            const discussionsData = await fetchDiscussions();
            setDiscussions(discussionsData);
        } catch (error) {
            console.error('Failed to load discussions:', error);
        }
    }, []);

    const loadVotes = React.useCallback(async () => {
        try {
            const votesData = await fetchVotes();
            setVotes(votesData);
        } catch (error) {
            console.error('Failed to load votes:', error);
        }
    }, []);

    const loadAll = React.useCallback(async () => {
        setLoading(true);
        await Promise.all([loadDiscussions(), loadVotes()]);
        setLoading(false);
    }, [loadDiscussions, loadVotes]);

    React.useEffect(() => {
        loadAll();

        // Subscribe to realtime updates
        const { discussionsChannel, votesChannel } = subscribeToRealtime(
            () => loadDiscussions(),
            () => loadVotes()
        );

        discussionsChannelRef.current = discussionsChannel;
        votesChannelRef.current = votesChannel;

        // Cleanup on unmount
        return () => {
            unsubscribeFromRealtime(discussionsChannelRef.current, votesChannelRef.current);
        };
    }, [loadAll, loadDiscussions, loadVotes]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !authorName.trim()) return;

        try {
            setSubmitting(true);
            await postComment(
                authorName,
                commentText,
                authorEmail || undefined,
                replyTo?.id,
                replyTo ? 'comment' : undefined
            );

            // Reset form
            setCommentText('');
            setAuthorName('');
            setAuthorEmail('');
            setReplyTo(null);

            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

            // Realtime will handle the update
        } catch (error) {
            console.error('Failed to post comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (discussionId: string, voteType: 'like' | 'dislike') => {
        try {
            await toggleVote(discussionId, voteType);
            // Realtime will handle the update
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    const getVoteCount = (discussionId: string) => {
        const sessionId = localStorage.getItem('sessionId');
        const discussionVotes = votes.filter(v => v.discussion_id === discussionId);
        const likes = discussionVotes.filter(v => v.vote_type === 'like').length;
        const dislikes = discussionVotes.filter(v => v.vote_type === 'dislike').length;
        const userVote = discussionVotes.find(v => v.session_id === sessionId);

        return { likes, dislikes, userVote: userVote?.vote_type || null };
    };

    const getRelativeTime = (timestamp: string) => {
        const now = Date.now();
        const then = new Date(timestamp).getTime();
        const diff = now - then;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const toggleCollapse = (id: string) => {
        setCollapsedThreads(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const topLevelComments = discussions.filter(d => !d.parent_id);
    const getReplies = (parentId: string) => discussions.filter(d => d.parent_id === parentId);

    const renderReplies = (parentId: string, level: number = 1): JSX.Element[] => {
        const replies = getReplies(parentId);
        if (replies.length === 0) return [];

        return replies.map(reply => {
            const voteCounts = getVoteCount(reply.id);
            const nestedReplies = getReplies(reply.id);
            const isCollapsed = collapsedThreads.has(reply.id);
            const initials = reply.author_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

            return (
                <div key={reply.id} className={`ml-${Math.min(level * 4, 12)} border-l-2 border-gray-200 pl-4 mt-4`}>
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {initials}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">{reply.author_name}</span>
                                <span className="text-xs text-gray-400">{getRelativeTime(reply.created_at)}</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{reply.text}</p>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleVote(reply.id, 'like')}
                                    className={`flex items-center gap-1 text-xs transition-colors ${voteCounts.userVote === 'like' ? 'text-primary-600 font-medium' : 'text-gray-500 hover:text-primary-600'}`}
                                >
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{voteCounts.likes}</span>
                                </button>
                                <button
                                    onClick={() => handleVote(reply.id, 'dislike')}
                                    className={`flex items-center gap-1 text-xs transition-colors ${voteCounts.userVote === 'dislike' ? 'text-red-600 font-medium' : 'text-gray-500 hover:text-red-600'}`}
                                >
                                    <ThumbsDown className="w-3 h-3" />
                                    <span>{voteCounts.dislikes}</span>
                                </button>
                                {level < 3 && (
                                    <button
                                        onClick={() => setReplyTo({ id: reply.id, name: reply.author_name })}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                                    >
                                        <MessageCircle className="w-3 h-3" />
                                        Reply
                                    </button>
                                )}
                            </div>

                            {nestedReplies.length > 0 && (
                                <>
                                    <button
                                        onClick={() => toggleCollapse(reply.id)}
                                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 mt-2"
                                    >
                                        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                        <span>{nestedReplies.length} {nestedReplies.length === 1 ? 'reply' : 'replies'}</span>
                                    </button>
                                    {!isCollapsed && renderReplies(reply.id, level + 1)}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-primary-500" />
                    <h2 className="text-2xl font-bold">Live Discussions</h2>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        {topLevelComments.length}
                    </span>
                </div>
                <button
                    onClick={loadAll}
                    disabled={loading}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    title="Refresh comments"
                >
                    <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment posted successfully!</span>
                </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                {replyTo && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                        <span className="text-blue-800">Replying to <strong>{replyTo.name}</strong></span>
                        <button
                            type="button"
                            onClick={() => setReplyTo(null)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                <div className="relative">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value.slice(0, MAX_CHARS))}
                        placeholder="Join the discussion..."
                        className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        rows={3}
                        required
                    />
                    <span className={`absolute bottom-3 right-3 text-xs ${commentText.length > MAX_CHARS * 0.9 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                        {commentText.length}/{MAX_CHARS}
                    </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Your Name *"
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                    />
                    <input
                        type="email"
                        value={authorEmail}
                        onChange={(e) => setAuthorEmail(e.target.value)}
                        placeholder="Email (optional)"
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting || !commentText.trim() || !authorName.trim()}
                    className="btn btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? (
                        <><RefreshCw className="w-5 h-5 animate-spin" /> Posting...</>
                    ) : (
                        <><Send className="w-5 h-5" /> Post Comment</>
                    )}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
                {loading && discussions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-500" />
                        <p>Loading discussions...</p>
                    </div>
                ) : topLevelComments.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💭</div>
                        <p className="text-gray-500">No discussions yet. Be the first to comment!</p>
                    </div>
                ) : (
                    topLevelComments.map(comment => {
                        const voteCounts = getVoteCount(comment.id);
                        const replies = getReplies(comment.id);
                        const isCollapsed = collapsedThreads.has(comment.id);
                        const initials = comment.author_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                        return (
                            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {initials}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">{comment.author_name}</span>
                                            <span className="text-xs text-gray-400">{getRelativeTime(comment.created_at)}</span>
                                        </div>
                                        <p className="text-gray-700 mb-3">{comment.text}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleVote(comment.id, 'like')}
                                                className={`flex items-center gap-1 text-sm transition-colors ${voteCounts.userVote === 'like' ? 'text-primary-600 font-medium' : 'text-gray-500 hover:text-primary-600'}`}
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>{voteCounts.likes}</span>
                                            </button>
                                            <button
                                                onClick={() => handleVote(comment.id, 'dislike')}
                                                className={`flex items-center gap-1 text-sm transition-colors ${voteCounts.userVote === 'dislike' ? 'text-red-600 font-medium' : 'text-gray-500 hover:text-red-600'}`}
                                            >
                                                <ThumbsDown className="w-4 h-4" />
                                                <span>{voteCounts.dislikes}</span>
                                            </button>
                                            <button
                                                onClick={() => setReplyTo({ id: comment.id, name: comment.author_name })}
                                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Reply
                                            </button>
                                        </div>

                                        {/* Replies */}
                                        {replies.length > 0 && (
                                            <>
                                                <button
                                                    onClick={() => toggleCollapse(comment.id)}
                                                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mt-4"
                                                >
                                                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
                                                </button>
                                                {!isCollapsed && renderReplies(comment.id)}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
