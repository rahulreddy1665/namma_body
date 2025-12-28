export type CommitmentTier = 'monthly' | 'threeMonths' | 'sixMonths'

export type Program = {
  title: string
  subtitle: string
  tag: string
  tier: CommitmentTier
  tierLabel: string
  pricing: string
  isRecommended?: boolean
  features: string[]
}

export const PROGRAMS: Program[] = [
  {
    title: 'Monthly Plan',
    subtitle: 'Getting started with basic structure and support.',
    tag: 'Starter',
    tier: 'monthly',
    tierLabel: 'Entry',
    pricing: '₹5,000 / month',
    features: [
      '1 ON 1 ON BOARDING CONSULTATION CALL',
      'BASIC WORKOUT PLAN WITH GUIDANCE',
      'GENERAL DIET GUIDANCE',
      'LIMITED WHATSAPP SUPPORT',
    ],
  },
  {
    title: '3-Month Plan',
    subtitle: 'Build momentum with structured programming and consistent tracking. Muscle gain, Fat loss.',
    tag: 'Progress',
    tier: 'threeMonths',
    tierLabel: 'Progress Phase',
    pricing: '₹15,000',
    features: [
      '1 ON 1 ON BOARDING CONSULTATION CALL',
      'DETAILED WORKOUT PROGRAMMING',
      'STRUCTURED DIET PLAN',
      'WEEKLY PROGRESS CHECK INS',
      'FULL WHATSAPP SUPPORT',
      'PROGRESS TRACKING SHEET',
    ],
  },
  {
    title: '6-Month Plan',
    subtitle: 'Complete transformation with periodized training and lifestyle coaching. Fat loss, Muscle gain, Body recomp.',
    tag: 'Transformation',
    tier: 'sixMonths',
    tierLabel: 'Transformation Phase',
    pricing: '₹25,000',
    isRecommended: true,
    features: [
      '1 ON 1 ON BOARDING CONSULTATION CALL',
      'PERIODIZED TRAINING PHASES',
      'DIET ADJUSTMENTS BASED ON PROGRESS',
      'WEEKLY CHECK INS + FEEDBACK',
      'PRIORITY WHATSAPP SUPPORT',
      'FULL PROGRESS TRACKING + REVIEWS',
      'HABIT & LIFESTYLE COACHING',
    ],
  },
]


