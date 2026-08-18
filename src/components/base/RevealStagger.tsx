import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function RevealStagger({
  children,
  className = '',
  staggerDelay,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<{ style?: CSSProperties }>;
        const delay =
          staggerDelay != null
            ? `${index * staggerDelay}ms`
            : `calc(${index} * var(--stagger-delay, 80ms))`;

        const style: CSSProperties = visible
          ? {
              ...element.props.style,
              animation: `reveal-up var(--reveal-duration, 0.7s) ease-out ${delay} both`,
            }
          : { ...element.props.style, opacity: 0 };

        return cloneElement(element, { style });
      })}
    </div>
  );
}