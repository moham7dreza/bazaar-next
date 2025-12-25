/**
 * Application Constants
 */

/**
 * Helper to create endpoint configuration
 * Avoids function serialization issues with client components
 */
export const createEndpoints = (basePath) => ({
  LIST: basePath,
  CREATE: basePath,
  UPDATE: (id) => `${basePath}/${id}`,
  DELETE: (id) => `${basePath}/${id}`,
  SHOW: (id) => `${basePath}/${id}`,
});

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    USER: '/api/user',
    SEND_OTP: '/api/auth/send-otp',
    VERIFY_OTP: '/api/auth/verify-otp',
    LOGOUT: '/logout',
    CSRF: '/sanctum/csrf-cookie',
  },

  // Admin - Categories
  ADMIN_CATEGORIES: createEndpoints('/api/admin/advertisements/category'),

  // Admin - States
  ADMIN_STATES: createEndpoints('/api/admin/advertisements/state'),

  // Admin - Users
  ADMIN_USERS: createEndpoints('/api/admin/users/user'),

  // Admin - Menus
  ADMIN_MENUS: createEndpoints('/api/admin/content/menu'),

  // Admin - Pages
  ADMIN_PAGES: createEndpoints('/api/admin/content/page'),

  // Admin - Category Attributes
  ADMIN_CATEGORY_ATTRIBUTES: createEndpoints('/api/admin/advertisements/category-attribute'),

  // Admin - Category Values
  ADMIN_CATEGORY_VALUES: createEndpoints('/api/admin/advertisements/category-value'),

  // Admin - Ads
  ADMIN_ADS: createEndpoints('/api/admin/advertisements'),

  // Public
  PUBLIC: {
    CATEGORIES: '/api/categories',
    CITIES: '/api/cities',
    ADVERTISEMENTS: '/api/advertisements',
    ADVERTISEMENT: (id) => `/api/advertisements/${id}`,
    ADVERTISEMENT_GALLERY: (id) => `/api/advertisements/${id}/gallery`,
    CATEGORY_ATTRIBUTES: (categoryId) => `/api/advertisements/category/${categoryId}/attributes`,
    ATTRIBUTE_VALUES: (attributeId) => `/api/advertisements/category/${attributeId}/values`,
  },

  // Panel
  PANEL: {
    ADS: '/api/panel/advertisements',
    CREATE_AD: '/api/panel/advertisements/advertisement',
  },

  // Payment
  PAYMENT: {
    CREATE: '/api/payments/create',
  },
};

export const MESSAGES = {
  ERROR: {
    GENERIC: 'خطای غیرمنتظره رخ داد',
    NETWORK: 'خطا در برقراری ارتباط',
    CSRF: 'خطا در دریافت توکن امنیتی',
    UNAUTHORIZED: 'لطفا وارد حساب کاربری خود شوید',
    FORBIDDEN: 'شما اجازه دسترسی به این بخش را ندارید',
    NOT_FOUND: 'موردی یافت نشد',
    VALIDATION: 'اطلاعات وارد شده نامعتبر است',
    DELETE_FAILED: 'خطا در حذف',
    UPDATE_FAILED: 'خطا در ویرایش',
    CREATE_FAILED: 'خطا در ایجاد',
  },
  SUCCESS: {
    CREATED: 'با موفقیت ایجاد شد',
    UPDATED: 'با موفقیت ویرایش شد',
    DELETED: 'با موفقیت حذف شد',
    SAVED: 'اطلاعات ذخیره شد',
  },
  CONFIRM: {
    DELETE: 'آیا از حذف این مورد اطمینان دارید؟',
  },
};

export const VALIDATION_RULES = {
  NAME: {
    MIN: 2,
    MAX: 120,
    MESSAGE: 'نام باید بین ۲ تا ۱۲۰ کاراکتر باشد',
  },
  DESCRIPTION: {
    MIN: 2,
    MAX: 500,
    MESSAGE: 'توضیحات باید بین ۲ تا ۵۰۰ کاراکتر باشد',
  },
  ICON: {
    MIN: 1,
    MAX: 120,
    MESSAGE: 'آیکون باید بین ۱ تا ۱۲۰ کاراکتر باشد',
  },
  STATUS: {
    VALUES: ['0', '1'],
    MESSAGE: 'وضعیت باید یکی از مقادیر ۰ یا ۱ باشد',
  },
  MOBILE: {
    PATTERN: /^09\d{9}$/,
    MESSAGE: 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد',
  },
  OTP: {
    LENGTH: 5,
    MESSAGE: 'کد تایید باید ۵ رقم باشد',
  },
};

export const STATUS_OPTIONS = [
  { value: '1', label: 'فعال' },
  { value: '0', label: 'غیرفعال' },
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login-register',
  ADMIN: '/admin',
  PANEL: '/panel',
};

