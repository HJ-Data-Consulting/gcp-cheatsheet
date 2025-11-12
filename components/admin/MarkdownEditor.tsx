'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function MarkdownEditor({ value, onChange, label }: MarkdownEditorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="Enter markdown content..."
          />
        </div>
        <div className="border border-gray-300 rounded-md p-4 overflow-auto h-96 bg-gray-50">
          <div className="prose max-w-none">
            <ReactMarkdown>{value || '*No preview available*'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

