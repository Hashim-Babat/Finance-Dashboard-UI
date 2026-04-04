export default function Card({ children, className = '', hover = false, padding = true, ...props }) {
  return (
    <div
      className={`
        bg-white dark:bg-navy-700 
        rounded-2xl 
        shadow-card
        border border-cream-200 dark:border-navy-600
        ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300' : ''}
        ${padding ? 'p-5 sm:p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
