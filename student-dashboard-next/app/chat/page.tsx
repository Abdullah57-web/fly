'use client';
import { useState } from 'react';

declare global {
  interface Window { chatStopSignal?: boolean; }
}

export default function ChatPage() {
  const [textInput, setTextInput] = useState('');
  const [toolState, setToolState] = useState<'idle' | 'input-streaming' | 'input-available' | 'output-available' | 'error'>('idle');
  const [toolData, setToolData] = useState<any>(null);

  const triggerToolLifecycle = async (promptText: string) => {
    const lower = promptText.toLowerCase();
    
    if (lower.includes('fail') || lower.includes('error')) {
      setToolState('input-streaming');
      await new Promise(r => setTimeout(r, 1000));
      setToolState('error');
      return;
    }

    setToolState('input-streaming'); 
    setToolData(null);
    await new Promise(r => setTimeout(r, 1200));
    
    setToolState('input-available');
    await new Promise(r => setTimeout(r, 1400));
    
    setToolState('output-available');
    setToolData({ 
      score: 85, 
      conversionProbability: 'High', 
      status: 'Hot Lead', 
      recommendations: ['Schedule immediate discovery call', 'Send automated case studies'] 
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: 'white', backgroundColor: '#000', minHeight: '100vh' }}>
      <h2>AI Tool Lifecycle Dashboard</h2>
      
      <div style={{ border: '1px solid #333', borderRadius: '8px', padding: '20px', backgroundColor: '#111', marginBottom: '20px', minHeight: '260px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {toolState === 'idle' && (
          <p style={{ color: '#666', textAlign: 'center' }}>
            Type a query below to prompt the tool contract (e.g., "Score lead John Doe")
          </p>
        )}
        
        {toolState === 'input-streaming' && (
          <div style={{ padding: '15px', backgroundColor: '#2b1d00', borderRadius: '6px', border: '1px solid #ffaa00' }}>
            ? <b>1. State: Input Streaming</b>
            <p style={{ margin: '5px 0 0', color: '#ffcc66', fontSize: '14px' }}>AI tool schema matched. Model is actively parsing input query parameters...</p>
          </div>
        )}
        
        {toolState === 'input-available' && (
          <div style={{ padding: '15px', backgroundColor: '#001a33', borderRadius: '6px', border: '1px solid #00aaff' }}>
            ?? <b>2. State: Input Available</b>
            <p style={{ margin: '5px 0 0', color: '#99ccff', fontSize: '14px' }}>Schema validation passed: Target parameters locked in for John Doe (Acme Corp).</p>
          </div>
        )}
        
        {toolState === 'error' && (
          <div style={{ padding: '15px', backgroundColor: '#2d0000', borderRadius: '6px', border: '1px solid #ff4444' }}>
            ? <b>4. State: Output Error (Designed Failure)</b>
            <p style={{ margin: '5px 0 0', color: '#ff9999', fontSize: '14px' }}>Tool execution aborted: Validation criteria is out of target matrix parameters.</p>
          </div>
        )}
        
        {toolState === 'output-available' && toolData && (
          <div style={{ padding: '20px', backgroundColor: '#002411', borderRadius: '8px', border: '2px solid #00aa55' }}>
            <h3 style={{ margin: '0 0 12px', color: '#00ff77' }}>?? 3. State: Output Available (Custom Card Component)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <div style={{ padding: '12px', background: '#1a1a1a', borderRadius: '4px', border: '1px solid #333' }}>
                <b>Metric Score:</b> {toolData.score}/100
              </div>
              <div style={{ padding: '12px', background: '#1a1a1a', borderRadius: '4px', border: '1px solid #333' }}>
                <b>Probability:</b> <span style={{ color: '#00ff77', fontWeight: 'bold' }}>{toolData.conversionProbability}</span>
              </div>
            </div>
            <b>Action Recommendations:</b>
            <ul style={{ margin: '8px 0 0', paddingLeft: '20px', color: '#ccc', lineHeight: '1.6' }}>
              {toolData.recommendations.map((r: string, idx: number) => <li key={idx}>{r}</li>)}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (textInput.trim()) { const p = textInput; setTextInput(''); triggerToolLifecycle(p); } }} style={{ display: 'flex', gap: '10px' }}>
        <input 
          value={textInput} 
          onChange={(e) => setTextInput(e.target.value)} 
          placeholder='Try: "Score lead John Doe" or "Trigger a tool error"' 
          style={{ flex: 1, padding: '12px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} 
        />
        <button type='submit' style={{ padding: '0 24px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Run Tool
        </button>
      </form>
    </div>
  );
}
