
# ai_recruitment_tool
This repo includes codes for a recruitment tool powered by ai. it used Gemini LLM api to scan information of applicants.

AI Talent Screener 

The Problem

Traditional recruitment is bottlenecked by the initial screening phase. Recruiters find themselves dealing with more than hundreds of applicants for a single job posting. This leads to ‘resume fatigue’ and it isn't about just being exhausted from reading resumes, it is also about loss of potential for a company in cases where qualified applicants who would have been a better fit for the company  missed due to manual processing limits or human error.

 Our Solution

This problem is what inspired the full-stack AI-driven recruitment tool we built that automates the initial screening layer. By connecting a dynamic frontend dashboard to a dedicated AI-logic backend, our system allows recruiters to view job postings and trigger AI screening processes with a single click.

Assumptions and Dependencies 

It is important to mention the assumptions on which our platform operates on:

We assume job descriptions are structured with clear titles and requirements to facilitate accurate AI matching
We assume the database containing applicants is connected to the system that applicants send their information to.
We assume our database is connected to the system that collects applicants data when they apply, i.e: in other words, presumably our database would already be populated with applicant and job data so recruiters would not have to deal with uploading hundreds of CVs one by one.
Human-in-the-Loop: This tool is a Decision Support System. It is designed to rank and filter, but we assume a human recruiter remains the final decision-maker.
Connectivity: Using our platform requires an active internet connection to communicate with the Render-hosted API.
Browser Compatibility: Optimized for modern evergreen browsers (Chrome, Firefox, Edge).


What Makes It Practical?

With the development of this system we had business practicality in mind:

Decoupled Architecture: Our frontend and backend are hosted independently on Render, allowing for independent scaling of the UI and the heavy-lifting AI logic.
Real-Time Data Sync: Uses an automated fetch cycle to ensure the dashboard always reflects the current state of the backend database. 

Security First: Implemented strict CORS (Cross-Origin Resource Sharing) policies to ensure only our verified frontend can communicate with our API.

Bias Mitigation: Our AI logic applies a consistent rubric to every candidate, ensuring that screening is based on data-driven compatibility rather than subjective manual review.

With the database separate from the backend logic, it is easy to switch the database to a different one in case of integration into business tech


High-Level Overview

The application consists of a Next.js frontend that communicates with a Node.js/Express backend via a RESTful API.

 Core Functionalities

1. Job Dashboard: Dynamically fetches and renders active job listings.
2. AI Screening Engine: Dedicated endpoints for processing candidate compatibility.
3. Job Deletion: The recruiter is able to remove a job from the dashboard given that the screening process has been completed or the job posting is no longer relevant

Achievements & Technical Milestones

-Production-Ready Deployment: Successfully moved from local development to a live, cross-domain production environment on Render.
Robust API Design: Built a modular routing system where `/api/jobs` and `/api/screen` handle specific business logic.
-Type Safety: The entire backend is written in TypeScript, ensuring data integrity and reducing runtime errors during the screening process.


