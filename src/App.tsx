
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { VotingPage } from './pages/VotingPage';
import { ResultsPage } from './pages/ResultsPage';
import { SocialPage } from './pages/SocialPage';
import { AboutPage } from './pages/AboutPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/voting" element={<VotingPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/social" element={<SocialPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
