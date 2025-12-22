#!/bin/bash
# Mock payload simulating n8n
PAYLOAD='{
  "source_repo": "hjd-consulting/labs/balloon",
  "source_path": "lessons/mock-lesson.md",
  "event_type": "pattern_detected",
  "content": {
    "title": "Mock Lesson Title",
    "context": "We needed to test the API.",
    "decision": "We used curl.",
    "tradeoff": "It requires the server to be running.",
    "lesson": "Automation requires valid endpoints."
  },
  "metadata": {
    "tags": ["testing", "automation"],
    "cost_impact": "none",
    "reliability_impact": "high"
  }
}'

echo "Sending mock payload to http://localhost:3000/api/ingest..."
curl -X POST http://localhost:3000/api/ingest \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
echo -e "\n\nCheck content/drafts/mock-lesson-title.mdx if successful."
