 AI Talent Screener - Backend API

This is the "engine" of the application, built with Node.js, Express, and TypeScript.

Technical Features

- Express Middleware: Implements `json`, `urlencoded`, and `cors` for secure, standardized communication.
- Modular Routing: Separate routers for `Users`, `Jobs`, and `Screening` logic.
- Environment Management:Utilizes dynamic porting and origin-validation for production 
Safety.

To round out your Backend README, you need to explain the "plumbing" of the AI. This section proves that your team didn't just "talk" to an AI, but engineered a reliable, structured data pipeline.

AI Integration & Prompt Engineering

The backend acts as a secure bridge between the client and the AI model. We implemented a Stateless AI Service layer designed for high reliability and structured data output.
1. The Data Pipeline (JSON-to-JSON)
To ensure the system is modular and scalable, we established a strict JSON communication protocol:
Outbound: The backend aggregates job requirements and candidate data into a structured JSON payload, which is injected into a specialized "System Context" prompt.
Inbound: We utilize Function Calling (or JSON-mode constraints) to force the AI to return data in a minified JSON schema. This allows our backend to immediately parse the results and serve them to the Frontend without manual cleaning.
2. Ethical Prompt Engineering
We engineered the AI's "Instructions" to prioritize fairness and technical accuracy:
Attribute Stripping: The prompt explicitly instructs the model to ignore PII (Personally Identifiable Information) such as names, gender, or age, focusing exclusively on the skills and experience arrays.
Rubric-Based Scoring: Instead of a "vague" opinion, the AI is forced to score based on a weighted rubric defined in the backend (e.g., Technical Fit: 40%, Experience: 30%, Education: 30%).
Modular Formatting: The prompt is decoupled from the data, meaning we can swap the underlying AI model (e.g., from GPT to Gemini) without changing our core backend logic.
3. Validation & Guardrails
Schema Validation: We implemented a post-processing check to ensure the AI's JSON output matches our expected interface.
Temperature Control: The AI's "creativity" (temperature) is set to a low value ($0.2$) to ensure deterministic, consistent, and unbiased scoring across different candidates.

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
