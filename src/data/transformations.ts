import transformation1 from '../assets/1.png'
import transformation2 from '../assets/2.png'
import transformation3 from '../assets/3.png'
import transformation4 from '../assets/4.png'

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
    focus: 'Transformation',
    duration: '14 weeks',
    imageSrc: transformation4,
    imageAlt: 'Before and after transformation for Client D',
  },
]


