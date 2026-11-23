import heroWorkshopImg from '../assets/images/hero_team_workshop_1795436144720.jpg';
import facilitatorPortraitImg from '../assets/images/facilitator_portrait_1795436143698.jpg';
import workshopMaterialsImg from '../assets/images/workshop_materials_1795436143365.jpg';

export const MEDIA = {
  heroWorkshop: heroWorkshopImg,
  facilitatorPortrait: facilitatorPortraitImg,
  workshopMaterials: workshopMaterialsImg,
};

export const SITE_CONFIG = {
  brandName: 'CommonGround',
  practiceTagline: 'Team Development & Everything DiSC® Practice',
  practitionerName: 'Beth Maguire',
  practitionerCredentials: 'Certified Everything DiSC® Practitioner · Team Coach',
  email: 'hello@commongroundpeople.com',
  locationNote: 'In-person across the UK & Ireland · Live virtual worldwide',
  copyrightYear: '2026',
};

export const QUICK_FACTS = [
  { label: 'Delivery Format', value: 'In-Person & Virtual' },
  { label: 'Ideal Group Size', value: '6 to 40 People' },
  { label: 'Session Length', value: 'Half-Day to 2 Days' },
  { label: 'Core Assessment', value: 'Everything DiSC®' },
];

export interface ServiceOffer {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  groupSize: string;
  summary: string;
  deliverables: string[];
  featured?: boolean;
}

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    id: 'disc-team-workshop',
    number: '01.',
    title: 'Everything DiSC® Team Workshop',
    subtitle: 'For intact teams wanting clearer communication and stronger trust',
    duration: 'Half-Day or Full-Day',
    groupSize: '6–30 people',
    summary:
      'Every team member completes a 15-minute Everything DiSC® assessment before we meet. In the workshop, we turn those insights into plain-English working agreements—how your team runs meetings, gives feedback, and handles disagreement without friction.',
    deliverables: [
      'Individual 20-page Everything DiSC® Workplace profile for every participant',
      'Facilitated Team Culture Map showing strengths and communication gaps',
      'Practical 90-day team communication playbook written during the session',
    ],
    featured: true,
  },
  {
    id: 'fast-forming-teams',
    number: '02.',
    title: 'Fast-Forming & Leadership Alignment',
    subtitle: 'For newly formed, merged, or rapidly scaling teams',
    duration: '1 Day Offsite or Two 3-Hour Sprints',
    groupSize: '6–20 people',
    summary:
      'Skip six months of quiet misunderstandings. Built for new project teams, post-reorg departments, and senior leadership groups who need to establish trust, decision-making norms, and clear accountability quickly.',
    deliverables: [
      'Pre-session leader alignment briefing and team diagnostic',
      'Everything DiSC® Agile EQ or Management profiles tailored to roles',
      'Signed-off Team Charter covering roles, feedback, and decision cadence',
    ],
  },
  {
    id: 'coaching-follow-through',
    number: '03.',
    title: 'Manager Coaching & 90-Day Follow-Through',
    subtitle: 'So the workshop insights stick on Monday morning',
    duration: '30 & 90-Day Check-Ins',
    groupSize: 'Managers + Whole Team',
    summary:
      'Most workshops fade once busy weeks return. Follow-up sessions embed DiSC® into your real 1-on-1s, project retrospectives, and hiring conversations so growth lasts beyond the offsite.',
    deliverables: [
      'Two 60-minute team follow-up clinics at 30 and 90 days',
      'Manager quick-reference guide for adapting 1:1 coaching by style',
      'Access to Everything DiSC® Catalyst comparison platform for ongoing use',
    ],
  },
];

export const INCLUDED_EVERY_TIME = [
  {
    title: 'Pre-Work Handled End-to-End',
    detail: 'We manage all participant assessment invites, reminders, and report generation.',
  },
  {
    title: 'Zero Corporate Jargon',
    detail: 'Interactive, grounded facilitation focused on real conversations your team actually has.',
  },
  {
    title: 'Tailored to Your Real Context',
    detail: 'A 30-minute discovery briefing shapes every exercise around your current team challenges.',
  },
  {
    title: 'Tangible Monday-Morning Tools',
    detail: 'Every participant leaves with printed/digital reference cards and clear next actions.',
  },
];

export type DiscKey = 'D' | 'i' | 'S' | 'C';

export interface DiscStyleInfo {
  key: DiscKey;
  name: string;
  shapeLabel: string;
  paceAndFocus: string;
  tagline: string;
  color: string;
  softBg: string;
  borderColor: string;
  priorities: string[];
  strengths: string[];
  underPressure: string;
  workBestWith: string[];
  avoidDoing: string[];
  growthEdge: string;
}

export const DISC_STYLES: Record<DiscKey, DiscStyleInfo> = {
  D: {
    key: 'D',
    name: 'Dominance',
    shapeLabel: 'Triangle',
    paceAndFocus: 'Fast-paced · Task-focused',
    tagline: 'Direct, results-focused, decisive, and comfortable with challenge',
    color: '#B91C1C', // 6.47:1 contrast on white
    softBg: '#FEF2F2',
    borderColor: '#B91C1C',
    priorities: ['Getting immediate results', 'Taking action quickly', 'Challenging the status quo'],
    strengths: [
      'Keeps teams moving when decisions stall',
      'Addresses difficult problems head-on without hedging',
      'Sets ambitious goals and owns accountability',
    ],
    underPressure:
      'Can come across as blunt, impatient with long deliberation, or overly focused on speed at the expense of buy-in.',
    workBestWith: [
      'Lead with the bottom line first, then share supporting detail if asked',
      'Focus on outcomes, options, and clear ownership',
      'Be direct and concise—avoid rambling warm-ups',
    ],
    avoidDoing: [
      'Burying the main decision under five minutes of backstory',
      'Taking a direct question as a personal criticism',
    ],
    growthEdge: 'Slowing down long enough to explain the "why" and bring quieter voices into the room.',
  },
  i: {
    key: 'i',
    name: 'Influence',
    shapeLabel: 'Circle',
    paceAndFocus: 'Fast-paced · People-focused',
    tagline: 'Enthusiastic, collaborative, expressive, and energized by people',
    color: '#9A3412', // 7.1:1 contrast on white (deep vibrant burnt orange)
    softBg: '#FFF7ED',
    borderColor: '#C2410C',
    priorities: ['Building momentum and energy', 'Collaborating openly', 'Inspiring shared enthusiasm'],
    strengths: [
      'Creates warmth, psychological safety, and connection across silos',
      'Generates fresh ideas and keeps morale steady during change',
      'Brings people together around a compelling vision',
    ],
    underPressure:
      'May over-promise, gloss over gritty operational details, or talk through ideas before fully testing feasibility.',
    workBestWith: [
      'Allow space for brainstorming and open conversation before locking steps',
      'Keep the tone warm, human, and future-focused',
      'Follow up verbal agreements with a short written summary',
    ],
    avoidDoing: [
      'Shutting down new ideas immediately with rigid criticism',
      'Keeping communication purely cold and transactional',
    ],
    growthEdge: 'Pairing big-picture enthusiasm with concrete follow-through, deadlines, and quiet listening.',
  },
  S: {
    key: 'S',
    name: 'Steadiness',
    shapeLabel: 'Square',
    paceAndFocus: 'Moderate-paced · People-focused',
    tagline: 'Calm, dependable, supportive, and focused on team harmony',
    color: '#047857', // 5.48:1 contrast on white (vivid emerald)
    softBg: '#ECFDF5',
    borderColor: '#047857',
    priorities: ['Maintaining stability and trust', 'Supporting teammates consistently', 'Following through reliably'],
    strengths: [
      'Listens deeply and notices when someone on the team is struggling',
      'Delivers steady, predictable quality without drama',
      'Calms tense rooms and helps groups reach genuine consensus',
    ],
    underPressure:
      'May avoid necessary conflict, say "yes" to too much, or hesitate to speak up when abrupt changes happen.',
    workBestWith: [
      'Give advance notice before major changes and explain how people are affected',
      'Ask for their perspective directly and give time to reflect',
      'Show sincere appreciation for behind-the-scenes reliability',
    ],
    avoidDoing: [
      'Forcing high-stakes decisions on the spot without context',
      'Mistaking quiet agreement for full enthusiasm',
    ],
    growthEdge: 'Voicing constructive pushback early and embracing healthy disagreement as a path to stronger trust.',
  },
  C: {
    key: 'C',
    name: 'Conscientiousness',
    shapeLabel: 'Diamond',
    paceAndFocus: 'Moderate-paced · Task-focused',
    tagline: 'Analytical, thoughtful, thorough, and committed to high standards',
    color: '#1D4ED8', // 6.7:1 contrast on white (vivid cobalt blue)
    softBg: '#EFF6FF',
    borderColor: '#1D4ED8',
    priorities: ['Ensuring accuracy and quality', 'Thinking through risks', 'Understanding the logic'],
    strengths: [
      'Spots flaws, edge cases, and hidden risks before they become costly',
      'Brings structure, clarity, and rigor to complex projects',
      'Bases recommendations on evidence rather than guesswork',
    ],
    underPressure:
      'Can get stuck in analysis paralysis, appear overly critical of rough drafts, or withdraw when discussions feel chaotic.',
    workBestWith: [
      'Share agendas, data, and context ahead of meetings whenever possible',
      'Respect their need for clear expectations and logical rationale',
      'Give space for thoughtful questions rather than rushing past details',
    ],
    avoidDoing: [
      'Expecting instant enthusiasm for vague, untested plans',
      'Changing project criteria mid-stream without explaining why',
    ],
    growthEdge: 'Sharing work-in-progress sooner and communicating standards with warmth rather than critique.',
  },
};

export interface TeamPreset {
  id: string;
  label: string;
  description: string;
  counts: Record<DiscKey, number>;
}

export const TEAM_PRESETS: TeamPreset[] = [
  {
    id: 'product-launch',
    label: 'Product & Delivery Team',
    description: 'Fast-moving build team balancing D/i pace with C quality checks.',
    counts: { D: 3, i: 3, S: 1, C: 4 },
  },
  {
    id: 'leadership-exec',
    label: 'Senior Leadership Group',
    description: 'High-drive decision makers who sometimes talk past steady planners.',
    counts: { D: 4, i: 2, S: 1, C: 1 },
  },
  {
    id: 'people-support',
    label: 'Client & People Operations',
    description: 'Warm, reliable team that values harmony and occasionally avoids tough calls.',
    counts: { D: 1, i: 3, S: 5, C: 2 },
  },
  {
    id: 'balanced-squad',
    label: 'Balanced Cross-Functional',
    description: 'Evenly spread across all four styles—rich perspective, needs clear norms.',
    counts: { D: 2, i: 2, S: 2, C: 2 },
  },
];

export const OUTCOMES = [
  {
    metric: '4.9 / 5',
    label: 'Average participant workshop rating across 40+ facilitated teams',
  },
  {
    metric: '92%',
    label: 'Of managers report clearer 1:1 feedback conversations within 60 days',
  },
  {
    metric: '100%',
    label: 'Of teams leave with a written, agreed communication playbook',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'Before our session, our engineering and commercial leads were talking past each other in every weekly sync. Half a day with the DiSC® Team Map gave us a shared language without any awkward icebreakers. Six months later, we still reference our team agreements when priorities shift.',
    author: 'Claire Henderson',
    role: 'VP of Operations',
    company: 'Northbridge Health Tech',
  },
  {
    quote:
      'We brought Beth in right after merging two regional teams. Instead of months of cautious politeness, people understood how their colleagues actually prefer to make decisions and receive feedback. It was practical, human, and immediately useful.',
    author: 'Marcus Gallagher',
    role: 'Managing Director',
    company: 'Harbour & Co. Advisory',
  },
];
