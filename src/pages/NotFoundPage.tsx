import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <SEO
                title="Page Not Found - Bigg Boss 9 Telugu"
                description="The page you are looking for does not exist."
            />
            <div className="text-center max-w-lg mx-auto">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-lg text-gray-600 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
