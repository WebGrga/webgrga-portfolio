export type Project = {
  name: string
  number: string
  type: string
  year: string
  summary: string
  thesis: string
  hardPart: string
  proof: string
  stack: string[]
  url: string
  art: 'director' | 'todo' | 'gamefinder' | 'gearlog' | 'momentum'
}

export const projects: Project[] = [
  {
    name: 'Frontend Director',
    number: '01',
    type: 'Developer tool',
    year: '2026',
    summary: 'A visual control layer that turns selected interface elements into narrow, reviewable source edits.',
    thesis: 'AI editing should feel direct without giving a model the keys to the entire repository.',
    hardPart: 'Mapping DOM selections back to authored JSX, then rejecting stale or ambiguous edits before they touch disk.',
    proof: '125 automated tests, atomic revisions, branch-preserving history, bounded context, and explicit build approval.',
    stack: ['React', 'TypeScript', 'Vite', 'AST tooling'],
    url: 'https://github.com/WebGrga/frontend-director',
    art: 'director',
  },
  {
    name: 'ToDoOfSorts',
    number: '02',
    type: 'Native mobile',
    year: '2026',
    summary: 'An offline-first task app where finishing something earns a permanent, tactile stamp.',
    thesis: 'Completion should feel like an event, not a checkbox quietly changing color.',
    hardPart: 'Recurrence, historical corrections, reminders, quiet hours, backups, and accessibility across Android and iOS.',
    proof: '37 domain and storage tests, measured performance, SQLite persistence, and a tested Android flow.',
    stack: ['.NET MAUI', 'C#', 'SQLite', 'Android + iOS'],
    url: 'https://github.com/WebGrga/todo-of-sorts',
    art: 'todo',
  },
  {
    name: 'Gamefinder',
    number: '03',
    type: 'Data product',
    year: '2026',
    summary: 'A local trend radar that finds creator opportunity instead of simply reporting what is already popular.',
    thesis: 'The useful question is not “what is big?” It is “what is rising, searchable, and still under-covered?”',
    hardPart: 'Combining imperfect signals from Steam, Reddit, and YouTube without making the score mysterious or brittle.',
    proof: 'Deterministic scoring, independently failing collectors, SQLite snapshots, tests, and a credential-free offline demo.',
    stack: ['Python', 'SQLite', 'Steam', 'YouTube + Reddit'],
    url: 'https://github.com/WebGrga/gamefinder',
    art: 'gamefinder',
  },
  {
    name: 'GearLog',
    number: '04',
    type: 'College final project',
    year: '2025',
    summary: 'A private Android inventory for equipment, warranties, photos, and maintenance history.',
    thesis: 'The things we rely on deserve a memory better than a receipt buried in a drawer.',
    hardPart: 'Keeping filters, totals, warranty status, and maintenance records reactive while everything stays on-device.',
    proof: 'Jetpack Compose, Room, Kotlin Flow, optional biometrics, and unit-tested inventory rules.',
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Flow'],
    url: 'https://github.com/WebGrga/gearlog',
    art: 'gearlog',
  },
  {
    name: 'Momentum Lab',
    number: '05',
    type: 'Desktop product',
    year: '2025',
    summary: 'A local-first workspace for experiments, routines, notes, and ideas that belong to the person using it.',
    thesis: 'Self-improvement software can be useful without turning a private life into cloud telemetry.',
    hardPart: 'Migrating a college prototype into a typed desktop system with a narrow file bridge and humane backups.',
    proof: 'A canonical data model, Electron persistence, JSON import and export, responsive UI, and no analytics.',
    stack: ['TypeScript', 'Electron', 'Vite', 'Local-first'],
    url: 'https://github.com/WebGrga/momentum-lab',
    art: 'momentum',
  },
]

export const journeyStops = [
  {
    label: 'Curiosity',
    era: 'The first turn',
    title: 'I learned by making things move.',
    body: 'Small interfaces, strange prototypes, and the realization that changing pixels is only interesting when behavior changes too.',
  },
  {
    label: 'Interfaces',
    era: 'The craft gets serious',
    title: 'Good-looking was not enough.',
    body: 'Responsive layout, accessibility, state, and interaction design turned visual work into actual product work.',
  },
  {
    label: 'Systems',
    era: 'Beyond the browser',
    title: 'One screen became a whole system.',
    body: 'Mobile, desktop, persistence, notifications, imports, exports, and the unglamorous edge cases that make software dependable.',
  },
  {
    label: 'Signals',
    era: 'Data with a point',
    title: 'Metrics need an argument.',
    body: 'Scoring and automation taught me to show why a result exists, not just print a confident number.',
  },
  {
    label: 'Direction',
    era: 'Now',
    title: 'AI makes judgment more valuable.',
    body: 'The faster code becomes, the more the work depends on framing the right problem, setting boundaries, and reviewing what ships.',
  },
]
