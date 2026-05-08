import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill'
  isLoading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  ariaLabel?: string
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'rounded',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      onClick,
      href,
      external = false,
      type = 'button',
      className,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    // Base classes for all buttons
    const baseClasses =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

    // Variant styles
    const variantClasses = {
      primary:
        'bg-clay text-cream hover:bg-bark focus:ring-clay/50 shadow-elevation-2 hover:shadow-elevation-3',
      secondary:
        'bg-bark text-cream hover:bg-charcoal focus:ring-bark/50 shadow-elevation-2 hover:shadow-elevation-3',
      outline:
        'bg-transparent text-charcoal border-2 border-charcoal/20 hover:bg-sand/50 hover:border-charcoal/30 focus:ring-charcoal/30',
      ghost: 'bg-transparent text-charcoal hover:bg-sand/30 focus:ring-charcoal/20',
      dark: 'bg-charcoal text-cream hover:bg-bark focus:ring-charcoal/50 shadow-elevation-2 hover:shadow-elevation-3',
    }

    // Size styles
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
      md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
      lg: 'px-6 py-3 text-base gap-2 min-h-[48px]',
    }

    // Shape styles
    const shapeClasses = {
      rounded: 'rounded-lg',
      pill: 'rounded-full',
    }

    // Width styles
    const widthClasses = fullWidth ? 'w-full' : ''

    // Combine all classes
    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      shapeClasses[shape],
      widthClasses,
      className
    )

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    // Content with icons
    const content = (
      <>
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </>
    )

    // If href is provided, render as Link or anchor
    if (href) {
      const isDisabled = disabled || isLoading

      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(combinedClasses, isDisabled && 'pointer-events-none opacity-60')}
            aria-label={ariaLabel}
            onClick={isDisabled ? undefined : onClick}
            {...props}
          >
            {content}
          </a>
        )
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(combinedClasses, isDisabled && 'pointer-events-none opacity-60')}
          aria-label={ariaLabel}
          onClick={isDisabled ? undefined : onClick}
          {...props}
        >
          {content}
        </Link>
      )
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClasses}
        aria-label={ariaLabel}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
