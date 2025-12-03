import React from 'react';
import { ContestantCard } from '../components/ContestantCard';
import { DiscussionSection } from '../components/DiscussionSection';
import { contestants } from '../data/contestants';
import { Search } from 'lucide-react';
import { SEO } from '../components/SEO';

export const VotingPage = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filter, setFilter] = React.useState<'all' | 'active' | 'eliminated'>('active');

    const filteredContestants = contestants.filter(contestant => {
        const matchesSearch = contestant.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || contestant.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex flex-col gap-8 py-12">
            <SEO
                title="Vote Now"
                description="Cast your vote for Bigg Boss Telugu 9 nominees. Participate in the official poll and save your favorite contestant from eviction."
            />
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Vote for Your Favorite</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Cast your vote in the official poll below. You can also explore the contestant profiles and join the discussion.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: Poll + Nominees */}
                    <div className="space-y-8">
                        {/* Poll Embed */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100" style={{ height: '600px' }}>
                            <iframe
                                src="https://strawpoll.com/embed/w4nWWboJWnA"
                                title="Voting Poll"
                                loading="lazy"
                                className="w-full h-full border-0"
                                allowFullScreen
                                allow="autoplay"
                            />
                        </div>

                        {/* Meet the Nominees */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">Meet the Nominees</h2>

                            {/* Filters */}
                            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search contestants..."
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                                    <button
                                        onClick={() => setFilter('active')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === 'active' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => setFilter('eliminated')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === 'eliminated' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        Eliminated
                                    </button>
                                    <button
                                        onClick={() => setFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        All
                                    </button>
                                </div>
                            </div>

                            {/* Grid */}
                            {filteredContestants.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredContestants.map(contestant => (
                                        <ContestantCard key={contestant.id} contestant={contestant} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    No contestants found matching your criteria.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Discussion Section (Sticky) */}
                    <div>
                        <div className="sticky top-4">
                            <DiscussionSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
