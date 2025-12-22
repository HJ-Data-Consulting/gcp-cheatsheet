import Link from 'next/link';
import { getPatterns } from '@/lib/patterns';

export default function PatternsPage() {
    const patterns = getPatterns();

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">Architectural Patterns</h1>
            <div className="grid gap-6">
                {patterns.length === 0 ? (
                    <p className="text-gray-500">No patterns published yet.</p>
                ) : (
                    patterns.map((pattern) => (
                        <Link
                            key={pattern.slug}
                            href={`/cheatsheet/patterns/${pattern.slug}`}
                            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-2xl font-bold text-blue-600 mb-2">{pattern.title}</h2>
                            <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                <span>{pattern.date}</span>
                                <span>From: {pattern.source_repo}</span>
                            </div>
                            <div className="flex gap-2">
                                {pattern.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
