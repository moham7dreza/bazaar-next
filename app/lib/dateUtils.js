/**
 * Date and Time Utility Functions
 */

/**
 * Convert date to Jalali (Persian) format
 */
export const toJalali = (date) => {
  if (!date) return '';

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar: 'persian',
  };

  try {
    return new Date(date).toLocaleDateString('fa-IR', options);
  } catch (error) {
    console.error('Error converting date to Jalali:', error);
    return '';
  }
};

/**
 * Convert date to Jalali with time
 */
export const toJalaliDateTime = (date) => {
  if (!date) return '';

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    calendar: 'persian',
  };

  try {
    return new Date(date).toLocaleDateString('fa-IR', options);
  } catch (error) {
    console.error('Error converting date to Jalali:', error);
    return '';
  }
};

/**
 * Format time difference (e.g., "2 hours ago")
 */
export const timeAgo = (date) => {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'هم اکنون';
  if (diffMins < 60) return `${diffMins} دقیقه پیش`;
  if (diffHours < 24) return `${diffHours} ساعت پیش`;
  if (diffDays < 30) return `${diffDays} روز پیش`;

  return toJalali(date);
};

export default {
  toJalali,
  toJalaliDateTime,
  timeAgo,
};
