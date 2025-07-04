export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  imageHint: string;
  liveUrl?: string;
  repoUrl?: string;
  media?: Array<
    | { type: "image"; src: string; alt?: string }
    | { type: "video"; src: string; alt?: string }
    | { type: "embed"; src: string; alt?: string }
  >;
};

export const projects: Project[] = [
  {
    slug: "cv-gen",
    title: "AI Powered CV and Career Path Generator",
    description:
      "A web platform for building professional CVs and receiving AI-powered career path recommendations, with multi-role features for job seekers and recruiters.",
    longDescription: `CVGen is a comprehensive, full-stack web platform designed to revolutionize the way individuals create professional CVs and plan their career paths using artificial intelligence. The platform is built to serve both job seekers and recruiters, providing a seamless, modern, and highly interactive experience for all users.\n\n**Key Features:**\n\n1. **AI-Powered CV Builder:**\n   - Users can create, edit, and manage multiple CVs using a variety of professionally designed templates (Minimalist, Modern, Creative, Elegant, Technical, Academic, Chronological, Functional, Infographic, Compact, Executive, Professional, etc.).\n   - The builder supports rich data input, including personal information, education, work experience, skills, languages, and certificates.\n   - Real-time preview and customization options (color schemes, layout, and style) are available, with instant updates as users modify their data.\n   - Users can save, download, or export their CVs as images (using html2canvas) or printable documents.\n   - The system provides placeholder data and guidance to help users fill out their CVs effectively.\n\n2. **AI Career Path Generator:**\n   - The platform leverages advanced AI models to analyze the content of a user's CV and any additional career goals provided.\n   - Based on this analysis, the AI generates personalized career path recommendations, including suggested roles, industries, required skills, and step-by-step guidance for career advancement.\n   - The AI considers the user's current skills, education, experience, and stated interests to provide actionable, realistic, and tailored advice.\n   - Users can iteratively refine their career goals and receive updated recommendations.\n\n3. **Multi-Role System:**\n   - The application supports two main user roles: Job Seeker and Recruiter.\n   - **Job Seekers** can build and manage CVs, generate career paths, apply for jobs, and track their application progress.\n   - **Recruiters** can post job listings, search for candidates, view submitted CVs, and manage applications.\n   - The UI dynamically adapts to the user's role, providing relevant navigation, dashboards, and features.\n\n4. **Progress Dashboard:**\n   - Users have access to a dashboard that visualizes their progress, such as the number of CVs created, jobs applied to, and career path milestones achieved.\n   - The dashboard uses charts and statistics (powered by Recharts) to provide insights and motivation.\n\n5. **Job Application System:**\n   - Job seekers can browse and apply to job listings directly from the platform.\n   - Recruiters can manage job postings and review applications, including detailed CV views.\n   - The system supports application tracking and status updates.\n\n6. **Real-Time Features:**\n   - The platform is designed to support real-time updates and notifications using WebSockets, ensuring users receive instant feedback on application status, new job postings, and other relevant events.\n\n7. **Modern UI/UX:**\n   - The frontend is built with React and Tailwind CSS, providing a responsive, accessible, and visually appealing interface.\n   - Animations and transitions are handled with Framer Motion for a smooth user experience.\n   - The application is fully responsive and works seamlessly across devices.\n\n8. **Extensibility and Modularity:**\n   - The codebase is organized into modular components and services, making it easy to extend with new features, templates, or integrations.\n   - State management is handled with Zustand, and API interactions are abstracted for maintainability.\n\n9. **Security and Authentication:**\n   - User authentication is implemented using JWT, with secure password handling (bcryptjs) and role-based access control.\n   - Sensitive operations are protected by middleware on the backend.\n\n10. **Backend Architecture:**\n    - The backend is built with Node.js and Express, exposing a RESTful API for all frontend operations.\n    - AI services are integrated via OpenAI/XAI SDKs, enabling advanced natural language processing and recommendation capabilities.\n    - The backend supports file uploads (multer), logging (morgan), and robust error handling.\n    - Data is stored in a relational database (MySQL or PostgreSQL), with models for users, CVs, jobs, applications, and more.\n\n11. **Deployment and Scalability:**\n    - The platform is designed for cloud deployment (e.g., Render), with environment-based configuration and support for horizontal scaling.\n    - Static assets and images are served efficiently, and the system is optimized for performance.\n\n**Data Flow and User Journey:**\n\n- A new user registers and selects their role (job seeker or recruiter).\n- Job seekers are guided through the CV creation process, with real-time previews and AI-powered suggestions.\n- Once a CV is created, users can generate a personalized career path, apply for jobs, and track their progress.\n- Recruiters can post jobs, search for candidates, and review applications, with access to detailed CVs and candidate analytics.\n- All interactions are secured, and users receive real-time updates and notifications.\n\n**Use Cases:**\n- Students and fresh graduates seeking guidance on career planning and CV building.\n- Experienced professionals looking to optimize their CVs and explore new career opportunities.\n- Recruiters and HR professionals searching for qualified candidates and managing job postings.\n- Career coaches and advisors assisting clients with personalized career development.\n\n**Technologies Used:**\n- Frontend: React, Tailwind CSS, Zustand, React Router, Framer Motion, Recharts, html2canvas, axios, uuid.\n- Backend: Node.js, Express, OpenAI/XAI SDK, JWT, bcryptjs, multer, morgan, MySQL/PostgreSQL.\n- Real-time: WebSockets.\n- Visualization: Three.js (for interactive/visual elements, if enabled).\n\n**Extending the Platform:**\n- New CV templates can be added by creating new React components and updating the template selector.\n- Additional AI models or external APIs can be integrated for enhanced recommendations or analytics.\n- The role system can be expanded to support more user types (e.g., career coaches, educational institutions).\n- The job application and tracking system can be integrated with third-party job boards or ATS platforms.\n\n**Summary:**\nCVGen is a robust, extensible, and user-centric platform that leverages the power of AI to empower users in their career journeys. Its modular architecture, modern technology stack, and focus on both job seekers and recruiters make it a versatile solution for the evolving needs of the job market. Whether you are building your first CV, planning a career change, or searching for top talent, CVGen provides the tools, intelligence, and user experience to help you succeed.`,
    tags: [
      "React",
      "WebSockets",
      "Node.js",
      "Express",
      "AI",
      "Tailwind CSS",
      "CV Builder",
      "Career Path",
      "Recruitment",
    ],
    image: "/cvgen.png",
    imageHint: "abstract particles",
    liveUrl: "https://cvgen-1.onrender.com",
    repoUrl: "#",
    media: [
      { type: "image", src: "/cvgen.png", alt: "CVGen Main UI" },
      {
        type: "image",
        src: "https://placehold.co/800x450.png?text=Screenshot+2",
        alt: "Screenshot 2",
      },
      {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        alt: "Demo Video",
      },
      {
        type: "embed",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        alt: "YouTube Demo",
      },
    ],
  },
  {
    slug: "neural-painter",
    title: "Neural Painter",
    description:
      "An AI-powered art generation tool that turns sketches into paintings.",
    longDescription:
      "Neural Painter leverages cutting-edge generative adversarial networks (GANs) to transform simple user-drawn sketches into beautiful, style-specific paintings. Users can choose from a variety of artistic styles, from Impressionism to Abstract Expressionism, and watch as the AI brings their creations to life. The backend is powered by Python and TensorFlow, with a sleek, responsive frontend built in Next.js.",
    tags: ["Next.js", "AI", "TensorFlow", "Python"],
    image: "https://placehold.co/600x400.png",
    imageHint: "digital art",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "datasphere-vr",
    title: "DataSphere VR",
    description:
      "A virtual reality platform for immersive data analysis and visualization.",
    longDescription:
      "DataSphere VR revolutionizes data analysis by taking it into the third dimension. This platform allows data scientists and analysts to step inside their datasets, interacting with complex information in a fully immersive virtual reality environment. It supports massive datasets and provides a suite of tools for filtering, clustering, and exploring data points in 3D space. Developed with A-Frame and Node.js.",
    tags: ["VR", "A-Frame", "Node.js", "D3.js"],
    image: "https://placehold.co/600x400.png",
    imageHint: "data visualization",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ar-city-explorer",
    title: "AR City Explorer",
    description:
      "An augmented reality mobile app for discovering historical city landmarks.",
    longDescription:
      "AR City Explorer transforms your smartphone into a time machine. Point your camera at historical landmarks and see them as they were in the past through augmented reality overlays. The app includes guided tours, historical information, and interactive elements. Built using ARCore, Unity, and a Firebase backend for content management.",
    tags: ["AR", "Unity", "Firebase", "Mobile"],
    image: "https://placehold.co/600x400.png",
    imageHint: "augmented reality city",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "decentralized-social-net",
    title: "Decentralized SocialNet",
    description:
      "A censorship-resistant social media platform on the blockchain.",
    longDescription:
      "Tired of centralized control, Decentralized SocialNet gives power back to the users. Built on Ethereum and IPFS, all content is stored on a distributed network, making it resistant to censorship and takedowns. Users own their data and can monetize their content directly. The frontend is a snappy PWA built with Svelte.",
    tags: ["Blockchain", "Ethereum", "IPFS", "Svelte"],
    image: "https://placehold.co/600x400.png",
    imageHint: "blockchain network",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "eco-tracker",
    title: "EcoTracker",
    description: "A mobile app to track and reduce your carbon footprint.",
    longDescription:
      "EcoTracker helps users understand and reduce their environmental impact. By tracking daily activities like travel, diet, and energy consumption, the app calculates a personal carbon footprint and offers personalized tips and challenges to live more sustainably. It features gamification elements and social sharing. Built with React Native and a Node.js backend.",
    tags: ["React Native", "Sustainability", "Node.js"],
    image: "https://placehold.co/600x400.png",
    imageHint: "nature environment",
    liveUrl: "#",
    repoUrl: "#",
  },
];

export const getProjectBySlug = (slug: string) => {
  return projects.find((project) => project.slug === slug);
};
