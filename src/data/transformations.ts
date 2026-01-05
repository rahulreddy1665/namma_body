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
    name: 'Raj',
    focus: 'Fat Loss + Conditioning',
    duration: '16 weeks',
    imageSrc: transformation1,
    imageAlt: 'Before and after transformation for Raj',
  },
  {
    name: 'Charan',
    focus: 'Strength + Muscle',
    duration: '16 weeks',
    imageSrc: transformation2,
    imageAlt: 'Before and after transformation for Charan',
  },
  {
    name: 'Indra Sena Reddy',
    focus: 'Body Recomp',
    duration: '12 weeks',
    imageSrc: transformation3,
    imageAlt: 'Before and after transformation for Indra Sena Reddy',
  },
  {
    name: 'Rupesh',
    focus: 'Transformation',
    duration: '16 weeks',
    imageSrc: transformation4,
    imageAlt: 'Before and after transformation for Rupesh',
  },
]


