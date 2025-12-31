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
    pricing: '₹6,000 / month',
    features: [
      '1ON1 ONBOARDING consultation call',
      'GOAL ORIENTED workout plan',
      'CUSTOMISED Diet Plan',
      'Full WHATSAPP support',
    ],
  },
  {
    title: '3-Month Plan',
    subtitle: '(Workout plan update for every 5 WEEK once , Diet adjustment based on BODY PROGRESS )',
    tag: 'Progress',
    tier: 'threeMonths',
    tierLabel: 'Progress Phase',
    pricing: '₹15,000',
    features: [
      '1ON1 ONBOARDING consultation call',
      'GOAL ORIENTED workout plan',
      'CUSTOMISED Diet Plan',
      'Full WHATSAPP support',
      '(WORKOUT PLAN update every 5 WEEK once)',
      '(DIET adjustment based on Body Progress)',
    ],
  },
  {
    title: '6-Month Plan',
    subtitle: 'Complete transformation with periodized training and lifestyle coaching for Fat loss, Muscle gain, Body recomp & Performance',
    tag: 'Transformation',
    tier: 'sixMonths',
    tierLabel: 'Transformation Phase',
    pricing: '₹25,000',
    isRecommended: true,
    features: [
      '1on1 onboarding consultation call',
      'periodized training phases',
      'diet adjustments based on progress',
      'weekly check ins + feedback',
      'priority whatsapp support',
      'full progress tracking + reviews',
      'habit & lifestyle coaching',
    ],
  },
]


