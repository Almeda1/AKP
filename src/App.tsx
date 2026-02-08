import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  LandingPage, 
  ProposalPage,
  MemoryGame
} from './pages';

function AppRoutes() {
  return (
    <Routes>
      {/* 1. Memory Game (The Initial Challenge) */}
      <Route path="/" element={<MemoryGame />} />

      {/* 2. Landing Page (The Welcome) */}
      <Route path="/welcome" element={<LandingPage />} />

      {/* 3. Proposal Page (The Question) */}
      <Route path="/proposal" element={<ProposalPage />} />

      {/* Safety Net */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  );
}

export default App;