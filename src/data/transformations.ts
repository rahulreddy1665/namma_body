import transformation1 from '../assets/transformation1.jpeg'
import transformation2 from '../assets/transformation2.jpeg'
import transformation3 from '../assets/transformation3.jpeg'
import transformation4 from '../assets/transformation4.jpeg'
import transformation5 from '../assets/transformation5.jpeg'
import transformation6 from '../assets/transformation6.jpeg'

export type Transformation = {
  name: string
  focus: string
  duration: string
  imageSrc: string
  imageAlt: string
}

export const TRANSFORMATIONS: Transformation[] = [
  {
    name: 'Client A',
    focus: 'Fat Loss + Conditioning',
    duration: '12 weeks',
    imageSrc: transformation1,
    imageAlt: 'Before and after transformation for Client A',
  },
  {
    name: 'Client B',
    focus: 'Strength + Muscle',
    duration: '16 weeks',
    imageSrc: transformation2,
    imageAlt: 'Before and after transformation for Client B',
  },
  {
    name: 'Client C',
    focus: 'Body Recomp',
    duration: '10 weeks',
    imageSrc: transformation3,
    imageAlt: 'Before and after transformation for Client C',
  },
  {
    name: 'Client D',
    focus: 'Posture + Core',
    duration: '8 weeks',
    imageSrc: transformation4,
    imageAlt: 'Before and after transformation for Client D',
  },
  {
    name: 'Client E',
    focus: 'Athletic Performance',
    duration: '14 weeks',
    imageSrc: transformation5,
    imageAlt: 'Before and after transformation for Client E',
  },
  {
    name: 'Client F',
    focus: 'Online Coaching',
    duration: '12 weeks',
    imageSrc: transformation6,
    imageAlt: 'Before and after transformation for Client F',
  },
]


