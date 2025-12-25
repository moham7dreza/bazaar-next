/**
 * Generic CRUD Hook for Form operations (Create/Update)
 */
'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/app/lib/apiClient';
import { MESSAGES } from '@/app/config/constants';

export const useCrudForm = ({ endpoints, redirectPath, isEdit = false }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  /**
   * Update form field
   */
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [validationErrors]);

  /**
   * Set entire form data
   */
  const setForm = useCallback((data) => {
    setFormData(data);
  }, []);

  /**
   * Validate form
   */
  const validate = useCallback((validationSchema) => {
    if (!validationSchema) return true;

    const errors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const rules = validationSchema[field];
      const value = formData[field];

      // Required check
      if (rules.required && (!value || value.toString().trim() === '')) {
        errors[field] = rules.message || `${field} الزامی است`;
        isValid = false;
        return;
      }

      // Min length
      if (rules.min && value && value.toString().length < rules.min) {
        errors[field] = rules.message;
        isValid = false;
        return;
      }

      // Max length
      if (rules.max && value && value.toString().length > rules.max) {
        errors[field] = rules.message;
        isValid = false;
        return;
      }

      // Pattern
      if (rules.pattern && value && !rules.pattern.test(value)) {
        errors[field] = rules.message;
        isValid = false;
        return;
      }

      // Custom validator
      if (rules.validator && value) {
        const customError = rules.validator(value, formData);
        if (customError) {
          errors[field] = customError;
          isValid = false;
        }
      }
    });

    setValidationErrors(errors);
    return isValid;
  }, [formData]);

  /**
   * Submit form (create or update)
   */
  const submit = useCallback(async (id = null, validationSchema = null) => {
    // Validate if schema provided
    if (validationSchema && !validate(validationSchema)) {
      setError(MESSAGES.ERROR.VALIDATION);
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;

      if (isEdit && id) {
        // Update
        response = await apiClient.put(endpoints.UPDATE(id), formData);
        setSuccess(MESSAGES.SUCCESS.UPDATED);
      } else {
        // Create
        response = await apiClient.post(endpoints.CREATE, formData);
        setSuccess(MESSAGES.SUCCESS.CREATED);
      }

      // Redirect after short delay
      if (redirectPath) {
        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 1000);
      }

      return response;
    } catch (err) {
      const errorMessage = err.message || (isEdit ? MESSAGES.ERROR.UPDATE_FAILED : MESSAGES.ERROR.CREATE_FAILED);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formData, isEdit, endpoints, redirectPath, router, validate]);

  /**
   * Fetch single item (for edit mode)
   */
  const fetchItem = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(endpoints.SHOW(id));
      const itemData = response.data || response;
      setFormData(itemData);
      return itemData;
    } catch (err) {
      setError(err.message || MESSAGES.ERROR.GENERIC);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoints]);

  return {
    formData,
    loading,
    error,
    success,
    validationErrors,
    updateField,
    setForm,
    submit,
    fetchItem,
    setError,
    setSuccess,
  };
};

export default useCrudForm;

