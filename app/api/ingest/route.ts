import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Schema validation roughly based on the n8n payload structure
interface DraftPayload {
    source_repo: string;
    source_path: string;
    content: {
        title: string;
        context: string;
        decision: string;
        tradeoff: string;
        lesson: string;
    };
    metadata: {
        tags: string[];
        cost_impact: string;
        reliability_impact: string;
    };
}

export async function POST(request: Request) {
    try {
        const payload: DraftPayload = await request.json();

        // Basic validation
        if (!payload.content || !payload.content.title) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Generate MDX Content
        const slug = payload.content.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const date = new Date().toISOString().split('T')[0];

        const fileContent = `---
title: "${payload.content.title}"
date: "${date}"
tags: ${JSON.stringify(payload.metadata.tags)}
cost_impact: ${payload.metadata.cost_impact}
reliability_impact: ${payload.metadata.reliability_impact}
source_repo: ${payload.source_repo}
---

# Context
${payload.content.context}

# Decision
${payload.content.decision}

# Tradeoff
${payload.content.tradeoff}

# Lesson
${payload.content.lesson}
`;

        // Write to content/drafts
        const draftsDir = path.join(process.cwd(), 'content/drafts');
        // Ensure dir exists (redundant if mkdir run, but safe)
        if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir, { recursive: true });

        const filePath = path.join(draftsDir, `${slug}.mdx`);
        fs.writeFileSync(filePath, fileContent);

        return NextResponse.json({ success: true, path: `content/drafts/${slug}.mdx` });

    } catch (error) {
        console.error('Ingestion error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
