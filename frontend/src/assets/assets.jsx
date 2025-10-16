import GoogleLogo from "../assets/googlelogo.png";
import User from "../assets/user1.avif";
import Userr from "../assets/user2.avif";
export const jobCategories = [
  "Programming",
  "Data Science",
  "UI/UX Design",
  "Product Management",
  "Marketing",
  "Cybersecurity",
  "Finance",
  "Sales",
  "Customer Support",
  "Human Resources",
];

export const jobLocations = [
  "New York, USA",
  "London, UK",
  "Berlin, Germany",
  "Toronto, Canada",
  "Lagos, Nigeria",
  "Nairobi, Kenya",
  "Sydney, Australia",
  "Tokyo, Japan",
  "Dubai, UAE",
  "Remote",
];

export const viewApplicationPageData = [
  {
    _id: 1,
    name: "Sarah Johnson",
    jobTitle: "Frontend Developer",
    location: "Lagos, Nigeria",
    action: "View",
    resume: "https://example.com/resume-sarah.pdf",
    imgSrc: Userr,
  },
  {
    _id: 2,
    name: "Michael Smith",
    jobTitle: "Backend Engineer",
    location: "Abuja, Nigeria",
    action: "Pending",
    resume: "https://example.com/resume-michael.pdf",
    imgSrc: User,
  },
  {
    _id: 3,
    name: "Aisha Bello",
    jobTitle: "UI/UX Designer",
    location: "Nairobi, Kenya",
    action: "Approved",
    resume: "https://example.com/resume-aisha.pdf",
    imgSrc: Userr,
  },
  {
    _id: 4,
    name: "James Anderson",
    jobTitle: "Data Analyst",
    location: "Accra, Ghana",
    action: "View",
    resume: "https://example.com/resume-james.pdf",
    imgSrc: User,
  },
  {
    _id: 5,
    name: "Grace Okafor",
    jobTitle: "Mobile App Developer",
    location: "Port Harcourt, Nigeria",
    action: "Pending",
    resume: "https://example.com/resume-grace.pdf",
    imgSrc: Userr,
  },
  {
    _id: 6,
    name: "Daniel Mensah",
    jobTitle: "Project Manager",
    location: "Kumasi, Ghana",
    action: "View",
    resume: "https://example.com/resume-daniel.pdf",
    imgSrc: User,
  },
];
export const manageJobsData = [
  {
    jobTitle: "Frontend Developer",
    date: "2025-09-20",
    location: "Lagos, Nigeria",
    applicants: 42,
  },
  {
    jobTitle: "Backend Engineer",
    date: "2025-09-25",
    location: "Abuja, Nigeria",
    applicants: 35,
  },
  {
    jobTitle: "UI/UX Designer",
    date: "2025-09-30",
    location: "Remote",
    applicants: 28,
  },
  {
    jobTitle: "Project Manager",
    date: "2025-10-03",
    location: "Port Harcourt, Nigeria",
    applicants: 19,
  },
  {
    jobTitle: "DevOps Engineer",
    date: "2025-10-08",
    location: "Lagos, Nigeria",
    applicants: 24,
  },
  {
    jobTitle: "Mobile App Developer",
    date: "2025-10-10",
    location: "Enugu, Nigeria",
    applicants: 30,
  },
];

export const jobsApplied = [
  {
    company: "TechNova Solutions",
    title: "Frontend Developer",
    location: "Lagos, Nigeria",
    date: "2025-09-21",
    status: "Pending",
    image: GoogleLogo,
  },
  {
    company: "GreenLeaf Technologies",
    title: "UI/UX Designer",
    location: "Abuja, Nigeria",
    date: "2025-09-18",
    status: "Interview Scheduled",
    image: GoogleLogo,
  },
  {
    company: "FinEdge Finance",
    title: "Backend Engineer",
    location: "Remote",
    date: "2025-09-15",
    status: "Accepted",
    image: GoogleLogo,
  },
  {
    company: "BlueWave Systems",
    title: "Full Stack Developer",
    location: "Port Harcourt, Nigeria",
    date: "2025-09-10",
    status: "Rejected",
    image: GoogleLogo,
  },
  {
    company: "Astra Innovations",
    title: "Mobile App Developer",
    location: "Lagos, Nigeria",
    date: "2025-09-05",
    status: "Accepted",
    image: GoogleLogo,
  },
  {
    company: "DataCore Analytics",
    title: "Data Scientist",
    location: "Remote",
    date: "2025-09-01",
    status: "Pending",
    image: GoogleLogo,
  },
];

export const jobsData = [
  // SLACK
  {
    _id: "1",
    title: "Full Stack Developer",
    location: "California, USA",
    level: "Senior Level",
    companyId: {
      _id: "59758284984928352",
      name: "Slack",
      email: "careers@slack.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re looking for a passionate <strong>Full Stack Developer</strong> to join our engineering team and help us build modern, scalable web applications that power collaboration globally.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Design and develop RESTful APIs and responsive UIs using React and Node.js.</li>
        <li>Implement database schemas and manage data flow using MongoDB and SQL.</li>
        <li>Collaborate with product managers, designers, and QA engineers to deliver high-quality software.</li>
        <li>Optimize application performance and ensure scalability.</li>
        <li>Conduct code reviews and mentor junior developers.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in JavaScript (React, Node.js, Express).</li>
        <li>Experience with REST APIs, authentication, and state management.</li>
        <li>Knowledge of CI/CD pipelines and cloud platforms like AWS.</li>
        <li>Strong problem-solving and debugging skills.</li>
      </ul>
    `,
    salary: "$82,000",
    date: 1726636800000,
    category: "Programming",
  },
  {
    _id: "2",
    title: "Frontend Engineer",
    location: "Remote",
    level: "Mid Level",
    companyId: {
      _id: "59758284984928352",
      name: "Slack",
      email: "frontend@slack.com",
      image: GoogleLogo,
    },
    description: `
      <p>Slack is seeking a creative <strong>Frontend Engineer</strong> to enhance our user experience across desktop and mobile platforms. You will work closely with the design team to bring ideas to life.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop high-performance user interfaces with React and TypeScript.</li>
        <li>Ensure UI accessibility and responsiveness across all devices.</li>
        <li>Implement design system components and reusable patterns.</li>
        <li>Collaborate with backend engineers for API integration.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in React, Redux, and TypeScript.</li>
        <li>Understanding of responsive design principles.</li>
        <li>Familiarity with Tailwind CSS and modern frontend tooling.</li>
      </ul>
    `,
    salary: "$75,000",
    date: 1727740800000,
    category: "Programming",
  },

  // GOOGLE
  {
    _id: "3",
    title: "Data Scientist",
    location: "London, UK",
    level: "Mid Level",
    companyId: {
      _id: "79358284984929342",
      name: "Google",
      email: "jobs@google.com",
      image: GoogleLogo,
    },
    description: `
      <p>Join the <strong>Google Data Team</strong> as a <strong>Data Scientist</strong> to analyze large datasets, uncover insights, and build models that drive global product decisions.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop predictive models using Python and ML frameworks like TensorFlow and Scikit-learn.</li>
        <li>Collaborate with product and engineering teams to identify data-driven opportunities.</li>
        <li>Build dashboards and automate reporting pipelines.</li>
        <li>Present actionable insights to senior stakeholders.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Expertise in Python, SQL, and data visualization (Tableau, Looker).</li>
        <li>Strong statistical and analytical abilities.</li>
        <li>Understanding of deep learning and NLP concepts.</li>
      </ul>
    `,
    salary: "$105,000",
    date: 1728809600000,
    category: "Data Science",
  },
  {
    _id: "4",
    title: "Machine Learning Engineer",
    location: "Toronto, Canada",
    level: "Senior Level",
    companyId: {
      _id: "79358284984929342",
      name: "Google",
      email: "jobs@google.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re seeking a <strong>Machine Learning Engineer</strong> to design and deploy scalable ML systems across various Google products.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop ML pipelines and serve models in production environments.</li>
        <li>Collaborate with data scientists and software engineers to improve model accuracy.</li>
        <li>Monitor model drift and optimize inference performance.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Experience with TensorFlow, PyTorch, and Kubernetes.</li>
        <li>Strong software engineering background in Python or Go.</li>
        <li>Understanding of data pipelines and feature engineering.</li>
      </ul>
    `,
    salary: "$135,000",
    date: 1728833600000,
    category: "Artificial Intelligence",
  },

  // META
  {
    _id: "5",
    title: "Digital Marketing Specialist",
    location: "Lagos, Nigeria",
    level: "Mid Level",
    companyId: {
      _id: "8743958495823423",
      name: "Meta",
      email: "jobs@meta.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re searching for a <strong>Digital Marketing Specialist</strong> to manage advertising campaigns, measure ROI, and grow audience engagement.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop cross-channel ad campaigns across Facebook, Instagram, and Google.</li>
        <li>Analyze metrics and optimize conversion rates.</li>
        <li>Collaborate with content teams to maintain consistent brand voice.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in Google Ads, Meta Ads Manager, and SEO tools.</li>
        <li>Strong analytical and writing skills.</li>
        <li>Experience in audience segmentation and remarketing.</li>
      </ul>
    `,
    salary: "$62,000",
    date: 1728830000000,
    category: "Marketing",
  },
  {
    _id: "6",
    title: "Social Media Manager",
    location: "Remote",
    level: "Junior Level",
    companyId: {
      _id: "8743958495823423",
      name: "Meta",
      email: "social@meta.com",
      image: GoogleLogo,
    },
    description: `
      <p>Meta seeks a <strong>Social Media Manager</strong> to build, curate, and maintain vibrant social communities that represent the brand globally.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Create engaging content tailored to each platform.</li>
        <li>Respond to community interactions with professionalism.</li>
        <li>Collaborate with design teams for visual storytelling.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Experience in content strategy and community management.</li>
        <li>Strong writing and editing skills.</li>
        <li>Familiarity with analytics tools (Sprout, Hootsuite, Meta Insights).</li>
      </ul>
    `,
    salary: "$55,000",
    date: 1728893600000,
    category: "Marketing",
  },

  // AWS
  {
    _id: "7",
    title: "DevOps Engineer",
    location: "New York, USA",
    level: "Senior Level",
    companyId: {
      _id: "99483948394823",
      name: "Amazon Web Services",
      email: "aws@amazon.com",
      image: GoogleLogo,
    },
    description: `
      <p>Join AWS as a <strong>DevOps Engineer</strong> to automate cloud infrastructure, manage CI/CD pipelines, and maintain system reliability at scale.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Design and manage CI/CD pipelines using Jenkins, GitHub Actions, or CodePipeline.</li>
        <li>Implement Infrastructure-as-Code using Terraform or CloudFormation.</li>
        <li>Monitor applications and improve system reliability.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in AWS, Docker, and Kubernetes.</li>
        <li>Experience with Bash, Python, or Go scripting.</li>
        <li>Strong Linux and networking skills.</li>
      </ul>
    `,
    salary: "$120,000",
    date: 1728896600000,
    category: "Cloud Engineering",
  },
  {
    _id: "8",
    title: "Cloud Architect",
    location: "Dublin, Ireland",
    level: "Senior Level",
    companyId: {
      _id: "99483948394823",
      name: "Amazon Web Services",
      email: "aws@amazon.com",
      image: GoogleLogo,
    },
    description: `
      <p>As a <strong>Cloud Architect</strong>, you’ll design secure, scalable cloud infrastructures for enterprise customers worldwide.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop cloud migration and modernization strategies.</li>
        <li>Ensure high availability and disaster recovery setup.</li>
        <li>Collaborate with security teams to maintain compliance.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Deep expertise in AWS cloud architecture.</li>
        <li>Understanding of networking, IAM, and DevSecOps practices.</li>
        <li>Excellent client communication and documentation skills.</li>
      </ul>
    `,
    salary: "$140,000",
    date: 1728899600000,
    category: "Cloud Security",
  },

  // MICROSOFT
  {
    _id: "9",
    title: "Software Engineer",
    location: "Berlin, Germany",
    level: "Mid Level",
    companyId: {
      _id: "58483928483984",
      name: "Microsoft",
      email: "jobs@microsoft.com",
      image: GoogleLogo,
    },
    description: `
      <p>We are looking for a talented <strong>Software Engineer</strong> to join the Azure team and build robust, cloud-based applications.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop APIs and microservices using C#, .NET, and Azure.</li>
        <li>Collaborate with cross-functional teams on architecture design.</li>
        <li>Participate in Agile ceremonies and code reviews.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in C#, .NET, and Azure services.</li>
        <li>Experience with Docker, Kubernetes, and CI/CD tools.</li>
        <li>Strong understanding of RESTful API design.</li>
      </ul>
    `,
    salary: "$110,000",
    date: 1728933600000,
    category: "Programming",
  },
  {
    _id: "10",
    title: "Cloud Security Architect",
    location: "Remote",
    level: "Senior Level",
    companyId: {
      _id: "58483928483984",
      name: "Microsoft",
      email: "security@microsoft.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re seeking a <strong>Cloud Security Architect</strong> to design secure systems and ensure compliance across Azure cloud solutions.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop security frameworks and enforce best practices.</li>
        <li>Monitor for vulnerabilities and manage threat mitigation.</li>
        <li>Provide technical leadership on compliance initiatives.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Expertise in Azure, AWS, or GCP.</li>
        <li>Knowledge of identity management and encryption standards.</li>
        <li>Experience with SOC2 and ISO 27001 compliance.</li>
      </ul>
    `,
    salary: "$145,000",
    date: 1728945600000,
    category: "Cybersecurity",
  },

  // IBM
  {
    _id: "11",
    title: "Cybersecurity Analyst",
    location: "Toronto, Canada",
    level: "Senior Level",
    companyId: {
      _id: "48920394823984",
      name: "IBM",
      email: "security@ibm.com",
      image: GoogleLogo,
    },
    description: `
      <p>IBM is seeking an experienced <strong>Cybersecurity Analyst</strong> to safeguard digital assets and lead incident response activities.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Monitor network traffic for suspicious activities.</li>
        <li>Analyze logs, identify threats, and mitigate vulnerabilities.</li>
        <li>Collaborate with IT to implement robust defense systems.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Familiarity with SIEM tools and threat detection.</li>
        <li>Experience in ethical hacking and penetration testing.</li>
        <li>Certifications like CEH, CISSP, or Security+ preferred.</li>
      </ul>
    `,
    salary: "$115,000",
    date: 1728948600000,
    category: "Cybersecurity",
  },

  // PAYSTACK
  {
    _id: "12",
    title: "Backend Developer",
    location: "Nairobi, Kenya",
    level: "Mid Level",
    companyId: {
      _id: "4839482398423",
      name: "Paystack",
      email: "jobs@paystack.com",
      image: GoogleLogo,
    },
    description: `
      <p>Paystack is looking for a <strong>Backend Developer</strong> to build reliable APIs and payment infrastructures used by thousands of businesses.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Develop backend microservices using Node.js and Express.</li>
        <li>Integrate secure payment APIs and optimize transactions.</li>
        <li>Ensure scalability and maintain system documentation.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Proficiency in Node.js, MongoDB, and REST APIs.</li>
        <li>Knowledge of JWT authentication and async processing.</li>
        <li>Experience with fintech systems or payment gateways.</li>
      </ul>
    `,
    salary: "$80,000",
    date: 1728951600000,
    category: "Backend Development",
  },

  // OPENAI
  {
    _id: "13",
    title: "AI Research Engineer",
    location: "Tokyo, Japan",
    level: "Senior Level",
    companyId: {
      _id: "239483294839482",
      name: "OpenAI",
      email: "jobs@openai.com",
      image: GoogleLogo,
    },
    description: `
      <p>Join our team as an <strong>AI Research Engineer</strong> to explore deep learning architectures and build safe, scalable AI systems.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Design and train large-scale neural networks.</li>
        <li>Collaborate with researchers on AI alignment.</li>
        <li>Publish technical findings and share open-source contributions.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Expertise in PyTorch or TensorFlow.</li>
        <li>Strong foundation in deep learning and reinforcement learning.</li>
        <li>Passion for responsible AI development.</li>
      </ul>
    `,
    salary: "$160,000",
    date: 1728953600000,
    category: "Artificial Intelligence",
  },

  // ATLASSIAN
  {
    _id: "14",
    title: "Product Manager",
    location: "Sydney, Australia",
    level: "Mid Level",
    companyId: {
      _id: "83423984329834",
      name: "Atlassian",
      email: "careers@atlassian.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re seeking a <strong>Product Manager</strong> who can bridge business strategy and technical execution to deliver exceptional user experiences.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Define product vision and roadmap.</li>
        <li>Collaborate with cross-functional teams to drive features from concept to launch.</li>
        <li>Use analytics and customer feedback for data-driven decisions.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Strong leadership and communication skills.</li>
        <li>Experience with Agile methodology and Jira.</li>
        <li>Understanding of software development lifecycle.</li>
      </ul>
    `,
    salary: "$120,000",
    date: 1728954600000,
    category: "Product Management",
  },

  // STRIPE
  {
    _id: "15",
    title: "Finance Analyst",
    location: "New York, USA",
    level: "Mid Level",
    companyId: {
      _id: "2384938498394",
      name: "Stripe",
      email: "finance@stripe.com",
      image: GoogleLogo,
    },
    description: `
      <p>We’re hiring a <strong>Finance Analyst</strong> to provide insights on financial performance and support strategic planning.</p>
      <h2>Key Responsibilities</h2>
      <ul>
        <li>Prepare monthly and quarterly financial reports.</li>
        <li>Conduct variance analysis and forecasting.</li>
        <li>Collaborate with cross-functional teams on budgeting.</li>
      </ul>
      <h2>Skills Required</h2>
      <ul>
        <li>Strong knowledge of Excel, SQL, and financial modeling.</li>
        <li>Attention to detail and data interpretation skills.</li>
        <li>Experience in fintech or SaaS preferred.</li>
      </ul>
    `,
    salary: "$95,000",
    date: 1728956600000,
    category: "Finance",
  },
  {
    _id: "16",
    title: "Machine Learning Engineer",
    location: "San Francisco, USA",
    level: "Senior Level",
    companyId: {
      _id: "239483294839482",
      name: "OpenAI",
      email: "jobs@openai.com",
      image: GoogleLogo,
    },
    description: `
    <p>OpenAI is looking for a <strong>Machine Learning Engineer</strong> to develop and optimize deep learning models that push the boundaries of AI capabilities.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Design and train neural networks for NLP and vision tasks.</li>
      <li>Collaborate with researchers to deploy scalable AI systems.</li>
      <li>Contribute to performance benchmarking and optimization.</li>
      <li>Maintain infrastructure for distributed model training.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Strong proficiency in Python, TensorFlow, and PyTorch.</li>
      <li>Deep understanding of deep learning algorithms and architectures.</li>
      <li>Experience with cloud computing and GPU acceleration.</li>
      <li>Excellent problem-solving and debugging skills.</li>
    </ul>
  `,
    salary: "$155,000",
    date: 1729008000000,
    category: "Artificial Intelligence",
  },
  {
    _id: "17",
    title: "AI Ethics Researcher",
    location: "Tokyo, Japan",
    level: "Mid Level",
    companyId: {
      _id: "239483294839482",
      name: "OpenAI",
      email: "ethics@openai.com",
      image: GoogleLogo,
    },
    description: `
    <p>We’re seeking an <strong>AI Ethics Researcher</strong> to study and develop frameworks ensuring safe, transparent, and fair AI systems.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Conduct research on bias mitigation and model interpretability.</li>
      <li>Work with engineering teams to implement ethical AI practices.</li>
      <li>Publish findings and participate in academic collaborations.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Background in AI ethics, sociology, or computer science.</li>
      <li>Strong writing and presentation skills.</li>
      <li>Knowledge of Python, NLP, and ML evaluation metrics.</li>
    </ul>
  `,
    salary: "$120,000",
    date: 1729056000000,
    category: "Artificial Intelligence",
  },
  {
    _id: "18",
    title: "Cybersecurity Engineer",
    location: "Toronto, Canada",
    level: "Mid Level",
    companyId: {
      _id: "48920394823984",
      name: "IBM",
      email: "security@ibm.com",
      image: GoogleLogo,
    },
    description: `
    <p>Join IBM’s Security Division as a <strong>Cybersecurity Engineer</strong> to develop robust defenses against evolving cyber threats.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Design and deploy secure architectures for enterprise systems.</li>
      <li>Monitor and analyze network activity for anomalies.</li>
      <li>Lead vulnerability assessments and security audits.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Knowledge of firewalls, intrusion detection, and SIEM systems.</li>
      <li>Experience with scripting (Python, Bash).</li>
      <li>Certifications such as CISSP, CEH, or OSCP preferred.</li>
    </ul>
  `,
    salary: "$115,000",
    date: 1729104000000,
    category: "Cybersecurity",
  },
  {
    _id: "19",
    title: "Cloud Solutions Engineer",
    location: "Dublin, Ireland",
    level: "Mid Level",
    companyId: {
      _id: "58483928483984",
      name: "Microsoft Azure",
      email: "jobs@microsoft.com",
      image: GoogleLogo,
    },
    description: `
    <p>We’re hiring a <strong>Cloud Solutions Engineer</strong> to help clients design and implement scalable cloud infrastructures on Azure.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Architect and deploy cloud solutions for enterprise customers.</li>
      <li>Automate processes and improve cloud performance.</li>
      <li>Provide technical support and best practice guidance.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Hands-on experience with Azure, Kubernetes, and Terraform.</li>
      <li>Strong scripting and automation skills.</li>
      <li>Good understanding of cloud networking and identity management.</li>
    </ul>
  `,
    salary: "$125,000",
    date: 1729152000000,
    category: "Cloud Engineering",
  },
  {
    _id: "20",
    title: "Payment Systems Engineer",
    location: "Lagos, Nigeria",
    level: "Mid Level",
    companyId: {
      _id: "4839482398423",
      name: "Paystack",
      email: "jobs@paystack.com",
      image: GoogleLogo,
    },
    description: `
    <p>Paystack is looking for a <strong>Payment Systems Engineer</strong> to build and maintain secure, scalable financial APIs.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Develop and integrate new payment gateways.</li>
      <li>Ensure high system uptime and transaction reliability.</li>
      <li>Collaborate with compliance teams on data security.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Strong experience in Node.js and microservice architecture.</li>
      <li>Familiarity with financial protocols (ISO 8583, PCI DSS).</li>
      <li>Knowledge of AWS and database optimization.</li>
    </ul>
  `,
    salary: "$90,000",
    date: 1729200000000,
    category: "Backend Development",
  },
  {
    _id: "21",
    title: "Frontend Developer",
    location: "Nairobi, Kenya",
    level: "Junior Level",
    companyId: {
      _id: "4839482398423",
      name: "Paystack",
      email: "jobs@paystack.com",
      image: GoogleLogo,
    },
    description: `
    <p>Join our growing team as a <strong>Frontend Developer</strong> to build fast and user-friendly dashboards for merchants.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Develop responsive interfaces using React and Tailwind CSS.</li>
      <li>Integrate RESTful APIs and manage client-side state.</li>
      <li>Ensure UI consistency and cross-browser compatibility.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Proficiency in React.js, JavaScript (ES6+), and HTML/CSS.</li>
      <li>Experience with Git, Redux, and frontend testing tools.</li>
      <li>Strong attention to detail and UX sensitivity.</li>
    </ul>
  `,
    salary: "$75,000",
    date: 1729258000000,
    category: "Frontend Development",
  },
  {
    _id: "22",
    title: "Data Analyst",
    location: "London, UK",
    level: "Mid Level",
    companyId: {
      _id: "79358284984929342",
      name: "Google",
      email: "jobs@google.com",
      image: GoogleLogo,
    },
    description: `
    <p>We’re hiring a <strong>Data Analyst</strong> to transform raw data into actionable business insights at Google UK.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Analyze large datasets and generate reports.</li>
      <li>Collaborate with teams to improve decision-making through data.</li>
      <li>Develop dashboards and automate reporting pipelines.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Proficiency in SQL, Python, and visualization tools (Looker, Tableau).</li>
      <li>Strong understanding of statistics and data modeling.</li>
      <li>Excellent communication and storytelling skills.</li>
    </ul>
  `,
    salary: "$100,000",
    date: 1729306000000,
    category: "Data Science",
  },
  {
    _id: "23",
    title: "Financial Operations Specialist",
    location: "San Francisco, USA",
    level: "Mid Level",
    companyId: {
      _id: "2384938498394",
      name: "Stripe",
      email: "finance@stripe.com",
      image: GoogleLogo,
    },
    description: `
    <p>Stripe seeks a <strong>Financial Operations Specialist</strong> to ensure accuracy and efficiency in our global payment operations.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Reconcile transactions and resolve discrepancies.</li>
      <li>Assist with compliance and audit requirements.</li>
      <li>Collaborate with product teams to improve payment workflows.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Strong analytical and Excel skills.</li>
      <li>Experience in accounting, reconciliation, or financial analysis.</li>
      <li>Knowledge of fintech operations preferred.</li>
    </ul>
  `,
    salary: "$92,000",
    date: 1729354000000,
    category: "Finance",
  },
  {
    _id: "24",
    title: "Backend Infrastructure Engineer",
    location: "Remote",
    level: "Senior Level",
    companyId: {
      _id: "239483294839482",
      name: "OpenAI",
      email: "infra@openai.com",
      image: GoogleLogo,
    },
    description: `
    <p>We’re looking for a <strong>Backend Infrastructure Engineer</strong> to design and maintain core backend systems supporting our AI platforms.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Develop microservices and data pipelines in Python and Go.</li>
      <li>Improve reliability and scalability of production systems.</li>
      <li>Collaborate with research teams to deploy models at scale.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Strong experience in distributed systems.</li>
      <li>Proficiency in Docker, Kubernetes, and cloud deployment.</li>
      <li>Excellent debugging and optimization skills.</li>
    </ul>
  `,
    salary: "$160,000",
    date: 1729402000000,
    category: "Backend Development",
  },
  {
    _id: "25",
    title: "Technical Program Manager",
    location: "Toronto, Canada",
    level: "Senior Level",
    companyId: {
      _id: "48920394823984",
      name: "IBM",
      email: "careers@ibm.com",
      image: GoogleLogo,
    },
    description: `
    <p>IBM is hiring a <strong>Technical Program Manager</strong> to lead cross-functional engineering initiatives and ensure timely project delivery.</p>
    <h2>Key Responsibilities</h2>
    <ul>
      <li>Oversee project planning, execution, and stakeholder communication.</li>
      <li>Coordinate multiple engineering teams across time zones.</li>
      <li>Track progress and manage risks effectively.</li>
    </ul>
    <h2>Skills Required</h2>
    <ul>
      <li>Experience in project management tools (Jira, Asana).</li>
      <li>Strong technical understanding of software development.</li>
      <li>Excellent organizational and leadership skills.</li>
    </ul>
  `,
    salary: "$135,000",
    date: 1729450000000,
    category: "Project Management",
  },
];
