import { useState, useEffect, useCallback } from 'react';
import { BarChart3, RefreshCw, AlertCircle, Activity, TrendingUp } from 'lucide-react';
import { contestants } from '../data/contestants';
import { SEO } from '../components/SEO';

interface PollOption {
    value: string;
    vote_count: number;
}

interface StrawPollResponse {
    id: string;
    poll_options: PollOption[];
    vote_count: number;
    last_vote_at: number;
}

interface PollResult {
    name: string;
    voteCount: number;
    percentage: string;
}

const POLL_ID = "w4nWWboJWnA";

export const ResultsPage = () => {
    const [pollData, setPollData] = useState<PollResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalVotes, setTotalVotes] = useState(0);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const loadPollResults = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.strawpoll.com/v3/polls/${POLL_ID}/results`);

            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }

            const data: StrawPollResponse = await response.json();

            // Map API data to our format
            const results = data.poll_options.map(option => ({
                name: option.value,
                voteCount: option.vote_count
            }));

            const total = data.vote_count;

            // Sort by vote count descending
            const sortedResults = results.sort((a, b) => b.voteCount - a.voteCount);

            setPollData(sortedResults.map(item => ({
                name: item.name,
                voteCount: item.voteCount,
                percentage: total > 0 ? ((item.voteCount / total) * 100).toFixed(1) : "0.0"
            })));

            setTotalVotes(total);
            setLastUpdated(new Date());

        } catch (err) {
            console.error(err);
            setError('Failed to load live results. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPollResults();
        const interval = setInterval(loadPollResults, 30000);
        return () => clearInterval(interval);
    }, [loadPollResults]);

    const topPerformer = pollData[0];
    const dangerZone = pollData.slice(-2);

    return (
        <div className="flex flex-col gap-8 py-12">
            <SEO
                title="Voting Results - Bigg Boss 9 Telugu"
                description="Check real-time voting trends for Bigg Boss Telugu Season 9. See who is leading and who is in the danger zone."
            />

            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Voting Trends</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Real-time voting trends and analysis. See who is leading the race and who is in the danger zone.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Chart */}
                    <div className="lg:col-span-2 card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary-500" /> Vote Share
                            </h3>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-400">
                                    Updated {lastUpdated.toLocaleTimeString()}
                                </span>
                                <button
                                    onClick={loadPollResults}
                                    disabled={loading}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                    title="Refresh results"
                                >
                                    <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-red-800">Error loading results</p>
                                    <p className="text-xs text-red-600 mt-1">{error}</p>
                                </div>
                            </div>
                        )}

                        {loading && pollData.length === 0 ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
                                    <p className="text-gray-500">Loading poll results...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {pollData.map((item, index) => {
                                    const isDanger = index >= pollData.length - 2;
                                    const isLeading = index === 0;
                                    // Fuzzy match contestant name
                                    const contestant = contestants.find(c =>
                                        item.name.toLowerCase().includes(c.name.toLowerCase()) ||
                                        c.name.toLowerCase().includes(item.name.toLowerCase())
                                    );

                                    return (
                                        <div key={item.name} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    {contestant && (
                                                        <img
                                                            src={contestant.imageUrl}
                                                            alt={item.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    )}
                                                    <span className="font-medium text-gray-700">{item.name}</span>
                                                    {isLeading && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                                                            Leading
                                                        </span>
                                                    )}
                                                    {isDanger && (
                                                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                                            Danger Zone
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                                                    <span className="text-xs text-gray-400 ml-2">({(item.voteCount || 0).toLocaleString()} votes)</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${isDanger ? 'bg-red-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Live Activity */}
                        <div className="card bg-primary-700 text-white border-none">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 animate-pulse" /> Live Activity
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-primary-200 text-sm">Total Votes</span>
                                    <span className="text-3xl font-bold">{totalVotes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-primary-200 text-sm">Poll ID</span>
                                    <span className="text-sm font-mono">{POLL_ID}</span>
                                </div>
                            </div>

                            {topPerformer && (
                                <div className="mt-6 bg-primary-800 rounded-lg p-4">
                                    <p className="text-xs text-primary-200 mb-2">Top Performer</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white text-primary-700 flex items-center justify-center font-bold text-sm">
                                            {contestants.find(c => topPerformer.name.toLowerCase().includes(c.name.toLowerCase()))?.initials || topPerformer.name.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{topPerformer.name}</p>
                                            <p className="text-xs text-primary-300">
                                                {(topPerformer.voteCount || 0).toLocaleString()} votes ({topPerformer.percentage}%)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Analysis */}
                        <div className="card">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary-500" /> Analysis
                            </h3>
                            <ul className="text-sm text-gray-600 space-y-3">
                                {topPerformer && (
                                    <li className="flex gap-2">
                                        <span className="text-green-500 font-bold">•</span>
                                        <span><strong>{topPerformer.name}</strong> is currently leading with {topPerformer.percentage}% of votes.</span>
                                    </li>
                                )}
                                {dangerZone.length > 0 && (
                                    <li className="flex gap-2">
                                        <span className="text-red-500 font-bold">•</span>
                                        <span><strong>{dangerZone[dangerZone.length - 1]?.name}</strong> is in the danger zone and needs more votes.</span>
                                    </li>
                                )}
                                <li className="flex gap-2">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span>Results update automatically every 30 seconds.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
