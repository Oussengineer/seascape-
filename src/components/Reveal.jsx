import useScrollReveal from '../hooks/useScrollReveal'

/**
 * Wrapper qui applique l'effet de fade-in au scroll.
 * `delay` (en ms) permet d'échelonner l'apparition de plusieurs éléments.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
