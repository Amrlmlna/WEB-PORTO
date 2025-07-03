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
};

export const projects: Project[] = [
  {
    slug: "quantum-entangler",
    title: "Quantum Entangler",
    description: "A web-based visualization of quantum entanglement principles.",
    longDescription: "The Quantum Entangler is an innovative educational tool designed to demystify the complex concepts of quantum physics. Using interactive 3D models and real-time simulations, it allows users to explore the fascinating world of quantum entanglement, superposition, and measurement. Built with Three.js and React, it provides an engaging learning experience for students and enthusiasts alike.",
    tags: ["React", "Three.js", "WebSockets"],
    image: "https://placehold.co/600x400.png",
    imageHint: "abstract particles",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "neural-painter",
    title: "Neural Painter",
    description: "An AI-powered art generation tool that turns sketches into paintings.",
    longDescription: "Neural Painter leverages cutting-edge generative adversarial networks (GANs) to transform simple user-drawn sketches into beautiful, style-specific paintings. Users can choose from a variety of artistic styles, from Impressionism to Abstract Expressionism, and watch as the AI brings their creations to life. The backend is powered by Python and TensorFlow, with a sleek, responsive frontend built in Next.js.",
    tags: ["Next.js", "AI", "TensorFlow", "Python"],
    image: "https://placehold.co/600x400.png",
    imageHint: "digital art",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "datasphere-vr",
    title: "DataSphere VR",
    description: "A virtual reality platform for immersive data analysis and visualization.",
    longDescription: "DataSphere VR revolutionizes data analysis by taking it into the third dimension. This platform allows data scientists and analysts to step inside their datasets, interacting with complex information in a fully immersive virtual reality environment. It supports massive datasets and provides a suite of tools for filtering, clustering, and exploring data points in 3D space. Developed with A-Frame and Node.js.",
    tags: ["VR", "A-Frame", "Node.js", "D3.js"],
    image: "https://placehold.co/600x400.png",
    imageHint: "data visualization",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "ar-city-explorer",
    title: "AR City Explorer",
    description: "An augmented reality mobile app for discovering historical city landmarks.",
    longDescription: "AR City Explorer transforms your smartphone into a time machine. Point your camera at historical landmarks and see them as they were in the past through augmented reality overlays. The app includes guided tours, historical information, and interactive elements. Built using ARCore, Unity, and a Firebase backend for content management.",
    tags: ["AR", "Unity", "Firebase", "Mobile"],
    image: "https://placehold.co/600x400.png",
    imageHint: "augmented reality city",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    slug: "decentralized-social-net",
    title: "Decentralized SocialNet",
    description: "A censorship-resistant social media platform on the blockchain.",
    longDescription: "Tired of centralized control, Decentralized SocialNet gives power back to the users. Built on Ethereum and IPFS, all content is stored on a distributed network, making it resistant to censorship and takedowns. Users own their data and can monetize their content directly. The frontend is a snappy PWA built with Svelte.",
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
    longDescription: "EcoTracker helps users understand and reduce their environmental impact. By tracking daily activities like travel, diet, and energy consumption, the app calculates a personal carbon footprint and offers personalized tips and challenges to live more sustainably. It features gamification elements and social sharing. Built with React Native and a Node.js backend.",
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
