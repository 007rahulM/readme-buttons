import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('Download CV');
  const [color1, setColor1] = useState('#ff0055');
  const [color2, setColor2] = useState('#0055ff');
  const [link, setLink] = useState('');

  // API Logic
  const c1 = color1.replace('#', '');
  const c2 = color2.replace('#', '');
  
  // LIVE URL (Backend)
  const baseUrl = "https://readme-buttons.vercel.app/api/index"; 
  const previewUrl = `/api/index?text=${encodeURIComponent(text)}&color1=${c1}&color2=${c2}`;
  const finalImageUrl = `${baseUrl}?text=${encodeURIComponent(text)}&color1=${c1}&color2=${c2}`;
  
  // Markdown Code
  const markdownCode = `[![${text}](${finalImageUrl})](${link || "#"})`;

  return (
    <div className="app-container">
      <h1>README Buttons</h1>

      <div className="card-glass">
        
        {/* INPUTS GRID */}
        <div className="controls-grid">
          <div className="input-group">
            <label>Button Text</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Link (Resume/Portfolio)</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={link} 
              onChange={(e) => setLink(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label>Primary Color</label>
            <div className="color-wrapper">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
              <span>{color1}</span>
            </div>
          </div>

          <div className="input-group">
            <label>Secondary Color</label>
            <div className="color-wrapper">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
              <span>{color2}</span>
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="preview-container">
          <label>Live Preview (Hue Animates automatically)</label>
          <div className="preview-box">
            <img src={previewUrl} alt="Button Preview" />
          </div>
        </div>

       {/* OUTPUT */}
        <div className="input-group" style={{marginTop: '30px'}}>
          <label>Copy Markdown Code</label>
          <div className="code-block">
            {markdownCode}
          </div>
          <button className="copy-btn" onClick={() => {
             navigator.clipboard.writeText(markdownCode);
             alert("Copied to clipboard!");
          }}>
            Copy Snippet
          </button>
        </div>

      </div>
    </div>
  )
}

export default App