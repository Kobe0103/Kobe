"use client"

import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  codeUrl: string
}

type Design = {
  title: string
  description: string
  image: string
  tags: string[]
  figmaUrl: string
}

interface ContactSectionProps {
  onSubmit: (e: React.FormEvent) => void
  formRef: React.RefObject<HTMLFormElement | null>
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [activeTab, setActiveTab] = useState<'development' | 'design'>('development')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    emailjs.init("QmYuwTc4YP7J2Zosz")
    
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    
    window.addEventListener('scroll', handleScroll)
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', checkMobile)
    checkMobile()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkMobile)
    }
  }, [isMobile])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerHeight = scrolled ? 72 : 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      if (menuOpen) setMenuOpen(false)
    }
  }

  const projects: Project[] = [
    {
      title: "Cobalt QOL website",
      description: "The personal website for Cobalt QOL mod, this is a Quality-Of-Life mod for hypixel skyblock and showcases the development team and other important things about cobalt.",
      image: "/images/cobalt_logo_noBG.png",
      tags: ["HTML", "CSS", "JavaScript", "Tailwind", "Next.js"],
      liveUrl: "https://quiteboring.dev/cobalt",
      codeUrl: "https://github.com/Kobe0103/quiteboring.github.io/tree/master/app/cobalt"
    },
    {
      title: "Quiteboring.dev",
      description: "A developer portfolio website I built for a Minecraft mod developer.",
      image: "/images/dev.png",
      tags: ["HTML", "Tailwind", "JavaScript", "Next.js"],
      liveUrl: "https://quiteboring.dev/",
      codeUrl: "https://github.com/Kobe0103/quiteboring.github.io"
    },
    {
      title: "Task Forge",
      description: "An advanced task managing website made for learning web development.",
      image: "/images/tasker.png",
      tags: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://task-managingqsdsqd.netlify.app",
      codeUrl: "https://github.com/Kobe0103/Task-Manager"
    }
  ]

  const designs: Design[] = [
    {
      title: "A website template",
      description: "A sleek black landing page design for website that you can use for almost everything.",
      image: "/images/figma1.png",
      tags: ["UI Design", "Landing Page", "Style Guide", "Dark Mode"],
      figmaUrl: "https://www.figma.com/design/zjVkLpjLkL2H6nE8n1JoK1/Untitled?node-id=0-1&t=ZLUFLajW7zX6hd69-1"
    },
    {
      title: "Mobile Banking App",
      description: "Modern mobile banking interface focusing on simplicity and quick transactions.",
      image: "/images/figma2.png",
      tags: ["Mobile UI", "Fintech", "UX Design", "Multiple Pages"],
      figmaUrl: "https://www.figma.com/design/aHByU7ea58VdM4mMnoPJLD/Untitled?node-id=0-1&t=w4etNQ8JBlpnixjR-1"
    },
    {
      title: "Portfolio",
      description: "This was a design I needed to make for a portfolio from a friend to improve his previous design.",
      image: "/images/figma3.png",
      tags: ["Minimalist Design", "Dark Theme", "UI/UX", "Developer Portfolio"],
      figmaUrl: "https://www.figma.com/design/Fx7qnFU8C7S6bM0Au370w6/Untitled?node-id=0-1&t=NiOBVEvb832NaVkz-1"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return
    
    try {
      setIsSending(true)
      setModalOpen(true)
      setModalMessage('Sending your message...')
      
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      
      setModalMessage('Your message has been sent successfully! I&apos;ll get back to you soon.')
      formRef.current.reset()
      setIsSending(false)
      
      setTimeout(() => {
        setModalOpen(false)
      }, 5000)
    } catch (error) {
      console.error('Failed to send message:', error)
      setModalMessage('Sorry, there was an error sending your message. Please try again or contact me directly at kobejanssens31@gmail.com')
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-x-hidden cursor-default">
      {/* Modal Component */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 p-8 rounded-lg border border-purple-600 max-w-md w-full mx-4 relative animate-fadeIn">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors duration-300"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-white">
              {isSending ? 'Sending Message...' : modalMessage.includes('successfully') ? 'Message Sent!' : 'Error'}
            </h3>
            <div className="flex items-center">
              {isSending && (
                <div className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              <p className="text-gray-300">{modalMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Cursor effect - desktop only */}
      {!isMobile && !menuOpen && (
        <div 
          className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-purple-900/20 blur-3xl z-0"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transition: 'transform 0.1s linear'
          }}
        />
      )}
      
      <Head>
        <title>Kobe Janssens | Web Developer</title>
        <meta name="description" content="Personal portfolio of Kobe Janssens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kobejanssens.vercel.app/" />
        <meta property="og:title" content="Kobe Janssens | Web Developer" />
        <meta property="og:description" content="Personal portfolio of Kobe Janssens, a web developer specializing in modern, functional websites." />
        <meta property="og:image" content="https://kobejanssens.vercel.app/images/preview-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kobejanssens.vercel.app/" />
        <meta property="twitter:title" content="Kobe Janssens | Web Developer" />
        <meta property="twitter:description" content="Personal portfolio of Kobe Janssens, a web developer specializing in modern, functional websites." />
        <meta property="twitter:image" content="https://kobejanssens.vercel.app/images/preview-image.png" />
      </Head>

      <Header 
        scrolled={scrolled} 
        isMobile={isMobile} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        scrollToSection={scrollToSection}
      />
      
      <main className="pt-24 relative z-10">
        <HeroSection isMobile={isMobile} scrollToSection={scrollToSection} />
        <AboutSection />
        <WorkSection 
          projects={projects} 
          designs={designs} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ContactSection onSubmit={handleSubmit} formRef={formRef} />
      </main>

      <Footer />
    </div>
  )
}

interface HeaderProps {
  scrolled: boolean
  isMobile: boolean
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  scrollToSection: (id: string) => void
}

function Header({ scrolled, isMobile, menuOpen, setMenuOpen, scrollToSection }: HeaderProps) {
  const handleNavClick = (id: string) => {
    scrollToSection(id)
    if (isMobile) setMenuOpen(false)
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/90 backdrop-blur border-b border-purple-900/30' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-purple-400 hover:text-white transition-all duration-300 relative group"
            >
              Kobe Janssens
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
            </button>
          </div>
          
          {isMobile ? (
            <>
              <button 
                className={`relative z-[60] w-8 h-8 focus:outline-none transition-all duration-300 ${menuOpen ? 'text-white' : 'text-gray-300 hover:text-purple-400'}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 top-1/2' : 'top-1/4'}`} />
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'}`} />
                <div className={`absolute w-8 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 top-1/2' : 'top-3/4'}`} />
              </button>
              
              <div 
                className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{
                  top: scrolled ? '4.5rem' : '5.5rem',
                  height: scrolled ? 'calc(100vh - 4.5rem)' : 'calc(100vh - 5.5rem)'
                }}
              >
                <div className="w-full h-full pt-8 pb-8 px-6 overflow-y-auto">
                  <ul className="flex flex-col items-center space-y-8">
                    {['home', 'about', 'work', 'contact'].map((item) => (
                      <li key={item} className="overflow-hidden">
                        <button
                          onClick={() => handleNavClick(item)}
                          className="block text-2xl text-gray-300 hover:text-purple-400 transition-all duration-500 transform hover:translate-x-4 cursor-pointer w-full text-left"
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                          <span className="block h-0.5 bg-purple-400 mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <ul className="flex space-x-8">
              {['home', 'about', 'work', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="capitalize text-gray-300 hover:text-purple-400 transition-all duration-300 relative group cursor-pointer"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}

interface HeroSectionProps {
  isMobile: boolean
  scrollToSection: (id: string) => void
}

function HeroSection({ isMobile, scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="py-32 px-6 relative">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white group">
            Hello, I&apos;m <span className="text-purple-400 hover:text-white transition-all duration-300">Kobe Janssens</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 hover:text-gray-300 transition-all duration-300">
            Web Developer &amp; Designer focused on clean, functional experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection('work')}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-medium transition-all duration-300 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-purple-600 text-purple-400 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group cursor-pointer hover:bg-gray-900/50 hover:text-white hover:-translate-y-1"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
      {!isMobile && (
        <>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-purple-600/30 animate-float1" />
          <div className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-purple-400/20 animate-float2" />
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-purple-500/30 animate-float3" />
        </>
      )}
    </section>
  )
}

function AboutSection() {
  const skills = ['HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Next.js', 'Tailwind', 'UI/UX Design']
  
  return (
    <section id="about" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 group">
            <div className="bg-gradient-to-br from-purple-900 to-black p-1 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-600/10 group-hover:opacity-100 opacity-0 transition-all duration-500" />
              <Image 
                src="/images/Logo.png"
                alt="Kobe Janssens Logo"
                width={200}
                height={200}
                className="rounded-full w-full aspect-square object-cover bg-black relative z-10 transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4 text-gray-300 hover:text-white transition-all duration-300">
              I&apos;m a 16 Year old passionate web developer with expertise in creating modern, functional websites. 
              With over 3 years of experience, I specialize in front-end development and user experience. Outside 
              of coding, I love diving into design trends and tweaking animations until they feel perfect.
            </p>
            <p className="mb-8 text-gray-300 hover:text-white transition-all duration-300">
              I turn ideas into fast, accessible websites with clean code, smooth UX, and eye-catching UI.
            </p>
            <p className="mb-8 text-gray-300 hover:text-white transition-all duration-300">
              I&apos;m currently open to freelance opportunities or collaborations on creative web projects. I also would love 
              to help people with their new startups and be a part of their journey to success. 
            </p>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white hover:text-purple-400 transition-all duration-300">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 bg-gray-900 text-purple-400 rounded-full text-sm font-medium border border-gray-800 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:scale-105 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface WorkSectionProps {
  projects: Project[]
  designs: Design[]
  activeTab: 'development' | 'design'
  setActiveTab: (tab: 'development' | 'design') => void
}

function WorkSection({ projects, designs, activeTab, setActiveTab }: WorkSectionProps) {
  const tabRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tabRef.current && indicatorRef.current) {
      const tabs = tabRef.current.querySelectorAll('button')
      const activeTabElement = tabs[activeTab === 'development' ? 0 : 1]
      
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement
        indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`
        indicatorRef.current.style.width = `${offsetWidth}px`
      }
    }
  }, [activeTab])

  return (
    <section id="work" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>My Work</SectionTitle>
        
        {/* Tab Navigation with Sliding Indicator */}
        <div className="flex justify-center mb-12 relative">
          <div 
            ref={tabRef}
            className="inline-flex rounded-lg bg-gray-900 p-1 border border-gray-800 relative"
          >
            <button
              onClick={() => setActiveTab('development')}
              className={`px-6 py-2 rounded-md text-sm font-medium relative z-10 transition-colors duration-300 ${
                activeTab === 'development' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Development
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-6 py-2 rounded-md text-sm font-medium relative z-10 transition-colors duration-300 ${
                activeTab === 'design' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Design
            </button>
            
            {/* Sliding Purple Indicator */}
            <div
              ref={indicatorRef}
              className="absolute h-full bg-purple-600 rounded-md transition-all duration-300 ease-in-out"
              style={{
                width: '100px',
                left: 0,
                top: 0
              }}
            />
          </div>
        </div>

        {/* Content Area with Horizontal Scroll Effect */}
        <div className="relative overflow-hidden">
          <div 
            className={`flex transition-transform duration-500 ease-in-out ${
              activeTab === 'design' ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Development Projects - Left Side */}
            <div className="w-full flex-shrink-0 px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.title} className="relative group overflow-hidden rounded-xl cursor-default">
                    <div className="relative z-10 h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-purple-600/50">
                      <div className="h-48 bg-black flex items-center justify-center p-4 relative overflow-hidden">
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          width={400}
                          height={200}
                          className="max-h-full max-w-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-all duration-300">{project.title}</h3>
                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-all duration-300">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-800 text-purple-400 rounded-full text-xs font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <a 
                            href={project.liveUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
                          >
                            View Live
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                          </a>
                          <a 
                            href={project.codeUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
                          >
                            Source Code
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/70 to-black/90 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-2 rounded-xl bg-purple-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Design Work - Right Side */}
            <div className="w-full flex-shrink-0 px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {designs.map((design) => (
                  <div key={design.title} className="relative group overflow-hidden rounded-xl cursor-default">
                    <div className="relative z-10 h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-purple-600/50">
                      <div className="h-64 bg-black flex items-center justify-center p-4 relative overflow-hidden">
                        <Image 
                          src={design.image} 
                          alt={design.title}
                          width={400}
                          height={300}
                          className="max-h-full max-w-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-all duration-300">{design.title}</h3>
                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-all duration-300">
                          {design.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {design.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-800 text-purple-400 rounded-full text-xs font-medium hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-default">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a 
                          href={design.figmaUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
                        >
                          View in Figma
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                        </a>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black/70 to-black/90 rounded-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-2 rounded-xl bg-purple-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection({ onSubmit, formRef }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 border-t border-gray-800 px-6">
      <div className="container mx-auto">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <p className="mb-6 text-gray-300 hover:text-white transition-all duration-300">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-4">
              <div className="text-gray-300 hover:text-white transition-all duration-300">
                <strong className="font-medium">Email:</strong>
                <a 
                  href="mailto:kobejanssens31@gmail.com" 
                  className="ml-2 text-purple-400 hover:text-white transition-all duration-300 relative group cursor-pointer"
                >
                  kobejanssens31@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                </a>
              </div>
              <div className="text-gray-300 hover:text-white transition-all duration-300">
                <strong className="font-medium">Location:</strong>
                <span className="ml-2">Antwerpen, Belgium</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <a 
                href="https://github.com/Kobe0103" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
              >
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a 
                href="http://discordapp.com/users/1187752214429712508" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-white transition-all duration-300 relative group font-medium cursor-pointer"
              >
                Discord
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-300 hover:text-white transition-all duration-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-900 text-white transition-all duration-300 hover:border-purple-900 cursor-text"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 w-full relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-8 border-t border-gray-800 group">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-500 group-hover:text-gray-300 transition-all duration-300">
          &copy; {new Date().getFullYear()} Kobe Janssens. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-12 text-center group">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {children}
      </h2>
      <div className="mt-4 w-20 h-1 bg-purple-600 mx-auto rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  )
}