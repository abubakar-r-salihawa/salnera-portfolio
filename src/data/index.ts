import { Project, Experience, Education, Certification, BlogPost } from '../types';

export const projects: Project[] = [
  {
    id: 'otto-robot-ai',
    title: 'Otto Robot with AI Integration',
    category: 'ai',
    description: 'Reverse engineering project implementing an AI-enabled walking robot.',
    longDescription: 'A reverse engineering robotics project implementing Otto Robot with AI integration for autonomous decision making, sensor-based obstacle avoidance, and human-like interaction.',
    technologies: ['Arduino', 'C/C++', 'Artificial Intelligence', 'Robotics', 'Ultrasonic Sensors'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    featured: true,
    status: 'completed',
    date: '2024-11'
  },
  {
    id: 'robotic-arm',
    title: 'Bluetooth Controlled Robotic Arm',
    category: 'software',
    description: 'Designed and developed a mechatronic robotic arm controlled via a custom mobile app.',
    longDescription: 'A mechatronic robotic arm utilizing servo motors and Bluetooth communication. Users can control pick-and-place maneuvers wirelessly from a mobile device.',
    technologies: ['Arduino', 'C/C++', 'Bluetooth Modules', 'Android API', 'Mechatronics'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    featured: true,
    status: 'completed',
    date: '2023-08'
  },
  {
    id: 'sounding-volume-calculator',
    title: 'Sounding Volume Calculator',
    category: 'marine',
    description: 'Developed an .exe system application for calculating vessel tank capacities.',
    longDescription: 'A specialized desktop application (.exe) built to calculate the exact sounding volumes of vessel tanks, accounting for list, trim, and calibration constants.',
    technologies: ['Python', 'PyQt', 'Marine Engineering', 'Excel Automation'],
    image: 'https://images.unsplash.com/photo-1502485019198-a625bd53ceb7?w=800&q=80',
    featured: true,
    status: 'completed',
    date: '2024-06'
  },
  {
    id: 'gpa-cgpa-calculator',
    title: 'GPA/CGPA Desktop Calculator',
    category: 'software',
    description: 'Desktop application designed to help university students compute results.',
    longDescription: 'A lightweight and intuitive system desktop application (.exe) built to streamline the calculation of Semester GPA and Cumulative CGPA for academic tracking.',
    technologies: ['Python', 'Tkinter GUI', 'Data Storage'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2023-10'
  },
  {
    id: 'smart-irrigation-system',
    title: 'Moisture-Sensing Smart Irrigation',
    category: 'software',
    description: 'Automated plant-watering system operating on soil moisture threshold feedback.',
    longDescription: 'An automated IoT irrigation system that measures soil moisture levels in real-time and opens solenoid valves automatically when thresholds are reached.',
    technologies: ['Arduino', 'Soil Sensors', 'C/C++', 'Microcontrollers'],
    image: 'https://images.unsplash.com/photo-1463123081488-729f60c3c544?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2023-05'
  },
  {
    id: 'smart-appliance-switch',
    title: 'Mobile Smart Home Switch',
    category: 'software',
    description: 'Wireless switch system enabling home appliance management via mobile Bluetooth.',
    longDescription: 'A home automation mechatronics project that interfaces relay modules with a microcontroller to allow wireless appliance switching through a phone.',
    technologies: ['Arduino', 'Relays', 'Bluetooth', 'IoT'],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2023-04'
  },
  {
    id: 'bluetooth-rc-car',
    title: 'Bluetooth RC Car',
    category: 'software',
    description: 'Bluetooth-controlled robotic car applying mechatronics principles.',
    longDescription: 'Designed and developed a Bluetooth-controlled robotic car using motor drivers, wireless transceivers, and microcontroller coding.',
    technologies: ['Arduino', 'C/C++', 'Bluetooth', 'Mechatronics'],
    image: 'https://images.unsplash.com/photo-1596495578065-6e076baf188f?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2022-09'
  },
  {
    id: 'delta-hmi-substation',
    title: 'Delta HMI Substation Control System',
    category: 'marine',
    description: 'HMI control interface for generator room switches and changeover operations.',
    longDescription: 'Developed an industrial Human-Machine Interface (HMI) using Delta HMI software for wireless monitoring and remote switches of substation generator rooms, facilitating start/stop and changeovers.',
    technologies: ['Delta HMI', 'PLC Programing', 'Industrial Automation', 'Substation Controls'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    featured: true,
    status: 'completed',
    date: '2024-04'
  },
  {
    id: 'cable-bridge-rubber-seal',
    title: 'Cable Bridge & Rubber Seal Testing',
    category: 'marine',
    description: 'Structural and compression analysis on cable bridges and rubber seal durability.',
    longDescription: 'Conducted structural load-bearing analysis of industrial cable bridge systems and performed compression testing of marine rubber seals to evaluate physical durability limits.',
    technologies: ['Mechanical Testing', 'Compression Analysis', 'Structural Integrity'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2023-07'
  },
  {
    id: 'sdg-10-inequality',
    title: 'UN SDG 10 Reduced Inequality Project',
    category: 'data',
    description: 'Data analytics mapping out inequality models aligned with UN SDG frameworks.',
    longDescription: 'Worked on addressing socio-economic inequality by exploring innovative data-driven solutions aligned with the United Nations SDG 10 framework.',
    technologies: ['Data Analysis', 'Statistical Models', 'Socio-economic Indicators'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2023-03'
  },
  {
    id: 'mobile-price-prediction',
    title: 'Mobile Price Prediction Model',
    category: 'ai',
    description: 'Machine learning model trained in Python to forecast mobile prices.',
    longDescription: 'Built and evaluated a regression machine learning model in Python to estimate mobile phone market values based on core specifications and features.',
    technologies: ['Python', 'Scikit-learn', 'Jupyter Notebook', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2024-02'
  },
  {
    id: 'product-sales-dashboard',
    title: 'Interactive Sales & Product KPI Dashboard',
    category: 'data',
    description: 'Interactive dashboard tracking revenue, order status, and product performance.',
    longDescription: 'Designed and developed robust data visualization dashboards to monitor operational KPIs such as daily revenue, product rankings, and shipment status.',
    technologies: ['Python', 'Microsoft Excel', 'Data Pipelines', 'KPI Dashboards'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    featured: false,
    status: 'completed',
    date: '2024-01'
  }
];

export const experiences: Experience[] = [
  {
    id: 'marine-mech-trainee',
    company: 'Centurion University of Technology and Management',
    role: 'B.Tech Mechanical Engineering (Marine Domain)',
    location: 'Bhubaneswar, India',
    startDate: '2021-09',
    endDate: '2025-05',
    current: false,
    description: [
      'Studied Marine Domain machinery, including propulsion, boiler systems, ship stability, auxiliary mechanics, and mechatronics.',
      'Completed STCW (Standards of Training, Certification and Watchkeeping) modules for safety at sea.',
      'Designed and executed test plans for Delta HMI Substation generator control interfaces and physical rubber seal compression limits.'
    ],
    technologies: ['Marine Machinery', 'Ship Stability', 'STCW Modules', 'Delta HMI', 'AutoCAD']
  },
  {
    id: 'ai-diploma-candidate',
    company: 'Baze University',
    role: 'Professional Diploma in Artificial Intelligence',
    location: 'Abuja, Nigeria',
    startDate: '2024-09',
    endDate: '2025-05',
    current: false,
    description: [
      'Gained deep technical foundation in Artificial Intelligence, Machine Learning models, and NLP applications.',
      'Developed multiple mechatronics and intelligence projects including walking Otto robots and Bluetooth robotic arms.',
      'Implemented Python ML price predictors and data-driven dashboards.'
    ],
    technologies: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Jupyter Notebook', 'Scikit-learn']
  }
];

export const education: Education[] = [
  {
    id: 'edu-baze-univ',
    institution: 'Baze University',
    degree: 'Professional Diploma',
    field: 'Artificial Intelligence',
    location: 'Abuja, Nigeria',
    startDate: '2024',
    endDate: '2025',
    achievements: [
      'Intensive training in Machine Learning algorithms, Generative AI applications, and Neural Networks.',
      'Constructed AI-robotics mechatronics systems for reverse engineering showcases.'
    ]
  },
  {
    id: 'edu-cutm-india',
    institution: 'Centurion University of Technology and Management',
    degree: 'Bachelor of Technology',
    field: 'Mechanical Engineering (Marine Domain)',
    location: 'Bhubaneswar, India',
    startDate: '2021',
    endDate: '2025',
    achievements: [
      'Core focus on marine machinery, ship propulsion, and safety watchkeeping principles.',
      'Completed mechatronics design workshops and industrial controller applications.'
    ]
  },
  {
    id: 'edu-sec-school',
    institution: 'Community Day Secondary School Dutsinma',
    degree: 'Senior Secondary School Certificate (SSCE)',
    field: 'Science',
    location: 'Katsina State, Nigeria',
    startDate: '2016',
    endDate: '2019'
  },
  {
    id: 'edu-primary-school',
    institution: 'Yandaka Model Primary School Dutsinma',
    degree: 'Primary School Certificate',
    field: 'Basic Education',
    location: 'Katsina State, Nigeria',
    startDate: '2008',
    endDate: '2013'
  }
];

export const certifications: Certification[] = [
  {
    id: 'cert-stcw-safety',
    name: 'Proficiency Certificates in Maritime Safety (STCW Modules) - PST, FPFF, EFA, PSSR',
    issuer: 'International Maritime Organization Standards (May 2025)',
    date: '2025-05'
  },
  {
    id: 'cert-seafarer-security',
    name: 'Proficiency Certificate in Security Training for Seafarers with Designated Security Duties',
    issuer: 'Designated Security Authority (May 2025)',
    date: '2025-05'
  },
  {
    id: 'cert-hp-data-science',
    name: 'Certificate in Data Science & Analytics',
    issuer: 'HP',
    date: '2024'
  },
  {
    id: 'cert-ms-career-essentials-data',
    name: 'Certificate in Career Essentials in Data Analysis',
    issuer: 'Microsoft and LinkedIn',
    date: '2024'
  },
  {
    id: 'cert-ms-generative-ai',
    name: 'Certificate in Career Essentials in Generative AI',
    issuer: 'Microsoft and LinkedIn',
    date: '2024'
  },
  {
    id: 'cert-python-google',
    name: 'Certificate in Foundation of Python',
    issuer: 'Google Career Certificates',
    date: '2024'
  },
  {
    id: 'cert-ibm-python-ds',
    name: 'Certificate in Python for Data Science, AI & Development',
    issuer: 'IBM',
    date: '2024'
  },
  {
    id: 'cert-ibm-sql-python',
    name: 'Certificate in Database and SQL with Python',
    issuer: 'IBM',
    date: '2024'
  },
  {
    id: 'cert-ibm-tools-ds',
    name: 'Certificate in Tools for Data Science',
    issuer: 'IBM',
    date: '2024'
  },
  {
    id: 'cert-ibm-ds-methodology',
    name: 'Certificate in Data Science Methodology',
    issuer: 'IBM',
    date: '2024'
  },
  {
    id: 'cert-ibm-what-is-ds',
    name: 'Certificate in What is Data Science',
    issuer: 'IBM',
    date: '2024'
  },
  {
    id: 'cert-great-learning-ml',
    name: 'Certificate in Machine Learning Tutorial',
    issuer: 'Great Learning',
    date: '2024'
  },
  {
    id: 'cert-industrial-controller',
    name: 'Workshop Participation - Application of Industrial Controller',
    issuer: 'Smart Engineering Applications Research Centre, CUTM Bhubaneswar',
    date: '2023-03'
  },
  {
    id: 'cert-teachnook-ev',
    name: 'Certificate of Course Completion in Hybrid & Electric Vehicles',
    issuer: 'Teachnook',
    date: '2023'
  },
  {
    id: 'cert-digital-nig-ai',
    name: 'Certificate in AI fundamentals and Generative AI Assessment',
    issuer: 'Digital Nigeria',
    date: '2024'
  },
  {
    id: 'cert-cursa-engine',
    name: 'Certificate in How a car engine works',
    issuer: 'Cursa',
    date: '2023'
  },
  {
    id: 'cert-cursa-physics',
    name: 'Certificate in Physics',
    issuer: 'Cursa CrashCourse',
    date: '2023'
  },
  {
    id: 'cert-linkedin-intro-career-ds',
    name: 'Certificate in Introduction to Career Skills in Data Analytics',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-data-anal-1',
    name: 'Certificate in Learning Data Analytics: 1 Foundation',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-data-anal-2',
    name: 'Certificate in Learning Data Analytics part 2: Extending and Applying Core Knowledge',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-excel-intro',
    name: 'Certificate in Introduction Microsoft Excel',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-excel-da',
    name: 'Certificate in Introduction to Data Analysis Using Microsoft',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-what-is-gen-ai',
    name: 'Certificate in What is Generative AI',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-gen-ai-search',
    name: 'Certificate in Generative AI: The Evolution of Thoughtful Online Search',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-ethics-gen-ai',
    name: 'Certificate in Ethics in the Age of Generative AI',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-copilot-streamline',
    name: 'Certificate in Streamlining Your Work with Microsoft Copilot',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-copilot-business',
    name: 'Certificate in Learning Microsoft 365 Copilot and Business Chat',
    issuer: 'LinkedIn Learning',
    date: '2024'
  },
  {
    id: 'cert-linkedin-intro-ai',
    name: 'Certificate in Introduction to Artificial Intelligence (2023)',
    issuer: 'LinkedIn Learning',
    date: '2023'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-marine-ai',
    title: 'The Future of AI in Marine Engineering',
    excerpt: 'Exploring how artificial intelligence is transforming maritime operations, from predictive maintenance to autonomous vessels.',
    content: '',
    category: 'AI & Marine',
    date: '2024-12-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80'
  },
  {
    id: 'building-data-pipelines',
    title: 'Building Scalable Data Pipelines for Industrial Applications',
    excerpt: 'A technical deep-dive into designing and implementing robust data pipelines for marine and industrial data.',
    content: '',
    category: 'Data Engineering',
    date: '2024-11-20',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  }
];

export const skills = {
  technical: [
    { name: 'Python', level: 95 },
    { name: 'Java, C/C++, SQL, R', level: 85 },
    { name: 'Data Science & Analytics', level: 92 },
    { name: 'Database Management Systems (DBMS)', level: 88 },
    { name: 'Jupyter Notebook & VS Code', level: 90 },
    { name: 'Arduino IDE & IoT Systems', level: 88 },
    { name: 'MS Office (Word, Excel, PowerPoint)', level: 95 }
  ],
  soft: [
    'Teamwork',
    'Leadership',
    'Communication',
    'Problem Solving',
    'Strategic Planning',
    'Exploring AI & new Tech'
  ]
};

export const stats = [
  { label: 'B.Tech Years', value: '4' },
  { label: 'Projects Built', value: '12+' },
  { label: 'Certifications', value: '28' },
  { label: 'AI Diplomas', value: '1' }
];
