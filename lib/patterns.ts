import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const patternsDir = path.join(process.cwd(), 'content/patterns');

export interface Pattern {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    cost_impact: string;
    reliability_impact: string;
    source_repo: string;
    content: string;
}

export function getPatterns(): Pattern[] {
    if (!fs.existsSync(patternsDir)) return [];

    const files = fs.readdirSync(patternsDir);
    return files
        .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
        .map(file => {
            const filePath = path.join(patternsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace(/\.mdx?$/, ''),
                title: data.title || 'Untitled',
                date: data.date || '',
                tags: data.tags || [],
                cost_impact: data.cost_impact || 'unknown',
                reliability_impact: data.reliability_impact || 'unknown',
                source_repo: data.source_repo || '',
                content,
            };
        })
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPattern(slug: string): Pattern | null {
    try {
        const filePath = path.join(patternsDir, `${slug}.mdx`);
        if (!fs.existsSync(filePath)) {
            // Try .md
            const mdPath = path.join(patternsDir, `${slug}.md`);
            if (!fs.existsSync(mdPath)) return null;
            const fileContent = fs.readFileSync(mdPath, 'utf8');
            const { data, content } = matter(fileContent);
            return {
                slug,
                title: data.title,
                date: data.date,
                tags: data.tags,
                cost_impact: data.cost_impact,
                reliability_impact: data.reliability_impact,
                source_repo: data.source_repo,
                content
            } as Pattern;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return {
            slug,
            title: data.title,
            date: data.date,
            tags: data.tags,
            cost_impact: data.cost_impact,
            reliability_impact: data.reliability_impact,
            source_repo: data.source_repo,
            content
        } as Pattern;
    } catch (error) {
        return null;
    }
}
