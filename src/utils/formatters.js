/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount, compact = false) {
  if (compact && Math.abs(amount) >= 1000) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    return formatter.format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString, format = 'medium') {
  const date = new Date(dateString);

  const options = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    monthYear: { month: 'long', year: 'numeric' },
    dayMonth: { month: 'short', day: 'numeric' },
  };

  return date.toLocaleDateString('en-US', options[format] || options.medium);
}

/**
 * Format a percentage value
 */
export function formatPercentage(value, decimals = 1) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Get greeting based on time of day
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Get today's date formatted
 */
export function getFormattedToday() {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  return today.toLocaleDateString('en-US', options);
}

/**
 * Get the quarter string (e.g., "Q2 2026")
 */
export function getCurrentQuarter() {
  const today = new Date();
  const quarter = Math.ceil((today.getMonth() + 1) / 3);
  return `Q${quarter} ${today.getFullYear()}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 30) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate a unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString, 'short');
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
