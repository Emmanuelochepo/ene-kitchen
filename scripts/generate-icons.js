const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Ene's Kitchen icon — chef hat on deep forest green
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background circle -->
  <rect width="512" height="512" rx="112" fill="#042419"/>
  
  <!-- Chef hat -->
  <!-- Hat brim -->
  <rect x="148" y="330" width="216" height="40" rx="8" fill="#ffffff"/>
  <!-- Hat body -->
  <path d="M180 330 Q180 200 256 190 Q332 200 332 330 Z" fill="#ffffff"/>
  <!-- Left puff -->
  <circle cx="185" cy="235" r="55" fill="#ffffff"/>
  <!-- Right puff -->
  <circle cx="327" cy="235" r="55" fill="#ffffff"/>
  <!-- Center puff (top) -->
  <circle cx="256" cy="210" r="60" fill="#ffffff"/>
  <!-- Gold accent line on brim -->
  <rect x="148" y="330" width="216" height="8" rx="4" fill="#eec058"/>
</svg>`;

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "icon-maskable-512.png", size: 512 },
];

const publicDir = path.join(__dirname, "../public");

async function generate() {
  // Save SVG source
  fs.writeFileSync(path.join(publicDir, "icon.svg"), SVG);
  console.log("✓ icon.svg");

  for (const { name, size } of sizes) {
    await sharp(Buffer.from(SVG))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // Also write favicon.ico as 32x32 PNG (browsers accept PNG .ico)
  await sharp(Buffer.from(SVG))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "favicon.ico"));
  console.log("✓ favicon.ico");

  console.log("\nAll icons generated successfully.");
}

generate().catch(console.error);
