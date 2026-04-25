 AI Talent Screener - Frontend Dashboard

The user interface for the AI Talent Screener, built with Next.js and React.

Key Features

Dynamic Data Fetching: Utilizes asynchronous fetch calls to populate the dashboard with real-time job data.
Responsive Design: A clean, mobile-responsive layout for recruiters on the go.
State Management: Efficiently handles job data and screening triggers using React hooks.

Setup Instructions

1. `cd frontend`
2. `npm install`
3. Configure `NEXT_PUBLIC_API_URL` in your environment.
4. `npm run dev`

Connection Logic

The frontend communicates with the backend using the following structure:

const response = await fetch(`${API_BASE_URL}/api/jobs`);
