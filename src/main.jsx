import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App, { JourneySignal } from './App.jsx';
import TeamPage from './TeamPage.jsx';
import InsightsPage from './InsightsPage.jsx';
import SlugPage from './SlugPage.jsx';
import BookingPage from './BookingPage.jsx';
import ConnectPage from './ConnectPage.jsx';
import '../styles.css';

const queryClient = new QueryClient();
const isTeamPage = window.location.pathname.replace(/\/+$/, '') === '/team';
const isInsightsPage = window.location.pathname.replace(/\/+$/, '') === '/insights';
const isBookingPage = window.location.pathname.replace(/\/+$/, '') === '/book-a-call';
const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
if (cleanPath === '/contact') window.history.replaceState(null, '', '/get-started');
const slugPage = ['/services', '/projects'].includes(cleanPath) ? cleanPath.slice(1) : null;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {cleanPath !== '/connect' && <JourneySignal />}
      {cleanPath === '/connect' ? <ConnectPage /> : isTeamPage ? <TeamPage /> : isInsightsPage ? <InsightsPage /> : isBookingPage ? <BookingPage /> : slugPage ? <SlugPage type={slugPage} /> : <App />}
    </QueryClientProvider>
  </React.StrictMode>,
);
