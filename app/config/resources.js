/**
 * Admin Resource Configurations
 * Define all CRUD resources in one place
 */
import { API_ENDPOINTS, STATUS_OPTIONS } from './constants';
import { categoryValidationSchema } from '@/app/lib/validationUtils';
import { toJalali } from '@/app/lib/dateUtils';

/**
 * Category Resource Configuration
 */
export const categoryResource = {
  name: 'دسته بندی',
  namePlural: 'دسته بندی ها',
  basePath: '/admin/category',
  endpoints: API_ENDPOINTS.ADMIN_CATEGORIES,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    {
      key: 'parent_id',
      label: 'دسته پدر',
      render: (row, allData) => {
        if (!row.parent_id) return 'دسته اصلی';
        const parent = allData?.find((cat) => cat.id === row.parent_id);
        return parent ? parent.name : 'دسته اصلی';
      },
    },
    { key: 'description', label: 'توضیحات' },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
      placeholder: 'نام دسته بندی را وارد کنید',
    },
    {
      name: 'description',
      label: 'توضیحات',
      type: 'textarea',
      required: true,
      placeholder: 'توضیحات دسته بندی را وارد کنید',
      rows: 4,
    },
    {
      name: 'icon',
      label: 'آیکون',
      type: 'text',
      required: true,
      placeholder: 'نام کلاس آیکون را وارد کنید (مثال: fa fa-home)',
    },
    {
      name: 'parent_id',
      label: 'دسته پدر',
      type: 'select',
      options: async (apiClient) => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN_CATEGORIES.LIST);
        return [
          { value: '', label: 'دسته اصلی' },
          ...(response.data || []).map(cat => ({
            value: cat.id.toString(),
            label: cat.name,
          })),
        ];
      },
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: categoryValidationSchema,

  defaultValues: {
    name: '',
    description: '',
    status: '1',
    icon: '',
    parent_id: null,
  },
};

/**
 * State Resource Configuration
 */
export const stateResource = {
  name: 'منطقه',
  namePlural: 'مناطق',
  basePath: '/admin/state',
  endpoints: API_ENDPOINTS.ADMIN_STATES,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    {
      key: 'parent_id',
      label: 'منطقه پدر',
      render: (row, allData) => {
        if (!row.parent_id) return 'منطقه اصلی';
        const parent = allData?.find((item) => item.id === row.parent_id);
        return parent ? parent.name : 'منطقه اصلی';
      },
    },
    { key: 'description', label: 'توضیحات' },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
      placeholder: 'نام منطقه را وارد کنید',
    },
    {
      name: 'description',
      label: 'توضیحات',
      type: 'textarea',
      required: true,
      placeholder: 'توضیحات منطقه را وارد کنید',
      rows: 4,
    },
    {
      name: 'icon',
      label: 'آیکون',
      type: 'text',
      required: true,
      placeholder: 'نام کلاس آیکون را وارد کنید',
    },
    {
      name: 'parent_id',
      label: 'منطقه پدر',
      type: 'select',
      options: async (apiClient) => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN_STATES.LIST);
        return [
          { value: '', label: 'منطقه اصلی' },
          ...(response.data || []).map(item => ({
            value: item.id.toString(),
            label: item.name,
          })),
        ];
      },
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: categoryValidationSchema, // Same validation as category

  defaultValues: {
    name: '',
    description: '',
    status: '1',
    icon: '',
    parent_id: null,
  },
};

/**
 * User Resource Configuration
 */
export const userResource = {
  name: 'کاربر',
  namePlural: 'کاربران',
  basePath: '/admin/user',
  endpoints: API_ENDPOINTS.ADMIN_USERS,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    { key: 'mobile', label: 'موبایل' },
    { key: 'email', label: 'ایمیل' },
    {
      key: 'user_type',
      label: 'نوع کاربر',
      render: (row) => {
        const types = { 0: 'کاربر عادی', 1: 'مدیر' };
        return types[row.user_type] || 'نامشخص';
      },
    },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status?.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
      placeholder: 'نام کاربر را وارد کنید',
    },
    {
      name: 'mobile',
      label: 'موبایل',
      type: 'text',
      required: true,
      placeholder: '09123456789',
    },
    {
      name: 'email',
      label: 'ایمیل',
      type: 'email',
      placeholder: 'example@example.com',
    },
    {
      name: 'user_type',
      label: 'نوع کاربر',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'کاربر عادی' },
        { value: '1', label: 'مدیر' },
      ],
      defaultValue: '0',
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: {
    name: {
      required: true,
      min: 2,
      max: 120,
      message: 'نام باید بین ۲ تا ۱۲۰ کاراکتر باشد',
    },
    mobile: {
      required: true,
      pattern: /^09\d{9}$/,
      message: 'شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد',
    },
  },

  defaultValues: {
    name: '',
    mobile: '',
    email: '',
    user_type: '0',
    status: '1',
  },
};

/**
 * Menu Resource Configuration
 */
export const menuResource = {
  name: 'منو',
  namePlural: 'منوها',
  basePath: '/admin/menu',
  endpoints: API_ENDPOINTS.ADMIN_MENUS,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'title', label: 'عنوان' },
    {
      key: 'parent_id',
      label: 'منوی والد',
      render: (row, allData) => {
        if (!row.parent_id) return 'منو اصلی';
        const parent = allData?.find((item) => item.id === row.parent_id);
        return parent ? parent.title : 'منو اصلی';
      },
    },
    { key: 'url', label: 'آدرس' },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status?.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'title',
      label: 'عنوان',
      type: 'text',
      required: true,
      placeholder: 'عنوان منو را وارد کنید',
    },
    {
      name: 'url',
      label: 'آدرس',
      type: 'text',
      required: true,
      placeholder: 'آدرس URL را وارد کنید (مثال: /about)',
    },
    {
      name: 'parent_id',
      label: 'منوی والد',
      type: 'select',
      options: async (apiClient) => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN_MENUS.LIST);
        return [
          { value: '', label: 'منو اصلی' },
          ...(response.data || []).map(item => ({
            value: item.id.toString(),
            label: item.title,
          })),
        ];
      },
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: {
    title: {
      required: true,
      min: 2,
      max: 120,
      message: 'عنوان باید بین ۲ تا ۱۲۰ کاراکتر باشد',
    },
    url: {
      required: true,
      min: 1,
      max: 255,
      message: 'آدرس باید بین ۱ تا ۲۵۵ کاراکتر باشد',
    },
  },

  defaultValues: {
    title: '',
    url: '',
    parent_id: null,
    status: '1',
  },
};

/**
 * Page Resource Configuration
 */
export const pageResource = {
  name: 'صفحه',
  namePlural: 'صفحات',
  basePath: '/admin/page',
  endpoints: API_ENDPOINTS.ADMIN_PAGES,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'title', label: 'عنوان' },
    {
      key: 'body',
      label: 'بدنه',
      render: (row) => (
        <div className="max-w-xs overflow-hidden">
          {row.body?.substring(0, 50)}...
        </div>
      ),
    },
    { key: 'slug', label: 'اسلاگ' },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status?.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'title',
      label: 'عنوان',
      type: 'text',
      required: true,
      placeholder: 'عنوان صفحه را وارد کنید',
    },
    {
      name: 'slug',
      label: 'اسلاگ',
      type: 'text',
      required: true,
      placeholder: 'slug-url',
    },
    {
      name: 'body',
      label: 'بدنه',
      type: 'textarea',
      required: true,
      placeholder: 'محتوای صفحه را وارد کنید',
      rows: 10,
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: {
    title: {
      required: true,
      min: 2,
      max: 255,
      message: 'عنوان باید بین ۲ تا ۲۵۵ کاراکتر باشد',
    },
    slug: {
      required: true,
      min: 1,
      max: 255,
      message: 'اسلاگ باید بین ۱ تا ۲۵۵ کاراکتر باشد',
    },
    body: {
      required: true,
      min: 10,
      message: 'بدنه باید حداقل ۱۰ کاراکتر باشد',
    },
  },

  defaultValues: {
    title: '',
    slug: '',
    body: '',
    status: '1',
  },
};

/**
 * Category Attribute Resource Configuration
 */
export const categoryAttributeResource = {
  name: 'ویژگی',
  namePlural: 'ویژگی‌ها',
  basePath: '/admin/category-attribute',
  endpoints: API_ENDPOINTS.ADMIN_CATEGORY_ATTRIBUTES,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'name', label: 'نام' },
    { key: 'unit', label: 'واحد' },
    {
      key: 'category_id',
      label: 'دسته بندی',
      render: (row) => row.category?.name || 'نامشخص',
    },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status?.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
      placeholder: 'نام ویژگی را وارد کنید',
    },
    {
      name: 'unit',
      label: 'واحد',
      type: 'text',
      placeholder: 'واحد اندازه‌گیری (مثال: متر، کیلوگرم)',
    },
    {
      name: 'category_id',
      label: 'دسته بندی',
      type: 'select',
      required: true,
      options: async (apiClient) => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN_CATEGORIES.LIST);
        return (response.data || []).map(cat => ({
          value: cat.id.toString(),
          label: cat.name,
        }));
      },
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: {
    name: {
      required: true,
      min: 2,
      max: 120,
      message: 'نام باید بین ۲ تا ۱۲۰ کاراکتر باشد',
    },
    category_id: {
      required: true,
      message: 'انتخاب دسته بندی الزامی است',
    },
  },

  defaultValues: {
    name: '',
    unit: '',
    category_id: '',
    status: '1',
  },
};

/**
 * Category Value Resource Configuration
 */
export const categoryValueResource = {
  name: 'مقدار ویژگی',
  namePlural: 'مقادیر ویژگی‌ها',
  basePath: '/admin/category-value',
  endpoints: API_ENDPOINTS.ADMIN_CATEGORY_VALUES,

  columns: [
    { key: 'id', label: 'شناسه' },
    { key: 'value', label: 'مقدار' },
    {
      key: 'category_attribute_id',
      label: 'ویژگی',
      render: (row) => row.categoryAttribute?.name || 'نامشخص',
    },
    {
      key: 'status',
      label: 'وضعیت',
      render: (row) => {
        const option = STATUS_OPTIONS.find(opt => opt.value === row.status?.toString());
        const label = option ? option.label : row.status;
        const colorClass = row.status === 1 ? 'text-green-600' : 'text-red-600';
        return <span className={colorClass}>{label}</span>;
      },
    },
    {
      key: 'created_at',
      label: 'تاریخ',
      render: (row) => toJalali(row.created_at),
    },
  ],

  formFields: [
    {
      name: 'value',
      label: 'مقدار',
      type: 'text',
      required: true,
      placeholder: 'مقدار ویژگی را وارد کنید',
    },
    {
      name: 'category_attribute_id',
      label: 'ویژگی',
      type: 'select',
      required: true,
      options: async (apiClient) => {
        const response = await apiClient.get(API_ENDPOINTS.ADMIN_CATEGORY_ATTRIBUTES.LIST);
        return (response.data || []).map(attr => ({
          value: attr.id.toString(),
          label: attr.name,
        }));
      },
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      required: true,
      options: STATUS_OPTIONS,
      defaultValue: '1',
    },
  ],

  validationSchema: {
    value: {
      required: true,
      min: 1,
      max: 255,
      message: 'مقدار باید بین ۱ تا ۲۵۵ کاراکتر باشد',
    },
    category_attribute_id: {
      required: true,
      message: 'انتخاب ویژگی الزامی است',
    },
  },

  defaultValues: {
    value: '',
    category_attribute_id: '',
    status: '1',
  },
};

export const ADMIN_RESOURCES = {
  category: categoryResource,
  state: stateResource,
  user: userResource,
  menu: menuResource,
  page: pageResource,
  categoryAttribute: categoryAttributeResource,
  categoryValue: categoryValueResource,
};

