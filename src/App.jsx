import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Experience from './components/Experience'
import Loader from './components/Loader'
import Earth from './components/Earth'
import Contact3D from './components/Contact3D'
import { Mail, Code, Terminal, Monitor, LayoutDashboard, Award, Database, Server, Layout, Cpu, Cloud, Settings } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation'

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const SKILLS = [
  { name: 'Programming Languages', category: 'C, C++, Python, JavaScript, Dart, PHP', icon: <Code size={28} className="text-neon-cyan" /> },
  { name: 'Frameworks & Dev', category: 'React.js, Node.js, Flask, Flutter, HTML5, CSS3', icon: <Layout size={28} className="text-neon-purple" /> },
  { name: 'Databases & Cloud', category: 'MySQL, MongoDB, SQL, Firebase Auth', icon: <Database size={28} className="text-neon-cyan" /> },
  { name: 'Machine Learning', category: 'TensorFlow, Scikit-Learn', icon: <Cpu size={28} className="text-neon-purple" /> },
  { name: 'Tools & APIs', category: 'Git, GitHub, VS Code, Linux, REST APIs, Google Maps, Spotify API', icon: <Settings size={28} className="text-neon-cyan" /> },
  { name: 'Core Computer Science', category: 'Data Structures, OOP, OS, Networks, DBMS', icon: <Terminal size={28} className="text-neon-purple" /> }
]

const PROJECTS = [
  {
    id: 'golorry',
    title: 'GoLorry — Smart Logistics',
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Google Maps API'],
    desc: 'Developed a logistics booking and tracking mobile application. Implemented user authentication and integrated Google Maps for real-time location visualization. Tested workflows using 50+ simulated orders to validate system behavior.',
    icon: <Monitor size={28} className="text-neon-cyan" />,
    github: 'https://github.com/Ashok-A15/Go_Laari'
  },
  {
    id: 'chat_app',
    title: 'Fullstack Chat Application',
    tech: ['Flask', 'Python', 'React', 'JavaScript', 'SQL', 'MongoDB'],
    desc: 'Designed a modular full-stack web app following clean code practices. Implemented REST APIs for frontend-backend communication, reducing response time by ~25%. Designed backend services aligned with cloud-ready architectures.',
    icon: <Terminal size={28} className="text-neon-purple" />,
    github: 'https://github.com/Ashok-A15/Full-Stack_AI_Chat_Application'
  },
  {
    id: 'dr_detection',
    title: 'Diabetic Retinopathy Detection',
    tech: ['Python', 'Flask', 'PHP', 'MySQL', 'HTML/CSS', 'TensorFlow'],
    desc: 'Developed a web app integrating a trained machine learning model with a Flask backend for image upload and prediction workflows. Processed and logged over 1,000 retinal image predictions during testing to validate reliability.',
    icon: <LayoutDashboard size={28} className="text-neon-cyan" />,
    github: 'https://github.com/Ashok-A15/mini-project'
  },
  {
    id: 'music_rec',
    title: 'Music Recommendation System',
    tech: ['Python', 'Scikit-Learn', 'Spotify API'],
    desc: 'Machine learning based music recommendation engine that suggests songs based on audio features and user preferences.',
    icon: <LayoutDashboard size={28} className="text-neon-purple" />,
    github: 'https://github.com/Ashok-A15/music_recommendation'
  },
  {
    id: 'classroom',
    title: 'Classroom Activity Management',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    desc: 'Dashboard for educators to track attendance, assignments, and engagement.',
    icon: <Code size={28} className="text-neon-purple" />,
    github: 'https://github.com/Ashok-A15'
  }
]

const CERTIFICATES = [
  {
    id: 'cert_1',
    title: 'Cybersecurity Fundamentals',
    issuer: 'Google',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    link: 'https://drive.google.com/file/d/1KlnyUK0uT1hqVrtdEnBD5y5KzeIB8yGA/view'
  },
  {
    id: 'cert_2',
    title: 'Software Development',
    issuer: 'CodeSoft',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    link: 'https://drive.google.com/file/d/1OhqxVPWlCzgA1ipbhZaYxOkHveSNgSfE/view'
  },
  {
    id: 'cert_3',
    title: 'AWS S3 & EC2 Basics',
    issuer: 'AWS Training and Certification',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
    link: 'https://drive.google.com/file/d/1o2bTm_j9zv21Htnhq8kpWpl1W4qNOIQi/view'
  }
]

// Variants for Framer Motion animations
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function App() {
  return (
    <>
      <div className="global-bg-canvas">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>
      <Loader />

      <nav>
        <div className="logo">
          Ashok<span className="neon-text-blue">.dev</span>
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#opensource">Open Source</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section with 3D Room */}
      <section className="hero">
        <div className="canvas-container">
          <Canvas
            camera={{ position: [2, 1, 4], fov: 45 }}
            shadows
          >
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>
        </div>

        <div className="hero-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="hero-title">
              Hi, I'm <span className="neon-text-blue">Ashok</span>
            </h1>
            <p className="hero-subtitle neon-text-blue">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'Machine Learning Enthusiast',
                  2000,
                  'Flutter App Developer',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Standard Scrolling Content Sections */}
      <div className="main-content">

        {/* ABOUT SECTION */}
        <section id="about" className="content-section">
          <motion.div
            className="glass-panel"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-purple">About Me</h2>
            <div className="about-grid">
              <div className="about-content">
                <p>
                  I am a Computer Science Engineering graduate from JSS Science and Technology University, Mysore, with a strong interest in full-stack web development. I have experience working with HTML, CSS, JavaScript, and Flask, and I’ve built projects that combine both frontend and backend development. I also have basic knowledge of machine learning and enjoy exploring how it can be used in real-world applications. I am passionate about learning new technologies and continuously improving my skills, and I am currently looking for opportunities to start my career and grow as a developer.
                </p>
              </div>
              <div className="about-3d-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Earth />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="content-section">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-blue">Tech Stack</h2>
            <div className="skills-grid">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card glass"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateX: 10,
                    rotateY: -10,
                    boxShadow: "0 20px 40px rgba(0, 240, 255, 0.2)"
                  }}
                  style={{ transformPerspective: 1000 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-category">{skill.category}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="content-section">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-blue">Projects</h2>
            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass project-card"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="project-header">
                    <div className="project-icon">{project.icon}</div>
                    <div className="project-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" title="GitHub Repo">
                          <GithubIcon size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <p className="project-desc">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* OPEN SOURCE SECTION */}
        <section id="opensource" className="content-section">
          <motion.div
            className="glass-panel"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-purple">Open Source Activity</h2>
            <div className="github-activity-container">
              <div className="github-activity-text">
                <p>
                  I'm actively participating in <strong>daily open-source contributions</strong> on GitHub, building tools, contributing to repositories, and refining my engineering skills every single day.
                </p>
                <p>
                  Building in public allows me to collaborate with other developers, practice continuous integration, write clean modular code, and create impactful software.
                </p>
              </div>

              {/* Live GitHub Calendar chart */}
              <div className="github-calendar-wrapper glass">
                <h3 className="github-calendar-title">Contribution Calendar</h3>
                <img
                  src="https://ghchart.rshah.org/00f0ff/Ashok-A15"
                  alt="Ashok's GitHub Contribution Chart"
                  className="github-calendar-img"
                />
              </div>

              <div className="github-stats-wrapper">
                {/* GitHub Streak Stats */}
                <div className="github-stat-card glass">
                  <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=Ashok-A15&theme=tokyonight&background=050b14&ring=00f0ff&fire=3a86ff&currStreakNum=00f0ff&sideNums=a0aec0&sideLabels=a0aec0&dates=a0aec0"
                    alt="Ashok's GitHub Streak"
                  />
                </div>
                {/* GitHub General Stats */}
                <div className="github-stat-card glass">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=Ashok-A15&show_icons=true&theme=tokyonight&bg_color=050b14&title_color=00f0ff&icon_color=3a86ff&text_color=a0aec0"
                    alt="Ashok's GitHub Stats"
                  />
                </div>
              </div>

              <div className="github-action">
                <a
                  href="https://github.com/Ashok-A15"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-btn github-btn"
                >
                  <GithubIcon size={20} /> View My GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CERTIFICATES SECTION (Animated) */}
        <section id="certificates" className="content-section">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-blue">Certificates</h2>
            <div className="certificates-grid">
              {CERTIFICATES.map((cert, index) => (
                <motion.a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  key={cert.id}
                  className="cert-card glass"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="cert-image-container">
                    <img src={cert.image} alt={cert.title} className="cert-image" />
                    <div className="cert-overlay">
                      <Award size={32} className="text-neon-cyan" />
                    </div>
                  </div>
                  <div className="cert-content">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="content-section">
          <motion.div
            className="glass-panel"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title neon-text-blue">Get In Touch</h2>
            <div className="contact-grid">
              <div className="contact-3d-container">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Contact3D />
                  </Suspense>
                </Canvas>
              </div>

              <div className="contact-content">
                <p>
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                {/* Formspree Integration */}
                <form className="contact-form" action="https://formspree.io/f/mwvyvgya" method="POST">
                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Your Email" required />
                  <input type="tel" name="phone" placeholder="Contact Number" required />
                  <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>

                <div className="contact-links">
                  <a href="mailto:mrashok067@gmail.com" className="contact-btn email-btn">
                    <Mail size={20} /> Email
                  </a>
                  <a href="https://github.com/Ashok-A15" target="_blank" rel="noreferrer" className="contact-btn github-btn">
                    <GithubIcon size={20} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/mrashok5b772239/" target="_blank" rel="noreferrer" className="contact-btn linkedin-btn">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}