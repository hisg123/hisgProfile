import { Fragment, useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, BrainCircuit, Database, FileCog, FileText, GitBranch, Globe2, Image, LockKeyhole, Mail, Menu, Network, Search, Server, ShieldCheck, UserRound, X } from 'lucide-react'
import { portfolio } from './portfolioData'
import { architectures } from './architectures'

function Tags({ tags }) {
  return <ul className="tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
}

const icons = { user: UserRound, auth: LockKeyhole, server: Server, database: Database, network: Network, git: GitBranch, chart: FileCog, document: FileText, search: Search, vision: Image, ai: BrainCircuit, shield: ShieldCheck }

function Project({ item, number }) {
  const [title, subtitle, period, tags, description, work, outcome] = item
  const language = /[가-힣]/.test(subtitle) ? 'ko' : 'en'
  const labels = language === 'ko' ? { architecture: '시스템 아키텍처' } : { architecture: 'System architecture' }
  const architecture = architectures[language][number - 1]
  return <article className="project"><span className="project-number">{String(number).padStart(2, '0')}</span><div><div className="project-top"><div><p>{subtitle}</p><h3>{title}</h3></div><time>{period}</time></div><p className="description">{description}</p><Tags tags={tags}/><ul className="work-list">{work.map((entry) => <li key={entry}>{entry}</li>)}</ul><p className="outcome">{outcome}</p><div className="diagram" aria-label={`${title} architecture`}><div className="diagram-head"><span>{labels.architecture}</span><strong>{title}</strong></div><p className="diagram-note">{architecture.note}</p><div className="diagram-domains">{architecture.domains.map(([domain, nodes], index) => <Fragment key={domain}><section className="diagram-domain"><h4>{domain}</h4><div className="domain-nodes">{nodes.map(([name, detail, icon]) => { const Icon = icons[icon]; return <div className="diagram-node" key={name}><span className="node-icon"><Icon size={24} aria-hidden="true"/></span><div><strong>{name}</strong><small>{detail}</small></div></div> })}</div></section>{index < architecture.domains.length - 1 && <div className="domain-connector" aria-hidden="true"><ArrowRight size={20}/></div>}</Fragment>)}</div></div></div></article>
}

export default function EnhancedApp() {
  const [language, setLanguage] = useState(() => localStorage.getItem('portfolio-language') || 'ko')
  const [menuOpen, setMenuOpen] = useState(false)
  const content = portfolio[language]

  useEffect(() => {
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
    document.title = language === 'ko' ? '홍인기 | IT Application Owner' : 'Hong Inki | IT Application Owner'
  }, [language])

  const chooseLanguage = (code) => {
    setLanguage(code)
    setMenuOpen(false)
  }

  return <div className="shell"><header className="topbar"><a className="wordmark" href="#top">HI<span>.</span></a><button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X/> : <Menu/>}</button><nav className={menuOpen ? 'open' : ''}>{Object.entries(content.navigation).map(([key, label]) => <a href={`#${key}`} key={key} onClick={() => setMenuOpen(false)}>{label}</a>)}<div className="language" aria-label="Language"><Globe2 size={15}/>{['ko', 'en'].map((code) => <button key={code} className={language === code ? 'active' : ''} onClick={() => chooseLanguage(code)}>{code.toUpperCase()}</button>)}</div></nav></header><main id="top"><section className="hero" id="profile"><div><p className="eyebrow">{content.eyebrow}</p><h1>Hong<br/><em>Inki.</em></h1><p className="role">{content.role}</p><p className="intro">{content.intro}</p><a className="discover" href="#projects">{content.navigation.projects}<ArrowDown size={18}/></a></div><div className="portrait-wrap"><i/><img className="portrait" src={`${import.meta.env.BASE_URL}profile-photo.jpg`} alt="Hong Inki"/><p className="availability"><b/>{content.availability}</p></div></section><section className="projects" id="projects"><div className="heading"><span>01</span><div><h2>{content.projectsTitle}</h2><p>{content.projectsLead}</p></div></div><div className="project-list">{content.projects.map((item, index) => <Project key={item[0]} item={item} number={index + 1}/>)}</div></section></main><footer id="contact"><p className="footer-label">LET&apos;S BUILD WHAT LASTS.</p><p className="closing">{content.closing}</p><div className="contact"><span>{content.contactLabel}</span><a href="mailto:hisg1201@naver.com"><Mail size={17}/>hisg1201@naver.com</a><a href="tel:01056572300">010-5657-2300</a></div><small>&copy; {new Date().getFullYear()} Hong Inki</small></footer></div>
}