import { type Job, type CandidateRaw } from "~/types";

// ─── Jobs ────────────────────────────────────────────────────────────────────

export const mockJobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Software Engineer",
    department: "Engineering",
    description:
      "We are looking for a Senior Software Engineer to join our core platform team. You will architect and ship scalable backend services using TypeScript and Node.js, collaborate with product managers on technical roadmaps, mentor junior engineers, and drive code quality through robust testing practices. Experience with distributed systems and cloud-native architectures (AWS or GCP) is essential.",
    candidateCount: 9,
  },
  {
    id: "job-002",
    title: "Product Designer",
    department: "Design",
    description:
      "Umurava is seeking a Product Designer to craft exceptional user experiences across our SaaS platform. You will own the end-to-end design process — from user research and journey mapping to high-fidelity Figma prototypes and design-system contributions. You should be comfortable running usability tests, presenting to stakeholders, and collaborating tightly with engineering to ensure pixel-perfect implementation.",
    candidateCount: 8,
  },
  {
    id: "job-003",
    title: "Data Analyst",
    department: "Analytics",
    description:
      "We are hiring a Data Analyst to turn complex datasets into actionable business insights. You will build and maintain dashboards in Looker and Metabase, write complex SQL queries across multiple data warehouses, partner with growth and operations teams on experimentation and A/B testing, and help define the company's KPI framework. Strong Python skills for data wrangling (pandas, numpy) are a strong plus.",
    candidateCount: 10,
  },
];

// ─── Candidates per Job ──────────────────────────────────────────────────────

export const mockCandidates: Record<string, CandidateRaw[]> = {
  "job-001": [
    {
      id: "swe-01",
      name: "Amara Osei",
      resumeText:
        "Amara is a full-stack engineer with 6 years of experience building distributed systems at scale. She led the re-architecture of a monolith to microservices at a Series B fintech, reducing p99 latency by 40%. Proficient in TypeScript, Node.js, Go, PostgreSQL, and AWS (ECS, Lambda, RDS). Has mentored a team of four junior engineers and championed automated testing, achieving 92% code coverage across critical services.",
    },
    {
      id: "swe-02",
      name: "Kwame Asante",
      resumeText:
        "Kwame is a backend engineer with 4 years of experience primarily in Python and Django. He built high-throughput data ingestion pipelines at a logistics startup processing 10M events/day. Familiar with PostgreSQL and Redis caching patterns. Has worked in small, fast-moving teams but lacks experience in TypeScript or Node.js-native ecosystems, though he has expressed eagerness to transition.",
    },
    {
      id: "swe-03",
      name: "Priya Nair",
      resumeText:
        "Priya is a senior engineer with 8 years across frontend and backend, most recently as a Staff Engineer at a SaaS company with 200k MAU. Expert in TypeScript, React, Node.js, and GraphQL. She led the rollout of a design-system that reduced frontend bug tickets by 30%. Has experience with GCP (Cloud Run, BigQuery) and championed observability practices (OpenTelemetry, Datadog).",
    },
    {
      id: "swe-04",
      name: "Chidi Eze",
      resumeText:
        "Chidi is a 2-year junior engineer fresh from a coding bootcamp with a CS degree. He has built personal projects using React and Node.js and completed two internships where he contributed to small API features. Enthusiastic learner, but has not yet worked in a production distributed system. Limited experience with cloud infrastructure beyond simple Heroku deployments.",
    },
    {
      id: "swe-05",
      name: "Fatima Al-Rashid",
      resumeText:
        "Fatima brings 5 years of systems engineering experience, including 2 years at a cloud infrastructure company writing Rust and Go for high-performance networking services. She has a deep understanding of concurrency models, message queues (Kafka, RabbitMQ), and Kubernetes. While she has not used TypeScript extensively, her systems knowledge and quick-learning track record are strong indicators.",
    },
    {
      id: "swe-06",
      name: "Samuel Boateng",
      resumeText:
        "Samuel is a mobile engineer with 5 years of React Native and iOS (Swift) development. He has shipped 3 apps to the App Store with 100k+ downloads. While he has some exposure to Node.js through BFF layers, his core expertise is firmly on the client side. His backend experience is limited to REST consumption rather than service construction.",
    },
    {
      id: "swe-07",
      name: "Lin Wei",
      resumeText:
        "Lin is a backend engineer with 7 years of experience in Java (Spring Boot) and recently transitioned to Node.js/TypeScript over the last 18 months. She led a high-availability payment service at a fintech processing $2B annually, with 99.99% uptime SLA. Strong in SQL performance tuning, event-driven architecture, and AWS. Currently studying for AWS Solutions Architect certification.",
    },
    {
      id: "swe-08",
      name: "Diego Herrera",
      resumeText:
        "Diego is a DevOps-leaning engineer with 4 years of experience primarily focused on CI/CD pipelines, Terraform, and Kubernetes. He is comfortable writing Node.js scripts and APIs but has not worked as a primary software engineer on product features. Strong in infrastructure reliability and cost optimization. Would be better suited for a platform or SRE role.",
    },
    {
      id: "swe-09",
      name: "Ngozi Adeyemi",
      resumeText:
        "Ngozi has 6 years of full-stack experience with TypeScript, Node.js, React, and PostgreSQL. She built a real-time collaborative document editor at her previous startup, tackling WebSocket concurrency challenges head-on. She has mentored two junior engineers and co-authored the engineering handbook. AWS certified and experienced with CDK for infrastructure-as-code.",
    },
  ],
  "job-002": [
    {
      id: "des-01",
      name: "Ife Okafor",
      resumeText:
        "Ife is a product designer with 5 years of experience specializing in B2B SaaS platforms. She led the redesign of a CRM dashboard that increased user engagement by 28% according to post-launch surveys. Expert in Figma, Design System construction, and cross-functional collaboration. She has conducted over 50 user interviews and is skilled in synthesizing insights into actionable design decisions.",
    },
    {
      id: "des-02",
      name: "Marcus Chen",
      resumeText:
        "Marcus is a visual designer with 4 years of agency experience creating brand identities and marketing assets. He recently transitioned toward product design and completed a 3-month fellowship, but has limited experience in SaaS product design, user research, or working embedded within engineering teams. His Figma skills are developing.",
    },
    {
      id: "des-03",
      name: "Aisha Diallo",
      resumeText:
        "Aisha is a senior UX designer with 7 years of experience, most recently at a fintech where she led design for their mobile-first experience. Highly skilled in Figma and Principle for prototyping. Has established a design system from scratch and trained a team of 3 junior designers. Runs structured usability tests using Maze and UserZoom and is comfortable presenting to C-suite.",
    },
    {
      id: "des-04",
      name: "Tobias Müller",
      resumeText:
        "Tobias is a UX researcher with 6 years of experience conducting user interviews, diary studies, and quantitative surveys. He is less comfortable with Figma and high-fidelity prototyping — preferring to partner with visual designers — but brings exceptional qualitative skills. He has published research findings that directly influenced product roadmap decisions at two companies.",
    },
    {
      id: "des-05",
      name: "Zara Khan",
      resumeText:
        "Zara is a product designer with 3 years of experience at a fast-growing e-commerce startup. She owns the mobile shopping experience end-to-end, working closely with engineering in bi-weekly sprints. Proficient in Figma and Storybook for design-engineering handoff. Ran her first usability tests solo this year. Eager to grow into more complex B2B workflows.",
    },
    {
      id: "des-06",
      name: "Emeka Nnaji",
      resumeText:
        "Emeka is a founding product designer with 4 years of experience at two early-stage startups where he wore multiple hats — designing, doing some front-end implementation, and contributing to product strategy. He has a strong instinct for product thinking and has shipped features loved by users, though his design process is less formal and research-led than larger teams might require.",
    },
    {
      id: "des-07",
      name: "Yuki Tanaka",
      resumeText:
        "Yuki is a UI/UX designer with 5 years of experience in enterprise software at a large Japanese corporation. Meticulous attention to detail and strong in design systems and accessibility (WCAG 2.1 AA). Has presented design reviews to directors and VP-level stakeholders. Looking to move into a more dynamic product company environment with shorter iteration cycles.",
    },
    {
      id: "des-08",
      name: "Fatou Dieng",
      resumeText:
        "Fatou is a product designer with 6 years of experience across both B2C and B2B products. She led the product design for an HR platform's onboarding flow that reduced time-to-first-value from 14 days to 4. Expert Figma user, experienced with Notion for design documentation, and skilled at facilitating design sprints and cross-functional workshops.",
    },
  ],
  "job-003": [
    {
      id: "da-01",
      name: "Kofi Mensah",
      resumeText:
        "Kofi is a data analyst with 4 years of experience at a growth-stage startup. He built and maintains 12 Looker dashboards tracking acquisition, retention, and revenue metrics. Expert in SQL across BigQuery and Snowflake, and proficient in Python (pandas, matplotlib) for ad-hoc analysis. Has led A/B testing programs that generated $1.2M incremental ARR.",
    },
    {
      id: "da-02",
      name: "Elena Volkov",
      resumeText:
        "Elena is a data scientist with 5 years of experience in predictive modeling and machine learning. She has strong Python skills (scikit-learn, PyTorch) but limited experience in business-facing dashboarding or SQL for operational reporting. Her work is primarily research-oriented. She would be better suited for an ML engineering or data science role.",
    },
    {
      id: "da-03",
      name: "Aditi Sharma",
      resumeText:
        "Aditi is a senior data analyst with 6 years of experience, including 3 years in a growth analytics role at a SaaS company. She designed the company's entire KPI framework from scratch and trained business partners on self-serve reporting in Metabase. Expert SQL user with experience in dbt for data modeling. Python-proficient (pandas, seaborn) with A/B testing experience.",
    },
    {
      id: "da-04",
      name: "Jordan Williams",
      resumeText:
        "Jordan is a business analyst with 3 years of experience in management consulting. Skilled in Excel and PowerPoint with some exposure to Tableau for client deliverables. Has recently started learning SQL on Codecademy. Limited experience with data warehouses, Python, or modern BI tooling like Looker or Metabase. Would need significant on-boarding.",
    },
    {
      id: "da-05",
      name: "Blessing Okonkwo",
      resumeText:
        "Blessing is a data analyst with 4 years of experience in the e-commerce sector. She manages end-to-end reporting pipelines using dbt, BigQuery, and Looker. Python-proficient with pandas and numpy for ETL transformations. She ran the company's entire experimentation program, designing and analyzing over 40 A/B tests. Strong communicator who presents insights weekly to the C-suite.",
    },
    {
      id: "da-06",
      name: "Ryo Yamamoto",
      resumeText:
        "Ryo is a data engineer with 5 years of experience building scalable data infrastructure. While he is highly skilled in dbt, Airflow, and Spark, his role has been infrastructure-focused rather than insights-focused. He is less comfortable with business KPI frameworks and stakeholder communication, but has deep technical skills in pipeline reliability and data quality.",
    },
    {
      id: "da-07",
      name: "Chisom Okeke",
      resumeText:
        "Chisom is a data analyst with 3 years of experience at a telecom company. Skilled in SQL and Tableau, she has built churn prediction dashboards and customer segmentation reports. She is beginning to explore Python for automation tasks. Has participated in one A/B test design but would benefit from more hands-on experimentation experience.",
    },
    {
      id: "da-08",
      name: "Lena Fischer",
      resumeText:
        "Lena brings 7 years of analytics experience, most recently as an Analytics Lead at a marketplace startup. She defined and maintained the company's north-star metric and coached a team of 2 analysts. Expert in SQL, Python, Looker, and Metabase. Her experimentation background is deep — she designed the company's statistical significance calculator from scratch.",
    },
    {
      id: "da-09",
      name: "Taiwo Adebayo",
      resumeText:
        "Taiwo is a data analyst with 2 years of experience in a financial services firm. He produces daily and weekly regulatory reports using SQL and Excel. He is detail-oriented and accurate, but his experience is narrowly focused on compliance reporting rather than growth or product analytics. Limited exposure to A/B testing or modern BI tools like Looker.",
    },
    {
      id: "da-10",
      name: "Mia Johansson",
      resumeText:
        "Mia is a product analyst with 5 years of experience, including 2 years embedded within a product team. She partners daily with PMs and designers to instrument features, analyze funnels, and run experiments. Proficient in SQL (Redshift), Python, Metabase, and Mixpanel. She has led two company-wide KPI definition projects and is a confident presenter to leadership.",
    },
  ],
};
