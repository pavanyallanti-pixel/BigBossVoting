// StrawPoll API v3 Types
export interface PollOption {
    id: string;
    value: string;
    description: string | null;
    vote_count: number;
    position: number;
    has_votes: boolean;
    is_write_in: boolean;
    max_votes: number;
    type: string;
    uuid: string;
}

export interface PollResults {
    id: string;
    poll_options: PollOption[];
    vote_count: number; // Total votes in the poll
    last_vote_at: number;
    participant_count: number;
    results_key: string;
    version: string;
}

export interface StrawPollError {
    error: string;
    message: string;
}
