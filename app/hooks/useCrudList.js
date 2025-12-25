/**
 * Generic CRUD Hook for List/Table operations
 */
'use client';
import { useState, useCallback } from 'react';
import apiClient from '@/app/lib/apiClient';
import { MESSAGES } from '@/app/config/constants';

export const useCrudList = ({ endpoints, resourceName }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Fetch list data
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(endpoints.LIST);
      setData(response.data || response);
      return response;
    } catch (err) {
      setError(err.message || MESSAGES.ERROR.GENERIC);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoints.LIST]);

  /**
   * Delete item
   */
  const deleteItem = useCallback(async (id) => {
    const confirmMessage = MESSAGES.CONFIRM.DELETE;

    if (!confirm(confirmMessage)) {
      return false;
    }

    setDeleteLoading(id);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.delete(endpoints.DELETE(id));

      // Update local state
      setData(prevData => prevData.filter(item => item.id !== id));
      setSuccess(MESSAGES.SUCCESS.DELETED);

      return true;
    } catch (err) {
      setError(err.message || MESSAGES.ERROR.DELETE_FAILED);
      throw err;
    } finally {
      setDeleteLoading(null);
    }
  }, [endpoints]);

  /**
   * Refresh data
   */
  const refresh = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    deleteLoading,
    error,
    success,
    setError,
    setSuccess,
    fetchData,
    deleteItem,
    refresh,
  };
};

export default useCrudList;
