
import { Instagram, Twitter, Hash } from 'lucide-react';
import { SEO } from '../components/SEO';

// Declare iFrameResize on window for TypeScript
declare global {
    interface Window {
        iFrameResize: any;
    }
}

export const SocialPage = () => {
    return (
        <div className="flex flex-col gap-12 py-12">
            <SEO
                title="Social Media Feeds"
                description="Follow the latest Bigg Boss Telugu 9 updates on Instagram and Twitter. See trending hashtags and contestant posts."
            />
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Social Media Feeds</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Stay connected with the latest updates, highlights, and discussions from Instagram and Twitter.
                </p>
            </div>

            {/* Contestant Feeds Section */}
            <section className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">🌟</span>
                    <h2 className="text-3xl font-bold">Contestant Feeds</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Instagram Feed - Left */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Instagram className="w-6 h-6 text-pink-500" />
                                <h3 className="text-xl font-bold">Instagram</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Hash className="w-4 h-4" />
                                <span>#BiggBoss9Telugu #BBTelugu</span>
                            </div>
                        </div>

                        <div className="relative min-h-[600px] bg-gray-50 rounded-lg overflow-hidden">
                            {/* Instagram Feed with iframe-resizer */}
                            <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>
                            <iframe
                                onLoad={(e: any) => {
                                    if (typeof window !== 'undefined' && window.iFrameResize) {
                                        window.iFrameResize(e.target);
                                    }
                                }}
                                src="https://e4a4ef6e88984021a7f87239a8b0d2f2.elf.site"
                                style={{ border: 'none', width: '100%', height: '600px' }}
                                title="Instagram Feed"
                            />
                        </div>
                    </div>

                    {/* Twitter Feed - Right */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Twitter className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-bold">Twitter/X</h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Hash className="w-4 h-4" />
                                <span>#BiggBoss9Telugu #BBTelugu</span>
                            </div>
                        </div>

                        <div className="relative min-h-[540px] bg-gray-50 rounded-lg overflow-hidden">
                            {/* Twitter Feed with iframe-resizer */}
                            <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>
                            <iframe
                                onLoad={(e: any) => {
                                    if (typeof window !== 'undefined' && window.iFrameResize) {
                                        window.iFrameResize(e.target);
                                    }
                                }}
                                src="https://912a1b56f5584bd0ab6123db67b14cfb.elf.site"
                                style={{ border: 'none', width: '100%', height: '600px' }}
                                title="Twitter Feed"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Feed Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Social Media</h2>

                <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <div className="min-h-[640px]">
                        {/* Social Feed with iframe-resizer */}
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.10/iframeResizer.min.js"></script>
                        <iframe
                            onLoad={(e: any) => {
                                if (typeof window !== 'undefined' && window.iFrameResize) {
                                    window.iFrameResize(e.target);
                                }
                            }}
                            src="https://579d2a6227424aae92232bb12180295b.elf.site"
                            style={{ border: 'none', width: '100%', height: '600px' }}
                            title="Social Media Feed"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
