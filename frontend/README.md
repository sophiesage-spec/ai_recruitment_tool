# Umurava AI Talent Screener

A premium recruiter-facing dashboard that uses the Gemini 1.5 Pro API to automatically screen and rank job candidates based on their resumes and job requirements.

## Features

- **Recruiter Dashboard**: Search and filter job openings.
- **AI Screening**: Trigger live candidate screening using Gemini API.
- **Ranked Shortlist**: View candidates sorted by AI-generated match scores.
- **Detailed Insights**: Explore reasoning, strengths, and gaps for each candidate in a side panel.
- **Premium Design**: Built with Next.js 15, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **AI**: Google Gemini 1.5 Pro (@google/generative-ai)
- **Components**: shadcn/ui + Phosphor Icons

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   Get your key from the [Google AI Studio](https://aistudio.google.com/).
4. **Run the development server**:
   ```bash
   pnpm dev
   ```
5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Folder Structure

- `/src/app`: Routes and API endpoints.
- `/src/components`: UI components (Dashboard, Shortlist, Shared).
- `/src/store`: Redux Toolkit store and slices.
- `/src/lib`: Core logic (Gemini API integration).
- `/src/mock`: Mock data for jobs and candidates.
- `/src/types`: TypeScript interfaces and utilities.

## AI Screening Logic

The AI screening logic is located in `src/lib/gemini.ts`. It uses a structured prompt to ensure Gemini returns a valid JSON array containing:
- `matchScore` (0-100)
- `reasoning` (Paragraph explanation)
- `strengths` (List of matched requirements)
- `gaps` (List of missing requirements)
