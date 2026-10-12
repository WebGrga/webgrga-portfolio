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
  demoUrl?: string
  art: 'director' | 'btc' | 'hunter'
}

export const projects: Project[] = [
  {
    name: 'Frontend Director',
    number: '01',
    type: 'AI developer tool',
    year: '2026',
    summary: 'An AI-powered React editor with bounded context, validated edits, user approval, and reversible history.',
    thesis: 'A model can help change an interface while source access stays narrow, reviewable, and reversible.',
    hardPart: 'Mapping selected DOM elements to authored JSX, validating exact patches, and rejecting stale plans before execution.',
    proof: '125 automated tests, read-only structural planning, user-approved builds, atomic revisions, and branch-preserving restores. A development prototype; no build-before-apply gate yet.',
    stack: ['React', 'TypeScript', 'OpenAI API', 'AST tooling'],
    url: 'https://github.com/WebGrga/frontend-director',
    art: 'director',
  },
  {
    name: 'BTC–Jev',
    number: '02',
    type: 'Deployed AI decision experiment',
    year: '2026',
    summary: 'Scheduled market processing, deterministic guardrails, and bounded AI decisions with a public evaluation dashboard.',
    thesis: 'An AI decision needs an execution policy, a usage budget, and a record of what actually happened.',
    hardPart: 'Gating model calls on eligible events, making scheduled runs idempotent, and separating simulated fills and costs from archived forecast diagnostics.',
    proof: 'Cloudflare Workers and D1, a private runner, daily request reservations, a pause switch, and auditable paper outcomes. Paper-only: no real orders and no claim of profitable trading.',
    stack: ['TypeScript', 'TypeSafe / Jev', 'Cloudflare Workers', 'D1'],
    url: 'https://github.com/WebGrga/btc-jev-signal',
    demoUrl: 'https://lab.rokogrga.com/btc-jev',
    art: 'btc',
  },
  {
    name: 'Problem Hunter',
    number: '03',
    type: 'Experimental AI research pipeline',
    year: '2026',
    summary: 'Public discussions become source-backed findings, structured evaluations, and auditable research reports.',
    thesis: 'Every AI judgment should point back to evidence and make uncertainty visible to a human reviewer.',
    hardPart: 'Preserving speaker attribution and source dates, filtering scope, comparing specific complaints, and bounding API usage without hiding weak results.',
    proof: 'SQLite evidence and cost ledgers, caching, request and per-run cost limits, JSON/Markdown exports, and documented fresh trials. Reliable autonomous opportunity discovery is not established; remedy research needs a reviewed workflow brief.',
    stack: ['Python', 'SQLite', 'Brave Search', 'TypeSafe / Jev'],
    url: 'https://github.com/WebGrga/problemhunter',
    art: 'hunter',
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
    label: 'Delivery',
    era: 'Two years at 4Studio',
    title: 'I owned what shipped.',
    body: 'As the agency’s sole developer, I took requirements and Figma designs through implementation, integration, deployment, and maintenance.',
  },
  {
    label: 'Evaluation',
    era: 'From outputs to outcomes',
    title: 'Metrics need an argument.',
    body: 'BTC–Jev and Problem Hunter taught me to separate model confidence, implementation correctness, and evidence that a result is useful.',
  },
  {
    label: 'AI systems',
    era: 'Now',
    title: 'AI makes judgment more valuable.',
    body: 'The faster code becomes, the more the work depends on framing the right problem, engineering context, validating outputs, controlling execution, and evaluating what ships.',
  },
]
