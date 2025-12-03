export interface Discussion {
    id: string;
    created_at: string;
    author_name: string;
    author_email?: string;
    text: string;
    parent_id: string | null;
    parent_type: string | null;
    item_type: 'comment' | 'reply';
    poll_id: string;
}

export interface Vote {
    id: string;
    created_at: string;
    discussion_id: string;
    session_id: string;
    vote_type: 'like' | 'dislike';
}

export interface VoteCount {
    likes: number;
    dislikes: number;
    user_vote: 'like' | 'dislike' | null;
}
