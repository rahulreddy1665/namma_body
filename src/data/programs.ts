export type Program = {
  title: string
  subtitle: string
  highlights: string[]
  tag: string
}

export const PROGRAMS: Program[] = [
  {
    title: 'Fat Loss',
    subtitle: 'Sustainable conditioning, nutrition habits, and daily structure.',
    tag: 'Cut',
    highlights: ['Calorie strategy + habits', 'Strength + metabolic finishers', 'Weekly check-ins'],
  },
  {
    title: 'Muscle Building',
    subtitle: 'Progressive overload with recovery-first programming.',
    tag: 'Build',
    highlights: ['Hypertrophy cycles', 'Form + tempo mastery', 'Strength benchmarks'],
  },
  {
    title: 'Online Coaching',
    subtitle: 'Remote coaching with accountability and performance tracking.',
    tag: 'Remote',
    highlights: ['Custom plan + app tracking', 'Video form feedback', 'Adjustments every week'],
  },
  {
    title: 'Custom Plans',
    subtitle: 'For busy schedules—built around your goals and constraints.',
    tag: 'Custom',
    highlights: ['Flexible time blocks', 'Minimal equipment options', 'Clear progression rules'],
  },
]


