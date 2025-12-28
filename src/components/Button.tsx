import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export default function Button({ variant = 'primary', className, children, ...props }: Props) {
  const classes = [
    'btn',
    variant === 'primary' ? 'btn--primary' : 'btn--ghost',
    className,
  ].filter(Boolean)

  return (
    <button {...props} className={classes.join(' ')}>
      {children}
    </button>
  )
}


