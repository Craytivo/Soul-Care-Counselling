interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export default function Skeleton({ className = '', width = 'w-full', height = 'h-4' }: SkeletonProps) {
  return (
    <div
      className={`skeleton rounded ${width} ${height} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
}