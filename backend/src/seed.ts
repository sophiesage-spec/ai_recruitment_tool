/**
 * Seed Script — AI Talent Screener
 * Run with: npm run seed
 *
 * Inserts 10 sample jobs and 50 sample applicants into MongoDB.
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
    {
      title: "Frontend Developer",
      description: `We are looking for a Frontend Developer with 3+ years of experience building 
      modern, responsive web applications. Strong proficiency in React, TypeScript, and CSS frameworks 
      such as Tailwind CSS or Material UI is required. You should be comfortable working with REST APIs, 
      state management libraries (Redux or Zustand), and version control with Git. Experience with 
      Next.js, performance optimization, and accessibility standards is a strong plus. You will work 
      closely with designers and backend engineers to deliver exceptional user experiences.`,
      department: "Engineering",
    },
    {
      title: "DevOps Engineer",
      description: `We are hiring a DevOps Engineer to manage and improve our cloud infrastructure 
      and deployment pipelines. The ideal candidate has 4+ years of experience with AWS or GCP, 
      Kubernetes, Docker, and CI/CD tools such as Jenkins, GitHub Actions, or CircleCI. Strong 
      scripting skills in Bash or Python are required. Experience with infrastructure as code 
      (Terraform or Pulumi), monitoring tools (Prometheus, Grafana), and security best practices 
      is highly desirable. You will ensure system reliability, scalability, and uptime.`,
      department: "Infrastructure",
    },
    {
      title: "Product Manager",
      description: `We are seeking an experienced Product Manager to drive the vision and roadmap 
      for our core product. The ideal candidate has 4+ years of product management experience in a 
      tech company, with a strong ability to gather customer insights, define requirements, and 
      prioritize features. Experience working with agile/scrum teams, writing clear product specs, 
      and collaborating with engineering, design, and marketing is essential. Familiarity with 
      analytics tools (Mixpanel, Amplitude) and A/B testing is a plus. MBA or technical background preferred.`,
      department: "Product",
    },
    {
      title: "UX/UI Designer",
      description: `We are looking for a UX/UI Designer with 3+ years of experience designing 
      intuitive digital products. Proficiency in Figma is required. You should have a strong 
      portfolio demonstrating user-centered design, wireframing, prototyping, and usability testing. 
      Experience collaborating with developers to ensure pixel-perfect implementation, conducting 
      user research, and creating design systems is essential. Knowledge of accessibility standards 
      (WCAG) and motion design is a plus. You will own the end-to-end design process for key product areas.`,
      department: "Design",
    },
    {
      title: "Cybersecurity Analyst",
      description: `We are hiring a Cybersecurity Analyst to protect our systems and data from 
      threats. The ideal candidate has 3+ years of experience in information security, with hands-on 
      knowledge of SIEM tools, vulnerability assessment, penetration testing, and incident response. 
      Familiarity with frameworks such as NIST, ISO 27001, or SOC 2 is required. Experience with 
      network security, firewall management, and cloud security (AWS or Azure) is highly desirable. 
      Certifications such as CEH, CISSP, or CompTIA Security+ are a strong advantage.`,
      department: "Security",
    },
    {
      title: "Machine Learning Engineer",
      description: `We are seeking a Machine Learning Engineer to build and deploy ML models at scale. 
      The ideal candidate has 4+ years of experience with Python, TensorFlow or PyTorch, and end-to-end 
      ML pipelines. Strong understanding of supervised and unsupervised learning, NLP, and model 
      evaluation is required. Experience with MLOps tools (MLflow, Kubeflow), cloud ML services 
      (AWS SageMaker, GCP Vertex AI), and data engineering (Spark, Kafka) is a strong plus. 
      You will collaborate with data scientists and engineers to bring AI solutions into production.`,
      department: "AI & Data",
    },
    {
      title: "Finance Manager",
      description: `We are looking for a Finance Manager with 5+ years of experience in financial 
      planning, analysis, and reporting. The ideal candidate is proficient in financial modelling, 
      budgeting, forecasting, and preparing management accounts. Strong knowledge of IFRS or GAAP, 
      ERP systems (SAP or Oracle), and advanced Excel is required. CPA or ACCA qualification is 
      preferred. Experience in a fast-growing startup or tech company is an advantage. You will 
      oversee financial operations, manage audits, and provide strategic financial insights to leadership.`,
      department: "Finance",
    },
    {
      title: "HR Business Partner",
      description: `We are hiring an HR Business Partner to support our growing teams across the 
      organization. The ideal candidate has 4+ years of HR experience, with strong expertise in 
      talent acquisition, performance management, employee relations, and organizational development. 
      Experience partnering with senior leaders to align HR strategy with business goals is essential. 
      Familiarity with HRIS systems (BambooHR, Workday), labour law, and DEI initiatives is required. 
      You will be a trusted advisor to managers and employees, driving a high-performance culture.`,
      department: "Human Resources",
    },
  ]);

  const engineerJobId = jobs[0]._id;
  const analystJobId = jobs[1]._id;
  const frontendJobId = jobs[2]._id;
  const devopsJobId = jobs[3]._id;
  const productJobId = jobs[4]._id;
  const designJobId = jobs[5]._id;
  const securityJobId = jobs[6]._id;
  const mlJobId = jobs[7]._id;
  const financeJobId = jobs[8]._id;
  const hrJobId = jobs[9]._id;

  console.log(`✅ Inserted ${jobs.length} jobs.`);

  // ── Insert Applicants ─────────────────────────────────────────────────────
  const applicants = await Applicant.insertMany([
    // ── Senior Software Engineer applicants ───────────────────────────────
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

    // ── Data Analyst applicants ───────────────────────────────────────────
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

    // ── Frontend Developer applicants ─────────────────────────────────────
    {
      jobId: frontendJobId,
      name: "Amara Diallo",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Git"],
      experience: 4,
      education: "BSc Computer Science, University of Dakar",
    },
    {
      jobId: frontendJobId,
      name: "Ben Mutabazi",
      skills: ["Vue.js", "JavaScript", "CSS", "HTML", "Bootstrap"],
      experience: 2,
      education: "BSc Information Technology, University of Rwanda",
    },
    {
      jobId: frontendJobId,
      name: "Cynthia Osei",
      skills: ["React", "Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Figma"],
      experience: 5,
      education: "BSc Computer Engineering, KNUST Ghana",
    },

    // ── DevOps Engineer applicants ────────────────────────────────────────
    {
      jobId: devopsJobId,
      name: "Daniel Nkosi",
      skills: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Prometheus"],
      experience: 6,
      education: "BSc Computer Science, University of Pretoria",
    },
    {
      jobId: devopsJobId,
      name: "Esther Wanjiku",
      skills: ["GCP", "Docker", "Jenkins", "Bash", "Linux", "Grafana"],
      experience: 4,
      education: "BSc Information Technology, University of Nairobi",
    },
    {
      jobId: devopsJobId,
      name: "Frank Habimana",
      skills: ["Azure", "Kubernetes", "Terraform", "CI/CD", "Python", "Ansible"],
      experience: 7,
      education: "MSc Cloud Computing, Carnegie Mellon University Africa",
    },

    // ── Product Manager applicants ────────────────────────────────────────
    {
      jobId: productJobId,
      name: "Gloria Mwangi",
      skills: ["Product Roadmapping", "Agile", "Scrum", "Mixpanel", "Jira", "A/B Testing"],
      experience: 5,
      education: "MBA, Strathmore University",
    },
    {
      jobId: productJobId,
      name: "Hassan Kamara",
      skills: ["User Research", "Product Strategy", "Figma", "Amplitude", "SQL"],
      experience: 4,
      education: "BSc Computer Science, University of Ghana",
    },
    {
      jobId: productJobId,
      name: "Ivy Nakato",
      skills: ["Agile", "Scrum", "Product Specs", "Stakeholder Management", "Jira"],
      experience: 3,
      education: "BSc Business Administration, Makerere University",
    },

    // ── UX/UI Designer applicants ─────────────────────────────────────────
    {
      jobId: designJobId,
      name: "Jerome Tuyishime",
      skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "Design Systems", "WCAG"],
      experience: 4,
      education: "BSc Graphic Design, IPRC Kigali",
    },
    {
      jobId: designJobId,
      name: "Karen Atieno",
      skills: ["Figma", "Sketch", "User Research", "Usability Testing", "Motion Design"],
      experience: 5,
      education: "BA Communication Design, University of Cape Town",
    },
    {
      jobId: designJobId,
      name: "Leo Nzeyimana",
      skills: ["Figma", "Canva", "HTML", "CSS", "Wireframing"],
      experience: 2,
      education: "Diploma in Graphic Design, Kigali Institute of Arts",
    },

    // ── Cybersecurity Analyst applicants ──────────────────────────────────
    {
      jobId: securityJobId,
      name: "Monica Banda",
      skills: ["Penetration Testing", "SIEM", "ISO 27001", "Network Security", "Python", "CEH"],
      experience: 5,
      education: "BSc Computer Science, University of Zambia",
    },
    {
      jobId: securityJobId,
      name: "Nelson Irakoze",
      skills: ["Vulnerability Assessment", "Firewall Management", "AWS Security", "NIST", "CompTIA Security+"],
      experience: 4,
      education: "BSc Information Security, University of Rwanda",
    },
    {
      jobId: securityJobId,
      name: "Olivia Chukwu",
      skills: ["Incident Response", "SOC 2", "SIEM", "Kali Linux", "CISSP"],
      experience: 7,
      education: "MSc Cybersecurity, University of Lagos",
    },

    // ── Machine Learning Engineer applicants ──────────────────────────────
    {
      jobId: mlJobId,
      name: "Paul Mugabo",
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "MLflow", "AWS SageMaker"],
      experience: 5,
      education: "MSc Machine Learning, Carnegie Mellon University Africa",
    },
    {
      jobId: mlJobId,
      name: "Rachel Uwase",
      skills: ["Python", "scikit-learn", "Keras", "pandas", "Spark", "GCP Vertex AI"],
      experience: 4,
      education: "BSc Computer Science, University of Rwanda",
    },
    {
      jobId: mlJobId,
      name: "Samuel Eze",
      skills: ["PyTorch", "NLP", "Hugging Face", "MLOps", "Kubeflow", "Docker"],
      experience: 6,
      education: "MSc Artificial Intelligence, University of Ibadan",
    },

    // ── Finance Manager applicants ────────────────────────────────────────
    {
      jobId: financeJobId,
      name: "Theresa Ingabire",
      skills: ["Financial Modelling", "IFRS", "SAP", "Excel", "Budgeting", "Forecasting"],
      experience: 6,
      education: "ACCA, CPA Rwanda",
    },
    {
      jobId: financeJobId,
      name: "Ugo Okonkwo",
      skills: ["GAAP", "Oracle ERP", "Excel", "Financial Reporting", "Auditing"],
      experience: 8,
      education: "MSc Finance, University of Lagos",
    },
    {
      jobId: financeJobId,
      name: "Vivian Murekatete",
      skills: ["Budgeting", "Financial Analysis", "Excel", "QuickBooks", "IFRS"],
      experience: 4,
      education: "BSc Accounting, University of Rwanda",
    },

    // ── HR Business Partner applicants ────────────────────────────────────
    {
      jobId: hrJobId,
      name: "Walter Ndahiro",
      skills: ["Talent Acquisition", "Performance Management", "BambooHR", "Labour Law", "DEI"],
      experience: 5,
      education: "BSc Human Resource Management, Makerere University",
    },
    {
      jobId: hrJobId,
      name: "Xenia Tumukunde",
      skills: ["Employee Relations", "Workday", "Organizational Development", "Recruitment", "HRIS"],
      experience: 6,
      education: "MSc Human Resources, Strathmore University",
    },
    {
      jobId: hrJobId,
      name: "Zara Kalisa",
      skills: ["Recruitment", "Onboarding", "HR Strategy", "BambooHR", "Labour Law"],
      experience: 3,
      education: "BSc Psychology, University of Rwanda",
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