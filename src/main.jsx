import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import TeamPage from './TeamPage.jsx';
import InsightsPage from './InsightsPage.jsx';
import '../styles.css';

const queryClient = new QueryClient();
const isTeamPage = window.location.pathname.replace(/\/+$/, '') === '/team';
const isInsightsPage = window.location.pathname.replace(/\/+$/, '') === '/insights';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {isTeamPage ? <TeamPage /> : isInsightsPage ? <InsightsPage /> : <App />}
    </QueryClientProvider>
  </React.StrictMode>,
);
