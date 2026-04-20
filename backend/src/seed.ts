/**
 * Seed Script — AI Talent Screener
 * Run with: npm run seed
 *
 * Inserts 2 sample jobs and 25 sample applicants into MongoDB.
 * Safe to run multiple times — clears existing data first.
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import { Job } from "./models/job.model.js";
import { Applicant } from "./models/applicant.model.js";

dotenv.config({ path: "./.env" });

const seed = async () => {
  await connectDB();

  // ── Clear existing data ───────────────────────────────────────────────────
  await Job.deleteMany({});
  await Applicant.deleteMany({});
  console.log("🗑️  Cleared existing jobs and applicants.");

  // ── Insert Jobs ───────────────────────────────────────────────────────────
  const jobs = await Job.insertMany([
    {
      title: "Senior Software Engineer",
      description: `We are looking for a Senior Software Engineer with strong experience in 
      Node.js, TypeScript, and RESTful API design. The ideal candidate has 5+ years of experience 
      building scalable backend systems, is familiar with MongoDB or PostgreSQL, and has worked 
      with cloud platforms (AWS/GCP/Azure). Experience with Docker and CI/CD pipelines is a plus. 
      You will lead technical projects, mentor junior engineers, and collaborate with product teams 
      to deliver high-quality software.`,
      department: "Engineering",
    },
    {
      title: "Data Analyst",
      description: `We are seeking a Data Analyst to join our analytics team. The candidate should 
      have 2–4 years of experience with SQL, Python (pandas, NumPy), and data visualization tools 
      (Tableau, Power BI, or Looker). A strong statistical background and the ability to communicate 
      complex findings to non-technical stakeholders is essential. Experience with machine learning 
      basics or A/B testing is a strong advantage. A degree in Mathematics, Statistics, or a related 
      field is preferred.`,
      department: "Analytics",
    },
  ]);

  const engineerJobId = jobs[0]._id;
  const analystJobId = jobs[1]._id;

  console.log(`✅ Inserted ${jobs.length} jobs.`);

  // ── Insert Applicants ─────────────────────────────────────────────────────
  const applicants = await Applicant.insertMany([
    // Engineer applicants
    {
      jobId: engineerJobId,
      name: "Alice Nakimera",
      skills: ["Node.js", "TypeScript", "MongoDB", "Docker", "AWS", "REST APIs"],
      experience: 7,
      education: "BSc Computer Science, Makerere University",
    },
    {
      jobId: engineerJobId,
      name: "Brian Ssemuwemba",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "Linux"],
      experience: 5,
      education: "BSc Software Engineering, MUBS",
    },
    {
      jobId: engineerJobId,
      name: "Carol Ainebyona",
      skills: ["Node.js", "Express", "MySQL", "Git", "React"],
      experience: 3,
      education: "BSc Information Technology, Kyambogo University",
    },
    {
      jobId: engineerJobId,
      name: "David Ochieng",
      skills: ["TypeScript", "Node.js", "GraphQL", "MongoDB", "GCP", "Kubernetes"],
      experience: 8,
      education: "MSc Computer Science, University of Nairobi",
    },
    {
      jobId: engineerJobId,
      name: "Eva Namukasa",
      skills: ["Java", "Spring Boot", "Oracle DB", "Maven"],
      experience: 4,
      education: "BSc Computer Science, Uganda Christian University",
    },
    {
      jobId: engineerJobId,
      name: "Felix Ssali",
      skills: ["Node.js", "TypeScript", "AWS", "PostgreSQL", "CI/CD", "Jenkins"],
      experience: 6,
      education: "BSc Computer Engineering, Makerere University",
    },
    {
      jobId: engineerJobId,
      name: "Grace Acen",
      skills: ["PHP", "Laravel", "MySQL", "Bootstrap", "Vue.js"],
      experience: 2,
      education: "Higher Diploma IT, Uganda Institute of Technology",
    },
    {
      jobId: engineerJobId,
      name: "Henry Mugisha",
      skills: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
      experience: 4,
      education: "BSc Computer Science, ISBAT University",
    },
    {
      jobId: engineerJobId,
      name: "Irene Apio",
      skills: ["Python", "FastAPI", "Redis", "MongoDB", "Docker", "TypeScript"],
      experience: 5,
      education: "BSc Software Engineering, Makerere University",
    },
    {
      jobId: engineerJobId,
      name: "James Kato",
      skills: ["C++", "Embedded Systems", "Arduino", "Python"],
      experience: 3,
      education: "BSc Electrical Engineering, Ndejje University",
    },
    {
      jobId: engineerJobId,
      name: "Kemi Adeleke",
      skills: ["Node.js", "TypeScript", "Azure", "MongoDB", "Microservices", "Docker"],
      experience: 9,
      education: "MSc Software Engineering, University of Lagos",
    },
    {
      jobId: engineerJobId,
      name: "Louis Kamanzi",
      skills: ["Ruby on Rails", "PostgreSQL", "Heroku", "Git"],
      experience: 4,
      education: "BSc Computer Science, University of Rwanda",
    },
    {
      jobId: engineerJobId,
      name: "Mary Achieng",
      skills: ["Node.js", "Express", "TypeScript", "MongoDB"],
      experience: 2,
      education: "BSc Information Systems, Gulu University",
    },

    // Analyst applicants
    {
      jobId: analystJobId,
      name: "Nathan Byarugaba",
      skills: ["Python", "pandas", "SQL", "Tableau", "Power BI", "Statistics"],
      experience: 3,
      education: "BSc Statistics, Makerere University",
    },
    {
      jobId: analystJobId,
      name: "Olivia Namubiru",
      skills: ["SQL", "Excel", "Tableau", "R", "A/B Testing"],
      experience: 4,
      education: "BSc Mathematics, Kyambogo University",
    },
    {
      jobId: analystJobId,
      name: "Patrick Nkurunziza",
      skills: ["Python", "pandas", "NumPy", "scikit-learn", "Looker", "BigQuery"],
      experience: 5,
      education: "MSc Data Science, University of Cape Town",
    },
    {
      jobId: analystJobId,
      name: "Queen Atuhaire",
      skills: ["SQL", "Power BI", "Python"],
      experience: 1,
      education: "BSc Business Computing, MUBS",
    },
    {
      jobId: analystJobId,
      name: "Robert Ssebunya",
      skills: ["R", "ggplot2", "SQL", "SAS", "Statistical Modeling", "A/B Testing"],
      experience: 6,
      education: "MSc Statistics, Makerere University",
    },
    {
      jobId: analystJobId,
      name: "Sarah Tumusiime",
      skills: ["Python", "pandas", "Tableau", "SQL", "Machine Learning"],
      experience: 3,
      education: "BSc Applied Mathematics, Uganda Martyrs University",
    },
    {
      jobId: analystJobId,
      name: "Tom Okello",
      skills: ["Excel", "SQL", "Word", "PowerPoint"],
      experience: 1,
      education: "Diploma in Business Administration",
    },
    {
      jobId: analystJobId,
      name: "Ursula Nagasha",
      skills: ["Python", "pandas", "NumPy", "Power BI", "DAX", "SQL"],
      experience: 4,
      education: "BSc Statistics, Nkozi University",
    },
    {
      jobId: analystJobId,
      name: "Victor Musinguzi",
      skills: ["Tableau", "SQL", "Python", "Looker", "A/B Testing", "Google Analytics"],
      experience: 5,
      education: "BSc Computer Science with Statistics, Makerere University",
    },
    {
      jobId: analystJobId,
      name: "Winnie Kemigisha",
      skills: ["R", "SQL", "Python", "matplotlib", "seaborn"],
      experience: 2,
      education: "BSc Mathematics, Kyambogo University",
    },
    {
      jobId: analystJobId,
      name: "Xavier Buwembo",
      skills: ["SQL", "Excel", "Power BI", "Python basics"],
      experience: 2,
      education: "BSc Accounting and Finance, MUBS",
    },
    {
      jobId: analystJobId,
      name: "Yolanda Asiimwe",
      skills: ["Python", "pandas", "SQL", "Tableau", "Machine Learning", "NLP"],
      experience: 7,
      education: "MSc Data Science, Strathmore University",
    },
  ]);

  console.log(`✅ Inserted ${applicants.length} applicants.`);
  console.log("\n📋 Job IDs (use these in Postman):");
  jobs.forEach((j) =>
    console.log(`  • ${j.title}: ${(j._id as { toString(): string }).toString()}`)
  );

  await mongoose.disconnect();
  console.log("\n✅ Seeding complete. MongoDB disconnected.");
};

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
