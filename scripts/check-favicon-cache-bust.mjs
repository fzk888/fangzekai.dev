import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

const requiredSnippets = [
  'const iconVersion = "fzk-20260624-round"',
  "const versionedIcon = (path: string) => `${path}?v=${iconVersion}`",
  'versionedIcon("/favicons/favicon.ico")',
  'versionedIcon("/favicons/favicon-16.png")',
  'versionedIcon("/favicons/favicon-32.png")',
  'versionedIcon("/favicons/favicon-96.png")',
  'versionedIcon("/favicons/apple-touch-icon.png")',
  'versionedIcon("/favicons/web-app-icon-192.png")',
  'versionedIcon("/favicons/manifest.json")',
];

const missing = requiredSnippets.filter((value) => !layout.includes(value));

if (missing.length > 0) {
  console.error("Missing cache-busted favicon metadata:");
  for (const value of missing) {
    console.error(`- ${value}`);
  }
  process.exit(1);
}

const allowedFaviconFiles = [
  "apple-touch-icon.png",
  "favicon-16.png",
  "favicon-32.png",
  "favicon-96.png",
  "favicon.ico",
  "manifest.json",
  "web-app-icon-192.png",
];

const faviconFiles = readdirSync(new URL("../public/favicons", import.meta.url)).sort();
const unexpectedFiles = faviconFiles.filter((file) => !allowedFaviconFiles.includes(file));

if (unexpectedFiles.length > 0) {
  console.error("Unexpected favicon files:");
  for (const file of unexpectedFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

if (layout.includes("android-icon") || layout.includes("apple-icon") || layout.includes("ms-icon")) {
  console.error("Found legacy favicon metadata reference.");
  process.exit(1);
}

const roundedIconCheck = `
from PIL import Image
from pathlib import Path

files = [
    'favicon-16.png',
    'favicon-32.png',
    'favicon-96.png',
    'apple-touch-icon.png',
    'web-app-icon-192.png',
]

bad = []
for name in files:
    path = Path('public/favicons') / name
    image = Image.open(path).convert('RGBA')
    width, height = image.size
    alphas = [
        image.getpixel((0, 0))[3],
        image.getpixel((width - 1, 0))[3],
        image.getpixel((0, height - 1))[3],
        image.getpixel((width - 1, height - 1))[3],
    ]
    if any(alpha != 0 for alpha in alphas):
        bad.append((name, alphas))

if bad:
    for name, alphas in bad:
        print(f'{name} has opaque corners: {alphas}')
    raise SystemExit(1)
`;

execFileSync("python3", ["-c", roundedIconCheck], { stdio: "inherit" });
