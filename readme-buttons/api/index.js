// api/index.js

export default function handler(req, res) {
  // 1. Get parameters from the URL (with defaults)
  const { 
    text = "Download CV", 
    color = "4F46E5",      // Default: Indigo
    bgColor = "f3f4f6",    // Default: Light Gray
    icon = "download",     // Default icon (we can add more logic later)
    style = "flat"         // Future: flat, gradient, outline
  } = req.query;

  // 2. Define the SVG String (The "Template")
  // We insert the variables ${text} and ${color} directly into the XML
  const svg = `
  <svg width="180" height="50" viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${color}dd;stop-opacity:1" />
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <rect x="2" y="2" width="176" height="46" rx="23" fill="url(#grad)" filter="url(#glow)" stroke="white" stroke-width="2"/>

    <text x="50%" y="50%" font-family="Verdana, sans-serif" font-size="14" 
          fill="white" font-weight="bold" text-anchor="middle" dy=".3em">
      ${text}
    </text>
  </svg>
  `;

  // 3. Tell the browser this is an IMAGE, not text
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day

  // 4. Send the image
  res.status(200).send(svg);
}