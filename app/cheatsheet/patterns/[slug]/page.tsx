import { getPattern, getPatterns } from '@/lib/patterns';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export async function generateStaticParams() {
    const patterns = getPatterns();
    return patterns.map((pattern) => ({
        slug: pattern.slug,
    }));
}

export default function PatternPage({ params }: { params: { slug: string } }) {
    const pattern = getPattern(params.slug);

    if (!pattern) return <div>Pattern not found</div>;

    return (
        <div className="max-w-4xl mx-auto py-12">
            <Link href="/cheatsheet/patterns" className="text-blue-500 hover:underline mb-8 block">&larr; Back to Patterns</Link>

            <header className="mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">{pattern.title}</h1>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600 bg-gray-50 p-6 rounded-lg border">
                    <div>
                        <span className="font-semibold block text-gray-900">Source Repo</span>
                        <code className="text-blue-600">{pattern.source_repo}</code>
                    </div>
                    <div>
                        <span className="font-semibold block text-gray-900">Cost Impact</span>
                        <span className="uppercase font-bold text-gray-700">{pattern.cost_impact}</span>
                    </div>
                    <div>
                        <span className="font-semibold block text-gray-900">Reliability Impact</span>
                        <span className="uppercase font-bold text-gray-700">{pattern.reliability_impact}</span>
                    </div>
                </div>
            </header>

            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700">
                <ReactMarkdown>{pattern.content}</ReactMarkdown>
            </article>
        </div>
    );
}
