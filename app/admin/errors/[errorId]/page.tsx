'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CommonError } from '@/types';
import MarkdownEditor from '@/components/admin/MarkdownEditor';

export default function ErrorFormPage() {
  const router = useRouter();
  const params = useParams();
  const errorId = params.errorId as string;
  const isNew = errorId === 'new';

  const [formData, setFormData] = useState({
    service: '',
    errorCode: '',
    errorMessage: '',
    resolution: '',
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchError();
    }
  }, [errorId]);

  const fetchError = async () => {
    try {
      const res = await fetch(`/api/admin/errors/${errorId}`);
      const data = await res.json();
      setFormData({
        service: data.service,
        errorCode: data.errorCode,
        errorMessage: data.errorMessage,
        resolution: data.resolution,
      });
    } catch (error) {
      console.error('Failed to fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNew ? '/api/admin/errors' : `/api/admin/errors/${errorId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/errors');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save error');
      }
    } catch (error) {
      console.error('Failed to save error:', error);
      alert('Failed to save error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isNew ? 'Add' : 'Edit'} Error</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service
          </label>
          <input
            type="text"
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Cloud Storage, Compute Engine"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="errorCode" className="block text-sm font-medium text-gray-700 mb-2">
            Error Code
          </label>
          <input
            type="text"
            id="errorCode"
            value={formData.errorCode}
            onChange={(e) => setFormData({ ...formData, errorCode: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 403, QUOTA_EXCEEDED"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="errorMessage" className="block text-sm font-medium text-gray-700 mb-2">
            Error Message
          </label>
          <input
            type="text"
            id="errorMessage"
            value={formData.errorMessage}
            onChange={(e) => setFormData({ ...formData, errorMessage: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Access Denied"
          />
        </div>

        <div className="mb-4">
          <MarkdownEditor
            value={formData.resolution}
            onChange={(value) => setFormData({ ...formData, resolution: value })}
            label="Resolution"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/errors')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

