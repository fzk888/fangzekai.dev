import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  slug?: string;
  image?: string;
  tags?: string[];
};

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

const POST_EXTENSIONS = [".md", ".mdx"];

function getPostFiles(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((file) => POST_EXTENSIONS.includes(path.extname(file)));
}

function getPostSlug(file: string, metadata: Record<string, unknown>) {
  const configuredSlug = metadata.slug;
  if (typeof configuredSlug === "string" && configuredSlug.trim()) {
    return configuredSlug.trim();
  }

  return path.basename(file, path.extname(file));
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

async function loadPost(filePath: string) {
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const slug = getPostSlug(filePath, metadata);
  const content = await markdownToHTML(rawContent);
  const readingMinutes = calculateReadingTime(rawContent);

  return {
    source: content,
    metadata: {
      ...metadata,
      readingMinutes,
      readingTime: `${readingMinutes} min read`,
    } as Metadata & { readingMinutes: number; readingTime: string },
    slug,
  };
}

export async function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), "content");
  const matchedFile = getPostFiles(contentDir).find((file) => {
    const filePath = path.join(contentDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data: metadata } = matter(source);
    return getPostSlug(file, metadata) === slug;
  });

  if (!matchedFile) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  return loadPost(path.join(contentDir, matchedFile));
}

async function getAllPosts(dir: string) {
  const posts = await Promise.all(
    getPostFiles(dir).map((file) => loadPost(path.join(dir, file)))
  );

  const uniqueSlugs = new Set(posts.map((post) => post.slug));
  if (uniqueSlugs.size !== posts.length) {
    throw new Error("Duplicate blog post slug");
  }

  return posts;
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
