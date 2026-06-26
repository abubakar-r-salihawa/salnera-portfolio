import { useState, useEffect, createContext, useContext, ReactNode, useRef } from 'react';
import {
  Menu, X, ArrowRight, ArrowUpRight, Mail,
  Briefcase, Eye,
  Send, Lock, LogOut, Plus, Edit, Trash2, AlertCircle,
  Shield
} from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Project, Experience } from './types';
import {
  projects as defaultProjects,
  experiences as defaultExperiences,
  education,
  certifications,
  skills,
  stats,
  blogPosts
} from './data';

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, login: () => false, logout: () => {} });
const useAuth = () => useContext(AuthContext);

const ADMIN_PASSWORD = 'salnera2024';

// Portfolio Data Context
interface PortfolioDataContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}
const PortfolioDataContext = createContext<PortfolioDataContextType>({
  projects: [],
  setProjects: () => {},
  experiences: [],
  setExperiences: () => {}
});
const usePortfolioData = () => useContext(PortfolioDataContext);

function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>('salnera-projects', defaultProjects);
  const [experiences, setExperiences] = useLocalStorage<Experience[]>('salnera-experiences', defaultExperiences);

  return (
    <PortfolioDataContext.Provider value={{ projects, setProjects, experiences, setExperiences }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

// Auth Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('salnera-auth', false);
  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAuthenticated(false);
  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

// Custom SVG Icons
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const expertise = [
  {
    title: 'Marine Engineering',
    description: 'Vessel operations, machinery systems, and marine propulsion technology'
  },
  {
    title: 'Data Analysis',
    description: 'Financial reconciliation, operational analytics, and data pipelines'
  },
  {
    title: 'AI Product Development',
    description: 'Machine learning applications, NLP, and intelligent automation'
  },
  {
    title: 'Automation & Software',
    description: 'Process automation, desktop applications, and system integrations'
  }
];

const categoryDisplay: Record<string, string> = {
  marine: 'Marine Engineering',
  ai: 'AI Product Development',
  data: 'Data Engineering',
  software: 'Software Automation'
};

// Animation Hook
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, inView };
}

// Components
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white border border-transparent',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500 border border-transparent',
    outline: 'border border-white/30 text-white hover:bg-white/10 focus:ring-white',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-3',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// Navigation
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Blog', href: '#blog' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/5'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            SALNERA
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="#contact">
              <Button variant="outline" size="sm">
                Let's Talk
              </Button>
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white cursor-pointer"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black flex flex-col">
          <div className="flex items-center justify-between px-6 h-20">
            <span className="text-xl font-bold text-white">SALNERA</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="px-6 py-8 space-y-6 flex-grow overflow-y-auto">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-3xl font-light text-white hover:text-gray-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Hero Section
function Hero() {
  const { ref, inView } = useInView();

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          {/* Abstract Visual */}
          <svg viewBox="0 0 800 800" className="w-full h-full opacity-40" style={{ filter: 'blur(60px)' }}>
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="400" cy="400" r="300" fill="url(#heroGrad)">
              <animate attributeName="r" values="280;320;280" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="300" r="200" fill="url(#heroGrad)" opacity="0.5">
              <animate attributeName="r" values="180;220;180" dur="6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 mb-8 tracking-wide">
              <span>Engineering</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>Data</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-8 text-left">
              Building intelligent systems for real-world problems.
            </h1>

            <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed text-left">
              I combine marine engineering, data analysis, and artificial intelligence to build practical tools that solve meaningful problems.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href="#work">
                <Button variant="primary" size="lg">
                  Explore My Work
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                Contact Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className={`hidden lg:block transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Abstract Network Visualization */}
              <svg viewBox="0 0 500 500" className="w-full h-auto">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                
                {/* Connection Lines */}
                <g stroke="url(#lineGrad)" strokeWidth="1" opacity="0.3">
                  <line x1="100" y1="150" x2="250" y2="200" />
                  <line x1="250" y1="200" x2="400" y2="150" />
                  <line x1="250" y1="200" x2="250" y2="350" />
                  <line x1="150" y1="300" x2="250" y2="350" />
                  <line x1="250" y1="350" x2="350" y2="300" />
                  <line x1="100" y1="150" x2="150" y2="300" />
                  <line x1="400" y1="150" x2="350" y2="300" />
                </g>
                
                {/* Nodes */}
                <g>
                  <circle cx="100" cy="150" r="8" fill="#4f46e5" />
                  <circle cx="400" cy="150" r="8" fill="#7c3aed" />
                  <circle cx="250" cy="200" r="12" fill="#6366f1" />
                  <circle cx="150" cy="300" r="6" fill="#4f46e5" opacity="0.6" />
                  <circle cx="350" cy="300" r="6" fill="#7c3aed" opacity="0.6" />
                  <circle cx="250" cy="350" r="10" fill="#6366f1" opacity="0.8" />
                </g>
                
                {/* Animated Glow */}
                <circle cx="250" cy="200" r="40" fill="url(#lineGrad)" opacity="0.1">
                  <animate attributeName="r" values="35;45;35" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.1;0.15;0.1" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="py-12 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left border-l border-white/10 pl-6 first:border-l-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Intro Statement
function IntroStatement() {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className="py-32 lg:py-48 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`max-w-4xl transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-relaxed text-white/80 text-left">
            From marine engineering and operational data to software and artificial intelligence, 
            I build practical tools shaped by real problems.
          </p>
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const { projects } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">Selected Work</h2>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectBlock 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

function ProjectBlock({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { ref, inView } = useInView();
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Image */}
      <div className={`${isEven ? '' : 'lg:order-2'}`}>
        <div 
          className="relative aspect-[4/3] overflow-hidden cursor-pointer group border border-white/5 hover:border-white/10"
          onClick={onClick}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              View Details <Eye className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${isEven ? '' : 'lg:order-1'} text-left`}>
        <div className="text-sm text-gray-500 mb-4">{categoryDisplay[project.category] || project.category}</div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-sm px-3 py-1 rounded-full border ${
            project.status === 'completed' 
              ? 'border-green-500/30 text-green-400' 
              : project.status === 'in-progress'
              ? 'border-yellow-500/30 text-yellow-400'
              : 'border-blue-500/30 text-blue-400'
          }`}>
            {project.status.replace('-', ' ')}
          </span>
          <span className="text-sm text-gray-500">{project.date.split('-')[0]}</span>
        </div>
        <button 
          onClick={onClick}
          className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer font-medium"
        >
          View Project <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/95 backdrop-blur-md">
      <div className="w-full max-w-5xl px-6 py-20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 p-3 text-white hover:text-gray-300 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-12 text-left">
          <div className="text-sm text-gray-500 mb-4">{categoryDisplay[project.category] || project.category}</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <div className="flex items-center gap-4">
            <span className={`text-sm px-3 py-1 rounded-full border ${
              project.status === 'completed' 
                ? 'border-green-500/30 text-green-400' 
                : project.status === 'in-progress'
                ? 'border-yellow-500/30 text-yellow-400'
                : 'border-blue-500/30 text-blue-400'
            }`}>
              {project.status.replace('-', ' ')}
            </span>
            <span className="text-sm text-gray-500">{project.date}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-video mb-16 overflow-hidden border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-12 text-left">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
              <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{project.longDescription}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-sm px-3 py-1 border border-white/10 text-gray-300 bg-white/5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Category</h3>
              <p className="text-white">{categoryDisplay[project.category] || project.category}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Date</h3>
              <p className="text-white">{project.date}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Status</h3>
              <p className="text-white capitalize">{project.status.replace('-', ' ')}</p>
            </div>
            {(project.demoUrl && project.demoUrl !== '#') && (
              <div>
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white hover:underline">
                  Live Demo <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
            {(project.githubUrl && project.githubUrl !== '#') && (
              <div>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white hover:underline">
                  GitHub Repository <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skills Section
function SkillsSection() {
  const { ref, inView } = useInView();
  return (
    <section id="skills" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">Skills & Expertise</h2>
        </div>
        <div ref={ref} className={`grid md:grid-cols-2 gap-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}>
          {/* Technical Skills */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">Technical Proficiencies</h3>
            <div className="space-y-4">
              {skills.technical.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: inView ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8">Professional Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.soft.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 text-gray-300 hover:text-white rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Expertise Section
function ExpertiseSection() {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">What I Work Across</h2>
        </div>

        <div 
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          {expertise.map((item, index) => (
            <div key={item.title} className="space-y-4">
              <div className="text-sm text-gray-500">0{index + 1}</div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const { experiences } = usePortfolioData();
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">Experience</h2>
        </div>

        <div 
          ref={ref}
          className={`space-y-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          {experiences.map(exp => (
            <div key={exp.id} className="p-8 border border-white/5 hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <p className="text-gray-400">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <ul className="text-gray-400 text-sm leading-relaxed list-disc list-inside space-y-2 mb-4">
                {exp.description.map((line, idx) => (
                  <li key={idx} className="pl-1 text-left">{line}</li>
                ))}
              </ul>
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  const { ref, inView } = useInView();
  return (
    <section id="education" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">Education</h2>
        </div>
        <div 
          ref={ref} 
          className={`space-y-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          {education.map((edu) => (
            <div key={edu.id} className="relative pl-8 border-l-2 border-white/10 last:border-l-transparent">
              {/* Timeline dot */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-black" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-400 font-medium">{edu.institution} · <span className="text-sm text-gray-500">{edu.location}</span></p>
                </div>
                <span className="text-sm text-gray-500 font-medium">{edu.startDate} — {edu.endDate}</span>
              </div>
              {edu.achievements && (
                <ul className="list-disc list-inside space-y-1.5 text-gray-400 text-sm">
                  {edu.achievements.map((ach, idx) => (
                    <li key={idx} className="pl-1">{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Certifications Section
function CertificationsSection() {
  const { ref, inView } = useInView();
  return (
    <section id="certifications" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-left">Certifications</h2>
        </div>
        <div 
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          {certifications.map((cert) => (
            <div 
              key={cert.id} 
              className="p-6 bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-gray-500 mb-2">{cert.issuer}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
                <div className="text-sm text-gray-400 mb-4">Issued: {cert.date}</div>
                {cert.credentialId && (
                  <div className="text-xs text-gray-500 font-mono mb-4">ID: {cert.credentialId}</div>
                )}
              </div>
              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <a 
                  href={cert.credentialUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs text-white hover:underline flex items-center gap-1.5 self-start mt-auto cursor-pointer"
                >
                  Verify Credential <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog Section
function BlogSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { ref, inView } = useInView();

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <section id="blog" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Insights</h2>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div 
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="group border border-white/5 hover:border-white/10 overflow-hidden bg-white/5 hover:bg-white/[0.08] transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-[16/10] overflow-hidden border-b border-white/5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                </div>
                <div className="text-xs text-gray-500 mt-auto">{post.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={ref}
          className={`max-w-3xl transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Engineering knowledge. Data thinking. Practical technology.
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            I'm Abubakar Rabiu Salihawa, a Marine Engineering Graduate and Data Analyst building 
            AI-powered products at the intersection of engineering, data, and software development.
          </p>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 cursor-pointer font-medium">
            More About Me <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-32 lg:py-48 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div 
          ref={ref}
          className={`max-w-3xl transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} text-left`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Have a role, project or collaboration in mind?
          </h2>

          <div className="flex flex-wrap gap-6 mb-12">
            <a href="mailto:abubakarrabiusalihawa@gmail.com">
              <Button variant="primary" size="lg">
                Start a Conversation
                <Send className="w-5 h-5" />
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-gray-400">
            <a href="mailto:abubakarrabiusalihawa@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              abubakarrabiusalihawa@gmail.com
            </a>
            <a href="tel:+2348061700916" className="hover:text-white transition-colors flex items-center gap-2">
              <span className="text-sm font-semibold">📞</span> +234 806 170 0916 / +234 802 836 4909
            </a>
            <a href="https://www.linkedin.com/in/abubakar-rabiu-salihawa-540150324/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
              <LinkedinIcon className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} SALNERA. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#admin" className="text-sm text-gray-500 hover:text-white transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Admin Dashboard
function AdminDashboard() {
  const { isAuthenticated, login, logout } = useAuth();
  const { projects, setProjects, experiences, setExperiences } = usePortfolioData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  // Form states - Project
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'marine' | 'ai' | 'software' | 'data'>('software');
  const [projStatus, setProjStatus] = useState<'completed' | 'in-progress' | 'planned'>('completed');
  const [projDesc, setProjDesc] = useState('');
  const [projLongDesc, setProjLongDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projImage, setProjImage] = useState('');
  const [projDate, setProjDate] = useState('');
  const [projDemo, setProjDemo] = useState('');
  const [projGit, setProjGit] = useState('');
  const [projFeatured, setProjFeatured] = useState(false);

  // Form states - Experience
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expCurrent, setExpCurrent] = useState(false);
  const [expDesc, setExpDesc] = useState('');
  const [expTech, setExpTech] = useState('');

  // Open Project Modal
  const openProjectModal = (proj: Project | null) => {
    setEditingProject(proj);
    if (proj) {
      setProjTitle(proj.title);
      setProjCategory(proj.category);
      setProjStatus(proj.status);
      setProjDesc(proj.description);
      setProjLongDesc(proj.longDescription);
      setProjTech(proj.technologies.join(', '));
      setProjImage(proj.image);
      setProjDate(proj.date);
      setProjDemo(proj.demoUrl || '');
      setProjGit(proj.githubUrl || '');
      setProjFeatured(proj.featured);
    } else {
      setProjTitle('');
      setProjCategory('software');
      setProjStatus('completed');
      setProjDesc('');
      setProjLongDesc('');
      setProjTech('');
      setProjImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80');
      setProjDate(new Date().toISOString().substring(0, 7));
      setProjDemo('');
      setProjGit('');
      setProjFeatured(false);
    }
    setIsProjectModalOpen(true);
  };

  // Open Experience Modal
  const openExperienceModal = (exp: Experience | null) => {
    setEditingExperience(exp);
    if (exp) {
      setExpCompany(exp.company);
      setExpRole(exp.role);
      setExpLocation(exp.location);
      setExpStartDate(exp.startDate);
      setExpEndDate(exp.endDate || '');
      setExpCurrent(exp.current);
      setExpDesc(exp.description.join('\n'));
      setExpTech(exp.technologies ? exp.technologies.join(', ') : '');
    } else {
      setExpCompany('');
      setExpRole('');
      setExpLocation('');
      setExpStartDate(new Date().toISOString().substring(0, 7));
      setExpEndDate('');
      setExpCurrent(false);
      setExpDesc('');
      setExpTech('');
    }
    setIsExperienceModalOpen(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      setPassword('');
    } else {
      setError(true);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTechs = projTech.split(',').map(t => t.trim()).filter(Boolean);
    
    if (editingProject) {
      const updatedProject: Project = {
        ...editingProject,
        title: projTitle,
        category: projCategory,
        status: projStatus,
        description: projDesc,
        longDescription: projLongDesc,
        technologies: updatedTechs,
        image: projImage,
        date: projDate,
        demoUrl: projDemo || '#',
        githubUrl: projGit || '#',
        featured: projFeatured
      };
      setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
    } else {
      const newProjId = projTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') || Date.now().toString();
      const newProject: Project = {
        id: newProjId,
        title: projTitle,
        category: projCategory,
        status: projStatus,
        description: projDesc,
        longDescription: projLongDesc,
        technologies: updatedTechs,
        image: projImage,
        date: projDate,
        demoUrl: projDemo || '#',
        githubUrl: projGit || '#',
        featured: projFeatured
      };
      setProjects([...projects, newProject]);
    }
    setIsProjectModalOpen(false);
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const descLines = expDesc.split('\n').map(l => l.trim()).filter(Boolean);
    const techList = expTech.split(',').map(t => t.trim()).filter(Boolean);

    if (editingExperience) {
      const updatedExp: Experience = {
        ...editingExperience,
        company: expCompany,
        role: expRole,
        location: expLocation,
        startDate: expStartDate,
        endDate: expCurrent ? '' : expEndDate,
        current: expCurrent,
        description: descLines,
        technologies: techList
      };
      setExperiences(experiences.map(e => e.id === editingExperience.id ? updatedExp : e));
    } else {
      const newExpId = expCompany.toLowerCase().replace(/[^a-z0-9]+/g, '-') || Date.now().toString();
      const newExp: Experience = {
        id: newExpId,
        company: expCompany,
        role: expRole,
        location: expLocation,
        startDate: expStartDate,
        endDate: expCurrent ? '' : expEndDate,
        current: expCurrent,
        description: descLines,
        technologies: techList
      };
      setExperiences([...experiences, newExp]);
    }
    setIsExperienceModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      setExperiences(experiences.filter(e => e.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-24 border-t border-white/5">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-sm text-gray-500">Enter your password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              {error && (
                <div className="text-sm text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Invalid password
                </div>
              )}
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Login
            </Button>
          </form>

        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
            <p className="text-sm text-gray-500">Manage your content and settings</p>
          </div>
          <Button variant="secondary" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Experience' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="border border-white/5 rounded-lg overflow-hidden bg-white/[0.01]">
          {activeTab === 'projects' && (
            <div className="divide-y divide-white/5">
              {projects.map((project) => (
                <div key={project.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-white/5 border border-white/10">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{project.title}</div>
                      <div className="text-sm text-gray-500">
                        <span className="capitalize">{project.category}</span> · {project.date} {project.featured && '· (Featured)'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openProjectModal(project)}
                      className="p-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-6 text-left">
                <Button variant="secondary" size="sm" onClick={() => openProjectModal(null)}>
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="divide-y divide-white/5">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="text-left">
                    <div className="font-medium text-white">{exp.role}</div>
                    <div className="text-sm text-gray-500">
                      {exp.company} {exp.location ? `· ${exp.location}` : ''} ({exp.startDate} — {exp.current ? 'Present' : exp.endDate})
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openExperienceModal(exp)}
                      className="p-2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                      title="Edit Experience"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-6 text-left">
                <Button variant="secondary" size="sm" onClick={() => openExperienceModal(null)}>
                  <Plus className="w-4 h-4" />
                  Add Experience Entry
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-8 text-left">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Payment Integration</h3>
                <p className="text-sm text-gray-500 mb-4">Configure payment providers for future subscriptions and services.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {['Paystack', 'Flutterwave', 'Stripe'].map((provider) => (
                    <div key={provider} className="p-4 border border-white/5 rounded-lg text-center">
                      <Shield className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                      <div className="text-sm text-gray-400">{provider}</div>
                      <div className="text-xs text-gray-600 mt-1">Not configured</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Form Modal */}
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-zinc-950 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button onClick={() => setIsProjectModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Title</label>
                  <input 
                    type="text" 
                    value={projTitle} 
                    onChange={e => setProjTitle(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Category</label>
                    <select 
                      value={projCategory} 
                      onChange={e => setProjCategory(e.target.value as Project['category'])} 
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    >
                      <option value="marine">Marine Engineering</option>
                      <option value="ai">AI Product</option>
                      <option value="data">Data Engineering</option>
                      <option value="software">Software Automation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Status</label>
                    <select 
                      value={projStatus} 
                      onChange={e => setProjStatus(e.target.value as Project['status'])} 
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Short Description</label>
                  <input 
                    type="text" 
                    value={projDesc} 
                    onChange={e => setProjDesc(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Long Description (Overview)</label>
                  <textarea 
                    value={projLongDesc} 
                    onChange={e => setProjLongDesc(e.target.value)} 
                    rows={4} 
                    required 
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 resize-y"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Date (YYYY-MM)</label>
                    <input 
                      type="text" 
                      value={projDate} 
                      onChange={e => setProjDate(e.target.value)} 
                      placeholder="e.g. 2024-06"
                      required 
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Technologies (comma-separated)</label>
                    <input 
                      type="text" 
                      value={projTech} 
                      onChange={e => setProjTech(e.target.value)} 
                      placeholder="e.g. Python, React, PostgreSQL"
                      required 
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Image URL</label>
                  <input 
                    type="text" 
                    value={projImage} 
                    onChange={e => setProjImage(e.target.value)} 
                    required 
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Demo URL</label>
                    <input 
                      type="text" 
                      value={projDemo} 
                      onChange={e => setProjDemo(e.target.value)} 
                      placeholder="e.g. https://demo.com or #"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">GitHub URL</label>
                    <input 
                      type="text" 
                      value={projGit} 
                      onChange={e => setProjGit(e.target.value)} 
                      placeholder="e.g. https://github.com/..."
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input 
                    type="checkbox" 
                    id="projFeatured" 
                    checked={projFeatured} 
                    onChange={e => setProjFeatured(e.target.checked)} 
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="projFeatured" className="text-sm text-gray-300 select-none cursor-pointer">Featured Project (Hero display / primary block)</label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <Button type="button" variant="ghost" onClick={() => setIsProjectModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Project
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Experience Form Modal */}
        {isExperienceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-zinc-950 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 text-left">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingExperience ? 'Edit Experience Entry' : 'Add Experience Entry'}
                </h3>
                <button onClick={() => setIsExperienceModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveExperience} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Company / Organization</label>
                    <input 
                      type="text" 
                      value={expCompany} 
                      onChange={e => setExpCompany(e.target.value)} 
                      required 
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Role / Job Title</label>
                    <input 
                      type="text" 
                      value={expRole} 
                      onChange={e => setExpRole(e.target.value)} 
                      required 
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location / Vessel</label>
                  <input 
                    type="text" 
                    value={expLocation} 
                    onChange={e => setExpLocation(e.target.value)} 
                    placeholder="e.g. Lagos, Nigeria or MT ST ILHAAM"
                    required 
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Start Date</label>
                    <input 
                      type="text" 
                      value={expStartDate} 
                      onChange={e => setExpStartDate(e.target.value)} 
                      placeholder="e.g. 2023-01 or January 2023"
                      required 
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">End Date</label>
                    <input 
                      type="text" 
                      value={expEndDate} 
                      onChange={e => setExpEndDate(e.target.value)} 
                      disabled={expCurrent}
                      placeholder={expCurrent ? 'Present' : 'e.g. 2024-01 or Present'}
                      required={!expCurrent}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input 
                    type="checkbox" 
                    id="expCurrent" 
                    checked={expCurrent} 
                    onChange={e => setExpCurrent(e.target.checked)} 
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="expCurrent" className="text-sm text-gray-300 select-none cursor-pointer">I am currently working in this role</label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Description Bullet Points (One per line)</label>
                  <textarea 
                    value={expDesc} 
                    onChange={e => setExpDesc(e.target.value)} 
                    rows={4} 
                    required 
                    placeholder="Describe your achievements and duties..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Technologies Used (comma-separated)</label>
                  <input 
                    type="text" 
                    value={expTech} 
                    onChange={e => setExpTech(e.target.value)} 
                    placeholder="e.g. Python, SQL, Excel"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <Button type="button" variant="ghost" onClick={() => setIsExperienceModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Experience
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Privacy Page
function PrivacyPage() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-left">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-left">
          <p className="text-gray-400 leading-relaxed mb-6">
            Last updated: January 2025
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            SALNERA Technologies is committed to protecting your privacy. This policy outlines how we collect, 
            use, and safeguard your personal information when you use our services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            We collect information you provide directly, such as when you contact us through forms or 
            communicate via email. This may include your name, email address, and message content.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            We use the information you provide to respond to your inquiries, provide services, and 
            improve our offerings. We do not sell or share your personal information with third parties.
          </p>
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact</h2>
          <p className="text-gray-400 leading-relaxed">
            For questions about this privacy policy, contact us at{' '}
            <a href="mailto:abubakarrabiusalihawa@gmail.com" className="text-white hover:underline">abubakarrabiusalihawa@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// Main App
export default function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <AppContent />
      </PortfolioDataProvider>
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-black text-white antialiased" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        *:focus-visible {
          outline: 2px solid rgba(99, 102, 241, 0.5);
          outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      <Navigation />
      <main>
        <Hero />
        <StatsSection />
        <IntroStatement />
        <ProjectsSection />
        <SkillsSection />
        <ExpertiseSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <BlogSection />
        <AboutSection />
        <ContactSection />
        <AdminDashboard />
        <PrivacyPage />
      </main>
      <Footer />
    </div>
  );
}
