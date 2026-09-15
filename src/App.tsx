import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BracketsAngle,
  ChartLineUp,
  Check,
  Code,
  CursorClick,
  DeviceMobile,
  FlagCheckered,
  GithubLogo,
  Moon,
  Package,
  Palette,
  ShieldCheck,
  Sun,
  X,
} from '@phosphor-icons/react'
import { journeyStops, projects, type Project } from './data'

const JourneyScene = lazy(() => import('./JourneyScene'))

type AccentName = 'papaya' | 'ferrari' | 'acid' | 'cyan' | 'pink'
type SurfaceName = 'dark' | 'light'

const accents: Record<AccentName, { label: string; hex: string }> = {
  papaya: { label: 'Papaya', hex: '#ff7a1a' },
  ferrari: { label: 'Rosso', hex: '#ef1b2d' },
  acid: { label: 'Acid', hex: '#b8ff2c' },
  cyan: { label: 'Electric', hex: '#28e7ff' },
  pink: { label: 'Hot lap', hex: '#ff3d9a' },
}

function Intro({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion()
  const [launched, setLaunched] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  const begin = () => {
    if (launched) return
    setLaunched(true)
    timerRef.current = window.setTimeout(onDone, reducedMotion ? 180 : 1100)
  }

  return (
    <motion.div
      className="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.1 : 0.45 } }}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio entrance"
    >
      <div className="intro-grid" aria-hidden="true" />
      <motion.div
        className="intro-copy"
        animate={launched ? { x: '-120%', opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="broadcast-tag">DRIVER 44 · DEVELOPER CLASS</span>
        <h2>ROKO<br />GRGA</h2>
        <p>One needlessly dramatic entrance. Replay it anytime from the chequered flag.</p>
        <div className="intro-actions">
          <button className="button button-primary" onClick={begin} disabled={launched}>
            <FlagCheckered weight="fill" /> Race in
          </button>
        </div>
      </motion.div>
      <motion.div
        className="intro-driver"
        initial={{ x: '110%', rotate: 2 }}
        animate={{ x: launched ? '-4%' : '28%', rotate: launched ? -1 : 2 }}
        transition={{ duration: reducedMotion ? 0.1 : 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="speed-ghost ghost-one" />
        <div className="speed-ghost ghost-two" />
        <img src="/assets/roko-driver.webp" alt="Roko Grga in a fictional charcoal racing suit" />
      </motion.div>
      <motion.div
        className="intro-stats"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 0.8, duration: 0.55 }}
      >
        <span><b>05</b> featured projects</span>
        <span><b>04</b> platforms</span>
        <span><b>00</b> patience for beige</span>
      </motion.div>
    </motion.div>
  )
}

function ThemeControl({ accent, surface, onAccent, onSurface }: {
  accent: AccentName
  surface: SurfaceName
  onAccent: (accent: AccentName) => void
  onSurface: (surface: SurfaceName) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="theme-control">
      <button
        className="theme-trigger"
        aria-label="Open color controls"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Palette weight="fill" />}
        <span>{accents[accent].label}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="theme-panel"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
          >
            <div className="surface-toggle" aria-label="Surface theme">
              <button className={surface === 'dark' ? 'active' : ''} onClick={() => onSurface('dark')} aria-label="Use dark surface"><Moon /></button>
              <button className={surface === 'light' ? 'active' : ''} onClick={() => onSurface('light')} aria-label="Use light surface"><Sun /></button>
            </div>
            <p>Pick the team color</p>
            <div className="swatches">
              {(Object.entries(accents) as [AccentName, typeof accents[AccentName]][]).map(([name, value]) => (
                <button
                  key={name}
                  className={name === accent ? 'active' : ''}
                  style={{ '--swatch': value.hex } as React.CSSProperties}
                  onClick={() => onAccent(name)}
                  aria-label={`Use ${value.label} accent`}
                >
                  <span /> {value.label} {name === accent && <Check weight="bold" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectArt({ type }: { type: Project['art'] }) {
  if (type === 'director') {
    return (
      <div className="art art-director" role="img" aria-label="Concept diagram showing a selected interface element becoming a bounded source edit">
        <div className="director-cursor"><CursorClick weight="fill" /></div>
        <div className="director-node"><span>section.hero</span><strong>Selected</strong></div>
        <div className="director-line" />
        <div className="director-code"><BracketsAngle /><span>3 files max</span><span>exact patch</span><span>undo ready</span></div>
      </div>
    )
  }
  if (type === 'todo') {
    return (
      <div className="art art-todo" role="img" aria-label="Concept graphic of a task being stamped complete">
        <span className="todo-date">TODAY · 3 OF 4</span>
        <div className="todo-line"><span>Ship the stubborn thing</span><Check /></div>
        <div className="stamp">DONE</div>
        <span className="todo-foot">LOCAL · QUIET · YOURS</span>
      </div>
    )
  }
  if (type === 'gamefinder') {
    return (
      <div className="art art-gamefinder" role="img" aria-label="Concept ranking graph for game creator opportunity">
        <div className="finder-axis"><span>attention</span><span>coverage</span></div>
        {[88, 74, 61, 43].map((score, index) => (
          <div className="finder-row" key={score}><b>0{index + 1}</b><span style={{ '--score': `${score}%` } as React.CSSProperties} /><em>{score}</em></div>
        ))}
        <ChartLineUp className="finder-icon" weight="duotone" />
      </div>
    )
  }
  if (type === 'gearlog') {
    return (
      <div className="art art-gearlog" role="img" aria-label="Concept inventory map for equipment and maintenance">
        <div className="gear-orbit orbit-one"><Package weight="duotone" /></div>
        <div className="gear-orbit orbit-two"><ShieldCheck weight="duotone" /></div>
        <div className="gear-core"><strong>GEAR</strong><span>12 items</span></div>
        <div className="gear-caption">WARRANTY · SERVICE · VALUE</div>
      </div>
    )
  }
  return (
    <div className="art art-momentum" role="img" aria-label="Concept constellation connecting routines, notes, ideas, and experiments">
      <div className="momentum-ring ring-one" />
      <div className="momentum-ring ring-two" />
      <Atom className="momentum-atom" weight="duotone" />
      <span className="momentum-label label-a">ROUTINE</span>
      <span className="momentum-label label-b">IDEA</span>
      <span className="momentum-label label-c">EXPERIMENT</span>
    </div>
  )
}

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.article
      className={`project-feature ${index % 2 ? 'project-reverse' : ''}`}
      initial={reducedMotion ? false : { opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-visual">
        <ProjectArt type={project.art} />
        <span className="project-index">{project.number}</span>
      </div>
      <div className="project-copy">
        <div className="project-meta"><span>{project.type}</span><span>{project.year}</span></div>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <dl className="project-notes">
          <div><dt>The bet</dt><dd>{project.thesis}</dd></div>
          <div><dt>The hard part</dt><dd>{project.hardPart}</dd></div>
          <div><dt>The receipts</dt><dd>{project.proof}</dd></div>
        </dl>
        <div className="project-footer">
          <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <a className="text-link" href={project.url} target="_blank" rel="noreferrer">Open repository <ArrowUpRight /></a>
        </div>
      </div>
    </motion.article>
  )
}

function Journey({ accent, reducedMotion }: { accent: AccentName; reducedMotion: boolean }) {
  const [active, setActive] = useState(0)
  const [sceneReady, setSceneReady] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const stop = journeyStops[active]

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSceneReady(true)
        observer.disconnect()
      }
    }, { rootMargin: '320px' })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="journey-section" id="journey" aria-labelledby="journey-title">
      <img className="journey-backdrop" src="/assets/journey-world.webp" loading="lazy" alt="A winding software adventure road through a computer cave, interface canyon, mobile mountain, data observatory, and control tower" />
      <div className="journey-shade" />
      <div className="journey-heading">
        <span className="section-tag">THE LONG WAY ROUND</span>
        <h2 id="journey-title">No straight line.<br />Better scenery.</h2>
      </div>
      <div className="journey-stage" ref={stageRef}>
        <div className="journey-track">
          {sceneReady && (
            <Suspense fallback={<div className="journey-loading">Plotting the unnecessarily scenic route...</div>}>
              <JourneyScene active={active} accent={accents[accent].hex} reducedMotion={reducedMotion} />
            </Suspense>
          )}
          <div className="journey-dots" aria-label="Journey stops">
            {journeyStops.map((item, index) => (
              <button key={item.label} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Open journey stop ${index + 1}: ${item.label}`}>
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <motion.div
          key={stop.label}
          className="journey-copy"
          initial={reducedMotion ? false : { opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div><span>{stop.label}</span><small>{stop.era}</small></div>
          <h3>{stop.title}</h3>
          <p>{stop.body}</p>
          <div className="journey-buttons">
            <button onClick={() => setActive((active - 1 + journeyStops.length) % journeyStops.length)} aria-label="Previous journey stop"><ArrowLeft /></button>
            <span>{String(active + 1).padStart(2, '0')} / {String(journeyStops.length).padStart(2, '0')}</span>
            <button onClick={() => setActive((active + 1) % journeyStops.length)} aria-label="Next journey stop"><ArrowRight /></button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion() ?? false
  const [showIntro, setShowIntro] = useState(true)
  const [accent, setAccent] = useState<AccentName>(() => (window.localStorage.getItem('webgrga-accent') as AccentName) || 'papaya')
  const [surface, setSurface] = useState<SurfaceName>(() => (window.localStorage.getItem('webgrga-surface') as SurfaceName) || 'dark')
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.documentElement.dataset.accent = accent
    document.documentElement.dataset.surface = surface
    window.localStorage.setItem('webgrga-accent', accent)
    window.localStorage.setItem('webgrga-surface', surface)
  }, [accent, surface])

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showIntro])

  const heroMotion = useMemo(() => reducedMotion ? {} : {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay: showIntro ? 0 : 0.12 },
  }, [reducedMotion, showIntro])

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDone={() => setShowIntro(false)} />}</AnimatePresence>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Roko Grga home"><span>R</span>G</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#journey">Journey</a>
          <a href="#thinking">Thinking</a>
        </nav>
        <div className="header-actions">
          <button className="replay-button" onClick={() => setShowIntro(true)} aria-label="Replay driver entrance">
            <FlagCheckered weight="fill" /><span>Intro</span>
          </button>
          <ThemeControl accent={accent} surface={surface} onAccent={setAccent} onSurface={setSurface} />
          <a className="header-github" href="https://github.com/WebGrga" target="_blank" rel="noreferrer"><GithubLogo weight="fill" /> GitHub</a>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" ref={heroRef}>
          <div className="hero-grid" aria-hidden="true" />
          <motion.div className="hero-copy" {...heroMotion}>
            <span className="hero-kicker">FULL-STACK DEVELOPER · BUILDER OF ODDLY SPECIFIC THINGS</span>
            <h1 aria-label="Software with a pulse."><span>Software with</span><span>a pulse.</span></h1>
            <p>Web, mobile, and desktop products shaped around real people, sharp interfaces, and stubborn curiosity.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See the evidence <ArrowRight /></a>
              <a className="button button-secondary" href="https://github.com/WebGrga" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
            </div>
          </motion.div>
          <motion.div
            className="hero-portrait"
            initial={reducedMotion ? false : { opacity: 0, x: 180, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: showIntro ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-number">44</div>
            <div className="portrait-halo" />
            <img src="/assets/roko-driver.webp" fetchPriority="high" alt="Roko Grga wearing sunglasses and a fictional charcoal racing suit" />
            <div className="driver-card">
              <span>DRIVER</span><strong>ROKO GRGA</strong><em>FULL-STACK · FEATURED FIVE</em>
            </div>
          </motion.div>
          <div className="hero-proof">
            <span><Code weight="fill" /> Product-minded engineering</span>
            <span><DeviceMobile weight="fill" /> Web, mobile, desktop</span>
            <span><ShieldCheck weight="fill" /> Honest limits, tested work</span>
          </div>
        </section>

        <div className="telemetry-strip" aria-label="Portfolio highlights">
          <div className="telemetry-track">
            {[false, true].map((duplicate) => (
              <div className="telemetry-group" aria-hidden={duplicate || undefined} key={String(duplicate)}>
                {['REACT', 'TYPESCRIPT', '.NET', 'KOTLIN', 'PYTHON', 'LOCAL-FIRST'].map((item) => (
                  <span className="telemetry-item" key={item}><span>{item}</span><b aria-hidden="true">/</b></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-intro">
            <span className="section-tag">SELECTED WORK</span>
            <h2 id="work-title">Five featured bets.<br />The code is public.</h2>
            <p>Not a wall of thumbnails. Each project starts with a problem, takes a position, and leaves receipts.</p>
          </div>
          <div className="projects-list">
            {projects.map((project, index) => <ProjectFeature project={project} index={index} key={project.name} />)}
          </div>
        </section>

        <Journey accent={accent} reducedMotion={reducedMotion} />

        <section className="quote-section" id="thinking" aria-labelledby="quote-title">
          <div className="quote-mark" aria-hidden="true">“</div>
          <blockquote>
            <p id="quote-title">Technical work gets our attention, they argued, “not because it’s more crucial, but because it’s easier to do.”</p>
            <footer>
              <cite>Tom DeMarco and Timothy Lister, Peopleware</cite>
              <a href="https://motleybytes.com/w/DeMarco_and_Lister_quotes" target="_blank" rel="noreferrer">Source <ArrowUpRight /></a>
            </footer>
          </blockquote>
          <div className="quote-response">
            <span>1987 called. It was still right.</span>
            <p>AI makes code faster. It does not decide which problem matters, earn trust, understand a messy conversation, or notice when a polished answer is wrong.</p>
          </div>
        </section>

        <section className="method-section" aria-labelledby="method-title">
          <div className="method-heading">
            <span className="section-tag">WORKING METHOD</span>
            <h2 id="method-title">Make the problem smaller.<br />Make the result undeniable.</h2>
          </div>
          <ol className="method-list">
            <li><span>01</span><div><h3>Find the actual problem</h3><p>Ask awkward questions early. A correct answer to the wrong problem is just expensive confidence.</p></div></li>
            <li><span>02</span><div><h3>Build the risky part first</h3><p>Test the unknown, set boundaries, and keep the prototype honest about what it proves.</p></div></li>
            <li><span>03</span><div><h3>Polish what people touch</h3><p>Performance, accessibility, feedback, and visual rhythm are part of whether the thing works.</p></div></li>
          </ol>
        </section>

        <section className="closing-section">
          <div className="closing-copy">
            <span>THE CHEQUERED FLAG, APPARENTLY</span>
            <h2>Need someone who can think past the ticket?</h2>
            <p>I bring product judgment, interface taste, and enough engineering range to make the conversation concrete.</p>
          </div>
          <a className="closing-link" href="https://github.com/WebGrga" target="_blank" rel="noreferrer">
            <GithubLogo weight="fill" /> Explore my GitHub <ArrowUpRight />
          </a>
          <div className="closing-joke">Yes, I made myself a driver entrance. The restraint is in the code.</div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Roko Grga</span>
        <a href="#top">Back to the grid <ArrowRight /></a>
      </footer>
    </>
  )
}
