/**
 * Form Validation Utilities
 */
import { VALIDATION_RULES } from '@/app/config/constants';

/**
 * Common validation schemas for reuse
 */
export const commonValidations = {
  name: {
    required: true,
    min: VALIDATION_RULES.NAME.MIN,
    max: VALIDATION_RULES.NAME.MAX,
    message: VALIDATION_RULES.NAME.MESSAGE,
  },
  description: {
    required: true,
    min: VALIDATION_RULES.DESCRIPTION.MIN,
    max: VALIDATION_RULES.DESCRIPTION.MAX,
    message: VALIDATION_RULES.DESCRIPTION.MESSAGE,
  },
  icon: {
    required: true,
    min: VALIDATION_RULES.ICON.MIN,
    max: VALIDATION_RULES.ICON.MAX,
    message: VALIDATION_RULES.ICON.MESSAGE,
  },
  status: {
    required: true,
    validator: (value) => {
      if (!VALIDATION_RULES.STATUS.VALUES.includes(value.toString())) {
        return VALIDATION_RULES.STATUS.MESSAGE;
      }
      return null;
    },
  },
  mobile: {
    required: true,
    pattern: VALIDATION_RULES.MOBILE.PATTERN,
    message: VALIDATION_RULES.MOBILE.MESSAGE,
  },
  otp: {
    required: true,
    validator: (value) => {
      if (value.toString().length !== VALIDATION_RULES.OTP.LENGTH) {
        return VALIDATION_RULES.OTP.MESSAGE;
      }
      return null;
    },
  },
};

/**
 * Category/State/Menu validation schema (reusable)
 */
export const categoryValidationSchema = {
  name: commonValidations.name,
  description: commonValidations.description,
  status: commonValidations.status,
  icon: commonValidations.icon,
};

/**
 * Validate a single field
 */
export const validateField = (field, value, rules) => {
  if (!rules) return null;

  // Required check
  if (rules.required && (!value || value.toString().trim() === '')) {
    return rules.message || `${field} الزامی است`;
  }

  // Skip other validations if empty and not required
  if (!value) return null;

  // Min length
  if (rules.min && value.toString().length < rules.min) {
    return rules.message;
  }

  // Max length
  if (rules.max && value.toString().length > rules.max) {
    return rules.message;
  }

  // Pattern
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message;
  }

  // Custom validator
  if (rules.validator) {
    return rules.validator(value);
  }

  return null;
};

/**
 * Validate entire form
 */
export const validateForm = (formData, schema) => {
  const errors = {};
  let isValid = true;

  Object.keys(schema).forEach(field => {
    const error = validateField(field, formData[field], schema[field]);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

export default {
  commonValidations,
  categoryValidationSchema,
  validateField,
  validateForm,
};

