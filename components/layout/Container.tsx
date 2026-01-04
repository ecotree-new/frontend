import { ReactNode, ElementType } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`
        w-full
        max-w-[1100px]
        min-w-[688px]
        mx-auto
        px-10
        xl:px-0
        ${className}
      `.trim()}
    >
      {children}
    </Component>
  );
}
