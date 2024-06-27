
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GithubProvider } from './context/GithubContext';
import RepoList from './pages/RepoList';
import RepoDetail from './pages/RepoDetail';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <GithubProvider>
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:name" element={<RepoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GithubProvider>
    </ErrorBoundary>
  );
}

export default App;

