const fs = require('fs');
const matter = require('gray-matter');

console.log("Verifying gray-matter installation...");
try {
    const file = fs.readFileSync('content/patterns/mock-lesson.mdx', 'utf8');
    const { data, content } = matter(file);
    console.log("Success! Parsed frontmatter:");
    console.log(data);
} catch (e) {
    console.error("Failed:", e);
    process.exit(1);
}
console.log("Manual publication verification complete.");
