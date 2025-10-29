// Seed script to populate database with Arham Aqeel's portfolio data from resume
import { db } from "./db";
import { projects, experiences, skills, leadership, siteContent } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database with Arham's portfolio data...");

  try {
    // Site Content / Bio
    await db.insert(siteContent).values({
      id: "singleton",
      heroTitle: "Arham Aqeel",
      heroSubtitle: "Product Management & Mechanical Engineering",
      aboutBio: `I'm a mechanical engineering undergraduate at NIT Tiruchirappalli with a unique blend of technical expertise and product thinking. My journey spans from designing award-winning all-terrain vehicles to building predictive analytics dashboards that drive business decisions.

Through internships at Blink Digital, Spacecord, Patrawale Foods, and IIT Delhi, I've developed a strong foundation in product management, digital marketing, and data-driven decision making. I thrive at the intersection of engineering and product strategy.

As Brakes Subsystem Lead at PSI Racing and Social Media Lead at TEDxNITTrichy, I've learned the importance of cross-functional collaboration and user-centric design in bringing complex projects from concept to reality.`,
      location: "Trichy, India",
      availability: "Open to opportunities",
      email: "arhamaqeel43@gmail.com",
      phone: "+91-8090061797",
      linkedin: "https://linkedin.com/in/arham-aqeel",
    }).onConflictDoNothing();

    // Projects
    const projectsData = [
      {
        title: "MBAJA ATV – PSI Racing Club",
        slug: "mbaja-atv-psi-racing",
        category: "Engineering",
        shortDescription: "Led 25-member cross-functional team to design and deliver competition-ready 4WD all-terrain vehicle, achieving AIR-2 nationally.",
        technologies: ["PTC Creo", "ANSYS", "FEA", "CFD", "Manufacturing"],
        timeline: "Mar 2023 – Jan 2024",
        teamSize: "25-member cross-functional team",
        role: "Brakes Subsystem Lead & Product Manager",
        problemStatement: "Design and manufacture a competition-ready all-terrain vehicle for BAJA SAEINDIA 2024 that balances performance, cost, and reliability while meeting strict technical regulations.",
        solution: "Led end-to-end product development from concept to competition, managing braking and drivetrain systems while coordinating between design, analysis, and manufacturing teams.",
        process: `1. Requirements Gathering & Planning
- Analyzed BAJA SAEINDIA technical regulations
- Defined system-level requirements for braking and drivetrain
- Created product roadmap with clear milestones and deadlines

2. Design & Prototyping
- Designed pedal assembly & caliper mounts using Creo Parametric
- Developed innovative 4WD drivetrain system
- Iterative prototyping and testing

3. Analysis & Validation
- Conducted FEA simulations in ANSYS
- Achieved 20% weight reduction while maintaining structural integrity
- Validated designs under extreme load conditions

4. Manufacturing & Testing
- Coordinated with fabrication teams
- Implemented quality control processes
- Conducted real-world performance testing`,
        results: `- Achieved AIR-2 (All India Rank 2) in Virtual Event
- Top 5 finish in Static Event among 100+ national teams
- 20% weight reduction through FEA-driven design optimization
- 35% improvement in traction with 4WD system
- Successfully delivered on-time despite aggressive timeline`,
        metrics: [
          { label: "National Ranking", value: "AIR-2" },
          { label: "Weight Reduction", value: "20%" },
          { label: "Traction Improvement", value: "35%" },
        ],
        featured: true,
        displayOrder: 1,
        published: true,
      },
      {
        title: "Customer Churn Prediction Tool",
        slug: "customer-churn-prediction",
        category: "Product Management",
        shortDescription: "Developed predictive dashboard achieving 85% accuracy in identifying at-risk customers, with actionable retention strategies.",
        technologies: ["Python", "Machine Learning", "scikit-learn", "pandas", "Power BI"],
        timeline: "Apr 2024 – May 2024",
        role: "Product Manager & Data Analyst",
        problemStatement: "Businesses lose customers without understanding why. Need a data-driven solution to predict churn and recommend retention strategies before it's too late.",
        solution: "Built an ML-powered dashboard that analyzes customer behavior patterns and predicts churn risk with 85% accuracy, providing actionable insights for retention teams.",
        process: `1. Data Analysis
- Conducted exploratory data analysis (EDA) with pandas and seaborn
- Identified key churn drivers through statistical analysis
- Implemented SMOTE for handling class imbalance

2. Model Development
- Evaluated multiple ML algorithms (Logistic Regression, XGBoost, SVM, KNN)
- Selected logistic regression for optimal balance of accuracy and interpretability
- Achieved 85% prediction accuracy

3. Dashboard & Insights
- Built interactive Power BI dashboard for stakeholders
- Translated technical metrics into business insights
- Designed actionable retention workflows

4. Validation & Impact
- Partnered with mock client team to validate recommendations
- Measured potential impact on customer lifetime value`,
        results: `- 85% prediction accuracy in identifying at-risk customers
- 11% potential reduction in customer attrition
- Clear, actionable retention strategies for each customer segment
- Dashboard adopted by stakeholders for monthly reviews`,
        metrics: [
          { label: "Prediction Accuracy", value: "85%" },
          { label: "Attrition Reduction", value: "11%" },
        ],
        featured: true,
        displayOrder: 2,
        published: true,
      },
      {
        title: "Supply Chain Optimization Platform",
        slug: "supply-chain-optimization",
        category: "Product Management",
        shortDescription: "Prototyped logistics optimization dashboard reducing costs by 18% through optimal warehouse placement and route planning.",
        technologies: ["LLamasoft Supply Chain Guru", "R", "ARIMA", "Simulation", "Optimization"],
        timeline: "May 2024 – Jul 2024",
        role: "Product Manager & Operations Analyst",
        problemStatement: "Inefficient distribution networks lead to high logistics costs, stockouts, and delayed deliveries. Need data-driven optimization to improve the entire supply chain.",
        solution: "Redesigned distribution network using advanced simulation and forecasting, reducing total logistics costs by 18% while improving service levels.",
        process: `1. Network Analysis
- Mapped current distribution network
- Identified inefficiencies and bottlenecks
- Benchmarked against industry standards

2. Optimization Modeling
- Used LLamasoft Supply Chain Guru for network redesign
- Optimized warehouse locations and inventory allocation
- Designed efficient routing algorithms

3. Demand Forecasting
- Developed R-based forecasting models (ARIMA, Exponential Smoothing)
- Improved demand prediction accuracy by 22%
- Reduced stockouts significantly

4. Simulation & Validation
- Arena/Simul8 simulation to test scenarios
- Identified and resolved 3 key bottlenecks
- Validated 15% throughput improvement`,
        results: `- 18% reduction in total logistics costs
- 22% improvement in demand prediction accuracy
- 15% increase in throughput
- 30% reduction in picker travel time through warehouse slotting
- ROI positive within first year of implementation`,
        metrics: [
          { label: "Cost Reduction", value: "18%" },
          { label: "Forecast Accuracy", value: "+22%" },
          { label: "Throughput Increase", value: "15%" },
        ],
        featured: true,
        displayOrder: 3,
        published: true,
      },
      {
        title: "EBAJA Electric ATV",
        slug: "ebaja-electric-atv",
        category: "Engineering",
        shortDescription: "Designed rear hub assembly and brake systems for electric ATV, contributing to AIR-8 national ranking and AIR-2 among rookie teams.",
        technologies: ["Fusion 360", "ANSYS", "CFD", "Topology Optimization", "Generative Design"],
        timeline: "Feb 2024 – Jan 2025",
        teamSize: "Cross-functional engineering team",
        role: "Mechanical Design Engineer",
        problemStatement: "Design high-performance brake and hub systems for the team's first electric ATV, balancing thermal management, weight, and regenerative braking integration.",
        solution: "Optimized rear hub assembly and developed CFD-optimized brake cooling system, enhancing durability and thermal performance.",
        results: `- AIR-8 national ranking, AIR-2 among rookie teams
- 20% improvement in component durability through topology optimization
- 15% reduction in peak rotor temperatures
- Successful integration of regenerative braking system`,
        metrics: [
          { label: "National Ranking", value: "AIR-8" },
          { label: "Rookie Ranking", value: "AIR-2" },
          { label: "Durability Improvement", value: "20%" },
        ],
        featured: false,
        displayOrder: 4,
        published: true,
      },
    ];

    for (const project of projectsData) {
      await db.insert(projects).values(project).onConflictDoNothing();
    }

    // Experiences
    const experiencesData = [
      {
        company: "Blink Digital",
        role: "Product Management Intern",
        duration: "Mar 2025 – May 2025",
        type: "internship",
        achievements: [
          "Collaborated with marketing and engineering teams to improve ad campaign dashboard usability, increasing client retention by 15%",
          "Defined and tracked key success metrics (CTR, CAC, LTV) using Google Analytics and Power BI dashboards",
          "Led weekly sprints for feature enhancements based on user feedback and A/B testing results",
          "Drafted product requirement documents (PRDs) for campaign automation tools",
        ],
        displayOrder: 1,
        published: true,
      },
      {
        company: "Spacecord (Non-Profit)",
        role: "Product Analyst Intern",
        duration: "Jan 2024 – Apr 2024",
        type: "internship",
        achievements: [
          "Analyzed engagement funnels across web and social channels to identify content drop-off points, improving engagement by 60%",
          "Prototyped new student dashboard in Figma based on survey insights from 300+ users",
          "Automated newsletter workflows via Zapier, reducing operational load by 40%",
          "Presented weekly reports to leadership with actionable insights for growth",
        ],
        displayOrder: 2,
        published: true,
      },
      {
        company: "Patrawale Foods",
        role: "Sales & Growth Intern",
        duration: "Dec 2024 – Feb 2025",
        type: "internship",
        achievements: [
          "Analyzed customer onboarding journey, identifying friction points that reduced drop-offs by 12%",
          "Contributed to developing CRM-based tracking workflows for 200+ customers",
          "Created feedback loops between marketing and sales for continuous iteration of outreach strategies",
        ],
        displayOrder: 3,
        published: true,
      },
      {
        company: "IIT Delhi",
        role: "Research Intern",
        duration: "May 2025 – Jul 2025",
        location: "Delhi, India",
        type: "research",
        achievements: [
          "Designed and tested prototypes for energy-harvesting systems, coordinating between fabrication and analytics teams",
          "Defined project milestones and managed cross-functional dependencies for testing workflows",
          "Translated complex technical data into clear reports for research leads and sponsors",
          "Analyzed vortex formation patterns using Particle Image Velocimetry (PIV)",
        ],
        displayOrder: 4,
        published: true,
      },
    ];

    for (const experience of experiencesData) {
      await db.insert(experiences).values(experience).onConflictDoNothing();
    }

    // Skills
    const skillsData = [
      // Product Management
      { name: "Roadmapping", category: "Product Management", proficiency: 85, displayOrder: 1 },
      { name: "Prioritization", category: "Product Management", proficiency: 85, displayOrder: 2 },
      { name: "User Research", category: "Product Management", proficiency: 80, displayOrder: 3 },
      { name: "Product Specs", category: "Product Management", proficiency: 85, displayOrder: 4 },
      
      // Project Management
      { name: "Notion", category: "Project Management", proficiency: 90, displayOrder: 1 },
      { name: "Trello", category: "Project Management", proficiency: 85, displayOrder: 2 },
      { name: "Asana", category: "Project Management", proficiency: 80, displayOrder: 3 },
      { name: "Agile/Scrum", category: "Project Management", proficiency: 85, displayOrder: 4 },
      
      // Analytics
      { name: "SQL", category: "Analytics", proficiency: 85, displayOrder: 1 },
      { name: "Python", category: "Analytics", proficiency: 90, displayOrder: 2 },
      { name: "Power BI", category: "Analytics", proficiency: 85, displayOrder: 3 },
      { name: "Google Analytics", category: "Analytics", proficiency: 80, displayOrder: 4 },
      
      // Growth & Marketing
      { name: "SEO", category: "Growth & Marketing", proficiency: 80, displayOrder: 1 },
      { name: "A/B Testing", category: "Growth & Marketing", proficiency: 85, displayOrder: 2 },
      { name: "Meta Ads", category: "Growth & Marketing", proficiency: 80, displayOrder: 3 },
      { name: "Google Ads", category: "Growth & Marketing", proficiency: 75, displayOrder: 4 },
      
      // UX & Design
      { name: "Figma", category: "UX & Design", proficiency: 85, displayOrder: 1 },
      { name: "Canva", category: "UX & Design", proficiency: 90, displayOrder: 2 },
      { name: "User Journey Mapping", category: "UX & Design", proficiency: 80, displayOrder: 3 },
      
      // Tech Tools
      { name: "Zapier", category: "Tech Tools", proficiency: 85, displayOrder: 1 },
      { name: "HubSpot", category: "Tech Tools", proficiency: 75, displayOrder: 2 },
      { name: "Firebase", category: "Tech Tools", proficiency: 70, displayOrder: 3 },
      
      // Programming
      { name: "Python", category: "Programming", proficiency: 90, displayOrder: 1 },
      { name: "JavaScript", category: "Programming", proficiency: 85, displayOrder: 2 },
      { name: "HTML/CSS", category: "Programming", proficiency: 85, displayOrder: 3 },
      { name: "MATLAB", category: "Programming", proficiency: 75, displayOrder: 4 },
      
      // CAD/CAE
      { name: "PTC Creo", category: "CAD/CAE", proficiency: 90, displayOrder: 1 },
      { name: "SolidWorks", category: "CAD/CAE", proficiency: 85, displayOrder: 2 },
      { name: "Fusion 360", category: "CAD/CAE", proficiency: 85, displayOrder: 3 },
      { name: "ANSYS", category: "CAD/CAE", proficiency: 85, displayOrder: 4 },
      { name: "Abaqus", category: "CAD/CAE", proficiency: 75, displayOrder: 5 },
    ];

    for (const skill of skillsData) {
      await db.insert(skills).values(skill).onConflictDoNothing();
    }

    // Leadership & Initiatives
    const leadershipData = [
      {
        organization: "PSI Racing",
        role: "Brakes Subsystem Lead",
        duration: "Jan 2023 – Present",
        description: "Leading design, analysis, and fabrication of hydraulic brake systems for competition ATVs.",
        contributions: [
          "Leading a team of 17 members in designing hydraulic brake systems for ATV, ensuring compliance with SAE BAJA standards",
          "Defined development timelines, delegated tasks, and conducted design reviews to optimize component performance",
          "Spearheaded the design and integration of a regenerative braking system for the team's first electric ATV",
          "Pioneered the redesign of throttle-by-wire system for seamless integration with regenerative braking",
          "Implemented Agile stand-ups to align weekly tasks and performance metrics",
        ],
        displayOrder: 1,
        published: true,
      },
      {
        organization: "TEDxNITTrichy",
        role: "Social Media & Ideation",
        duration: "Jan 2022 – Jan 2025",
        description: "Led content strategy and social media execution for TEDx events with 10k+ audience reach.",
        contributions: [
          "Developed and executed social media calendar, increasing engagement by 40% through data-driven content optimization",
          "Produced 50+ high-impact Reels and carousel posts using Canva and CapCut, growing follower base",
          "Led visual identity development across all platforms, maintaining consistent TEDx branding guidelines",
          "Assisted in speaker curation and sponsor outreach, contributing to 3 successful corporate partnerships",
          "Planned content sprints and managed end-to-end production cycles for TEDx events",
        ],
        displayOrder: 2,
        published: true,
      },
      {
        organization: "Festember",
        role: "Audio Visuals Lead",
        duration: "Jan 2023 – Oct 2024",
        description: "Directed audio-visual production for India's largest student-run cultural festival with 10,000+ attendees.",
        contributions: [
          "Spearheaded technical setup of 2 main stages (GJCH Main Stage and Indie Stage), ensuring flawless performances",
          "Coordinated with 5+ AV equipment vendors, negotiating contracts and optimizing resource allocation within budget",
          "Oversaw sound engineering, lighting design, and live streaming for 50+ events across 3 festival days",
          "Managed 15+ member crew, implementing rigorous testing protocols that reduced technical failures",
        ],
        displayOrder: 3,
        published: true,
      },
      {
        organization: "SAEINDIA NIT Trichy Collegiate Club",
        role: "Executive Committee Member",
        duration: "Jan 2024 – Present",
        description: "Organized automotive workshops and represented NIT Trichy at national conferences.",
        contributions: [
          "Organized 10+ automotive workshops and competitions, attracting 300+ student participants annually",
          "Represented NIT Trichy at 5+ national SAEINDIA conferences, showcasing student innovations",
          "Designed curriculum for automotive upskilling programs that increased member participation",
          "Mentored 3 student teams for SAE competitions (BAJA, Formula, Aero) through technical review sessions",
        ],
        displayOrder: 4,
        published: true,
      },
    ];

    for (const item of leadershipData) {
      await db.insert(leadership).values(item).onConflictDoNothing();
    }

    console.log("✅ Database seeded successfully!");
    console.log("📊 Seeded:");
    console.log(`   - ${projectsData.length} projects`);
    console.log(`   - ${experiencesData.length} experiences`);
    console.log(`   - ${skillsData.length} skills`);
    console.log(`   - ${leadershipData.length} leadership roles`);
    console.log(`   - Site content and bio`);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seed if called directly
seed()
  .then(() => {
    console.log("🎉 Seed completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seed failed:", error);
    process.exit(1);
  });

export { seed };
