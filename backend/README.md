 AI Talent Screener - Backend API

This is the "engine" of the application, built with Node.js, Express, and TypeScript.

Technical Features

- Express Middleware: Implements `json`, `urlencoded`, and `cors` for secure, standardized communication.
- Modular Routing: Separate routers for `Users`, `Jobs`, and `Screening` logic.
- Environment Management:Utilizes dynamic porting and origin-validation for production safety.

Installation & Setup

1. `cd backend`
2. `npm install`
3. Create a `.env` file (see Environment Variables section).
4. `npm run dev` (Development) or `npm run build` (Production).

API Endpoints


 Method
Endpoint 
Description 
GET
`/`
API Health Check & Versioning
GET
`/api/jobs`
Fetches all active job listings
POST
`/api/screen/:jobId`
Triggers the AI screening logic for a specific job
POST
`/api/v1/users`
Authentication and User Management




Environment Variables

To run this backend, you must define:

- `PORT`: The port the server listens on (default 10000 on Render).
- `ALLOWED_ORIGINS`: A list of URLs permitted to access the API.
