
import { Mail, FileText, Info, Tv, Users, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';

export const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <SEO
                title="About - Bigg Boss 9 Telugu Voting"
                description="Learn about Bigg Boss Telugu Season 9, the host Nagarjuna, the 'Ranarangam' theme, and how to vote for your favorite contestants."
            />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">About Bigg Boss 9 Telugu</h1>

                {/* Show Info */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Info className="w-6 h-6 text-primary-500" /> Season 9: Ranarangam
                    </h2>
                    <div className="prose prose-lg text-gray-600">
                        <p className="mb-4">
                            Bigg Boss Telugu Season 9 returns with the explosive theme <strong>"Ranarangam" (Battlefield)</strong>.
                            Hosted by the King <strong>Akkineni Nagarjuna</strong>, this season promises more drama, tougher challenges, and unexpected twists.
                        </p>
                        <p>
                            For the first time, the house is divided into two distinct zones, creating a constant battle for survival and luxury.
                            Contestants must fight for their place in the premium zone while avoiding the hardships of the challenger zone.
                        </p>
                    </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-primary-50 border-none">
                        <Tv className="w-8 h-8 text-primary-600 mb-3" />
                        <h3 className="font-bold text-lg mb-1">Where to Watch</h3>
                        <p className="text-sm text-gray-600">Star Maa & Disney+ Hotstar</p>
                    </div>
                    <div className="card bg-orange-50 border-none">
                        <Users className="w-8 h-8 text-orange-600 mb-3" />
                        <h3 className="font-bold text-lg mb-1">Host</h3>
                        <p className="text-sm text-gray-600">Akkineni Nagarjuna</p>
                    </div>
                    <div className="card bg-purple-50 border-none">
                        <Calendar className="w-8 h-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-lg mb-1">Premiere</h3>
                        <p className="text-sm text-gray-600">September 7, 2025</p>
                    </div>
                </div>

                {/* Contact & Privacy */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Mail className="w-5 h-5 text-primary-500" /> Contact Us
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            For business inquiries, copyright issues, or feedback about this platform.
                        </p>
                        <a href="mailto:contact@biggboss9voting.com" className="text-primary-600 hover:underline font-medium">
                            contact@biggboss9voting.com
                        </a>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-orange-500" /> Privacy Policy
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            We respect your privacy. We do not store personal data without consent.
                        </p>
                        <a href="#" className="text-primary-600 hover:underline font-medium">
                            Read full policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


