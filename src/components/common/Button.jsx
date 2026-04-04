const variants = {
  primary: 'bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-cream-100 dark:bg-navy-600 hover:bg-cream-200 dark:hover:bg-navy-500 text-charcoal-800 dark:text-slate-300',
  danger: 'bg-coral-500 hover:bg-coral-400 text-white',
  ghost: 'hover:bg-cream-100 dark:hover:bg-navy-600 text-charcoal-700 dark:text-slate-300',
  outline: 'border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon = null,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-xl
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2
        dark:focus:ring-offset-navy-800
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
        cursor-pointer
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}
