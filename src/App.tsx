
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { HomePage } from './pages/HomePage';
import { VotingPage } from './pages/VotingPage';
import { ResultsPage } from './pages/ResultsPage';
import { SocialPage } from './pages/SocialPage';
import { AboutPage } from './pages/AboutPage';

import { NotFoundPage } from './pages/NotFoundPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="vote" element={<VotingPage />} />
                    <Route path="results" element={<ResultsPage />} />
                    <Route path="social" element={<SocialPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
