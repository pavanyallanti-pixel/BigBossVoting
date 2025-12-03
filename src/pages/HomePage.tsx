
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Award, Tv } from 'lucide-react';
import { ContestantCard } from '../components/ContestantCard';
import { contestants } from '../data/contestants';
import { SEO } from '../components/SEO';

export const HomePage = () => {
    const featuredContestants = contestants.slice(0, 4);

    return (
        <div className="min-h-screen">
            <SEO
                title="Bigg Boss 9 Telugu Voting - Official Vote Online"
                description="Vote for your favorite Bigg Boss Telugu Season 9 contestants. Check live voting results, elimination updates, and save your favorite housemate."
            />

            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-50),transparent_40%),radial-gradient(circle_at_bottom_left,var(--color-primary-50),transparent_40%)] -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        Voting Lines Open Now
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        Bigg Boss 9 Telugu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            Official Voting
                        </span>
                    </h1>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Support your favorite contestants and save them from elimination. Every vote counts in deciding the winner of Season 9.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Link to="/voting" className="btn btn-primary text-lg px-8">
                            Vote Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/results" className="btn btn-secondary text-lg px-8">
                            View Trends <TrendingUp className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 -mt-20">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="card flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl">
                            <Users className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Contestants</p>
                            <h3 className="text-2xl font-bold">{contestants.length}</h3>
                        </div>
                    </div>
                    <div className="card flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl">
                            <Award className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Votes</p>
                            <h3 className="text-2xl font-bold">1.2M+</h3>
                        </div>
                    </div>
                    <div className="card flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                            <Tv className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Weeks Completed</p>
                            <h3 className="text-2xl font-bold">12</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Nominees */}
            <section className="container mx-auto px-4 py-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Nominated Contestants</h2>
                        <p className="text-gray-500">Vote to save your favorite housemates this week</p>
                    </div>
                    <Link to="/voting" className="btn btn-secondary text-sm">View All</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredContestants.map(contestant => (
                        <ContestantCard key={contestant.id} contestant={contestant} />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 mb-20">
                <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/50 to-transparent" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
                                Week 12 Updates
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Double Elimination This Week?</h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Rumors suggest a shocking twist in the upcoming weekend episode. Make sure your favorite contestant is safe by casting your vote daily.
                            </p>
                            <Link to="/results" className="btn bg-white text-gray-900 hover:bg-gray-100 border-none">
                                Check Voting Trends
                            </Link>
                        </div>

                        <div className="w-full md:w-auto flex justify-center">
                            <div className="w-64 h-40 bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <Tv className="w-16 h-16 text-white/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


