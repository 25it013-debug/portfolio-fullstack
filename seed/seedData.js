const defaultProfile = {
  name: "Alex Morgan",
  title: "Full-Stack Software Engineer",
  bio: "Passionate Full-Stack Developer specializing in modern JavaScript ecosystems, high-performance Node.js REST APIs, and responsive, accessible user interfaces. Driven by sleek architecture and impactful user experiences.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  location: "San Francisco, CA",
  email: "alex.morgan.dev@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  stats: {
    yearsExperience: 5,
    projectsCompleted: 32,
    happyClients: 24
  }
};

const defaultProjects = [
  {
    _id: "p1",
    title: "Nexus Analytics Dashboard",
    description: "Real-time SaaS analytics dashboard with interactive charts, live WebSocket metrics streaming, and custom user permission management.",
    category: "Full-Stack",
    tags: ["Node.js", "Express", "MongoDB", "Chart.js", "WebSockets"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/nexus",
    githubUrl: "https://github.com/example/nexus",
    featured: true
  },
  {
    _id: "p2",
    title: "Quantum Commerce Platform",
    description: "Modern headless e-commerce store featuring dynamic cart management, Stripe payment gateway integration, and inventory tracking.",
    category: "Full-Stack",
    tags: ["JavaScript", "Node.js", "Express", "Stripe API", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c570994f?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/quantum",
    githubUrl: "https://github.com/example/quantum",
    featured: true
  },
  {
    _id: "p3",
    title: "Pulse Social API Engine",
    description: "Scalable RESTful microservice API backend handling authentication, content feed aggregation, rate limiting, and caching.",
    category: "Backend",
    tags: ["Node.js", "Express", "JWT", "Redis", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/pulse-api",
    githubUrl: "https://github.com/example/pulse-api",
    featured: false
  },
  {
    _id: "p4",
    title: "Aura Creative Studio UI",
    description: "Ultra-responsive digital studio homepage with smooth scroll animations, custom CSS grid layouts, and dynamic theme switching.",
    category: "Frontend",
    tags: ["HTML5", "CSS3", "JavaScript", "Animations", "UI/UX"],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/aura",
    githubUrl: "https://github.com/example/aura",
    featured: true
  },
  {
    _id: "p5",
    title: "Neural Vision Classifier",
    description: "AI image recognition playground interfacing python model endpoints to display dynamic bounding boxes and confidence scores.",
    category: "AI & Data",
    tags: ["JavaScript", "Python", "REST API", "TailwindCSS"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/neural",
    githubUrl: "https://github.com/example/neural",
    featured: false
  }
];

const defaultSkills = [
  { _id: "s1", name: "JavaScript (ES6+)", category: "Frontend", proficiency: 95, icon: "code" },
  { _id: "s2", name: "HTML5 & CSS3 / Modern Layouts", category: "Frontend", proficiency: 90, icon: "layout" },
  { _id: "s3", name: "Node.js & Express.js", category: "Backend", proficiency: 92, icon: "server" },
  { _id: "s4", name: "RESTful API Architecture", category: "Backend", proficiency: 94, icon: "cpu" },
  { _id: "s5", name: "MongoDB & Mongoose ODM", category: "Database", proficiency: 88, icon: "database" },
  { _id: "s6", name: "Git, GitHub & Version Control", category: "Tools & DevOps", proficiency: 90, icon: "git-branch" },
  { _id: "s7", name: "Docker & Containerization", category: "Tools & DevOps", proficiency: 80, icon: "box" },
  { _id: "s8", name: "Web Security & Authentication (JWT/Helmet)", category: "Backend", proficiency: 85, icon: "shield" }
];

const seedDatabase = async () => {
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  dotenv.config();

  const Profile = require('../models/Profile');
  const Project = require('../models/Project');
  const Skill = require('../models/Skill');

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db');
    console.log('[Seed] Connected to MongoDB...');

    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Profile.create(defaultProfile);
    await Project.insertMany(defaultProjects.map(({ _id, ...p }) => p));
    await Skill.insertMany(defaultSkills.map(({ _id, ...s }) => s));

    console.log('[Seed] Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = { defaultProfile, defaultProjects, defaultSkills };
