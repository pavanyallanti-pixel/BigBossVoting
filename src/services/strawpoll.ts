import { PollResults, StrawPollError } from '../types/strawpoll';

const STRAWPOLL_API_BASE = 'https://api.strawpoll.com/v3';

/**
 * Fetch poll results from StrawPoll API
 * @param pollId - The StrawPoll poll ID (e.g., "w4nWWboJWnA")
 * @returns Poll results including vote counts for each option
 */
export async function fetchPollResults(pollId: string): Promise<PollResults> {
    try {
        const response = await fetch(`${STRAWPOLL_API_BASE}/polls/${pollId}/results`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error: StrawPollError = await response.json();
            throw new Error(error.message || `Failed to fetch poll results: ${response.status}`);
        }

        const data: PollResults = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching poll results:', error);
        throw error;
    }
}

/**
 * Map poll options to contestants by matching names
 * This assumes poll option values contain contestant names
 */
export function mapPollResultsToContestants(pollResults: PollResults) {
    return pollResults.poll_options
        .map(option => ({
            name: option.value,
            voteCount: option.vote_count,
            percentage: pollResults.vote_count > 0
                ? ((option.vote_count / pollResults.vote_count) * 100).toFixed(1)
                : '0.0'
        }))
        .sort((a, b) => b.voteCount - a.voteCount);
}
