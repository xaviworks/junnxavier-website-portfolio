import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import TeamPage from './TeamPage.jsx';
import InsightsPage from './InsightsPage.jsx';
import SlugPage from './SlugPage.jsx';
import '../styles.css';

const queryClient = new QueryClient();
const isTeamPage = window.location.pathname.replace(/\/+$/, '') === '/team';
const isInsightsPage = window.location.pathname.replace(/\/+$/, '') === '/insights';
const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
const slugPage = ['/services', '/projects', '/contact'].includes(cleanPath) ? cleanPath.slice(1) : null;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {isTeamPage ? <TeamPage /> : isInsightsPage ? <InsightsPage /> : slugPage ? <SlugPage type={slugPage} /> : <App />}
    </QueryClientProvider>
  </React.StrictMode>,
);
