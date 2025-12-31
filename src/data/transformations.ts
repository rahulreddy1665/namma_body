import transformation1 from '../assets/transformation1.jpeg'
import transformation2 from '../assets/transformation2.jpeg'
import transformation3 from '../assets/transformation3.jpeg'

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
]


