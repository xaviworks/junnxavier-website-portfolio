import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import TeamPage from './TeamPage.jsx';
import '../styles.css';

const queryClient = new QueryClient();
const isTeamPage = window.location.pathname.replace(/\/+$/, '') === '/team';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {isTeamPage ? <TeamPage /> : <App />}
    </QueryClientProvider>
  </React.StrictMode>,
);
