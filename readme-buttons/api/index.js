export default function handler(req, res) {
  const { 
    text = "Download CV", 
    // We default to a rich gradient, but the animation will rotate the HUE
    color1 = "ff0055", 
    color2 = "0055ff",
    textColor = "ffffff"
  } = req.query;

  // Clean hashtags
  const c1 = color1.replace('#', '');
  const c2 = color2.replace('#', '');

  const svg = `
  <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#${c1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${c2};stop-opacity:1" />
      </linearGradient>
    </defs>

    <g>
      <rect x="0" y="0" width="200" height="50" rx="25" fill="url(#grad)">
        <animate attributeName="fill-opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite" />
      </rect>
      
      <animateTransform 
         attributeName="transform" 
         type="hueRotate" 
         from="0" to="360" 
         dur="10s" 
         repeatCount="indefinite" 
         additive="sum"
      />
    </g>

    <text x="50%" y="50%" font-family="'Segoe UI', Ubuntu, Sans-Serif" font-size="16" 
          fill="#${textColor}" font-weight="bold" text-anchor="middle" dy=".3em" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.3);">
      ${text}
    </text>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.status(200).send(svg);
}