'use client';
import { useState } from 'react';

export default function ChatPage() {
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string }[]>([]);
  const [statusState, setStatusState] = useState<'idle' | 'loading' | 'streaming' | 'error'>('idle');
  const [retryPrompt, setRetryPrompt] = useState('');

  const triggerChatFlow = async (userPrompt: string) => {
    if (!userPrompt.trim()) return;
    
    setStatusState('loading');
    setRetryPrompt(userPrompt);
    const userMsgId = Math.random().toString();
    const aiMsgId = Math.random().toString();
    
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: userPrompt }]);

    const lower = userPrompt.toLowerCase();
    
    if (lower.includes('fail') || lower.includes('error')) {
      await new Promise(r => setTimeout(r, 1000));
      setStatusState('streaming');
      setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: 'Sure! I am starting to process your request and collecting data layers...' }]);
      await new Promise(r => setTimeout(r, 1200));
      setStatusState('error');
      return;
    }

    await new Promise(r => setTimeout(r, 1000));
    setStatusState('streaming');
    setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);
    
    const fullResponse = 'Your request has completed successfully on the primary flow network channel without dropping any frame packages!';
    const words = fullResponse.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: currentText } : m));
      await new Promise(r => setTimeout(r, 100));
    }
    setStatusState('idle');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: 'white', backgroundColor: '#000', minHeight: '100vh' }}>
      <h2>AI Fault-Tolerant Chat Dashboard</h2>
      
      <div style={{ border: '1px solid #333', borderRadius: '8px', padding: '20px', backgroundColor: '#111', marginBottom: '20px', minHeight: '350px', display: 'flex', flexDirection: 'column', gap: '15px', overflowY: 'auto' }}>
        
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', margin: 'auto 0', color: '#888' }}>
            <h3 style={{ color: '#fff', marginBottom: '5px' }}>Welcome to Capstone Workspace</h3>
            <p style={{ fontSize: '14px', margin: '0 0 15px' }}>Type a custom layout parameter or use one of the starter failure states below:</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button type="button" onClick={() => { setTextInput('Analyze database matrix patterns'); }} style={{ background: '#222', border: '1px solid #444', color: '#0070f3', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>?? Analyze Flow</button>
              <button type="button" onClick={() => { setTextInput('Simulate mid-stream failure error'); }} style={{ background: '#222', border: '1px solid #444', color: '#ff4444', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>?? Trigger Failure</button>
            </div>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.role === 'user' ? '#0070f3' : '#222', color: 'white', padding: '10px 14px', borderRadius: '8px', maxWidth: '80%' }}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>{m.content}
          </div>
        ))}

        {statusState === 'loading' && (
          <div style={{ alignSelf: 'flex-start', width: '70%', background: '#222', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ height: '14px', background: '#444', width: '40%', marginBottom: '10px', borderRadius: '4px' }} />
            <div style={{ height: '12px', background: '#333', width: '90%', borderRadius: '4px' }} />
          </div>
        )}

        {statusState === 'error' && (
          <div style={{ padding: '15px', backgroundColor: '#2d0000', borderRadius: '6px', border: '1px solid #ff4444', marginTop: '10px' }}>
            <b style={{ color: '#ff9999' }}>?? Mid-Stream Connection Terminated</b>
            <p style={{ margin: '5px 0 12px', color: '#ccc', fontSize: '14px' }}>The prompt streaming connection context wrapper threw a premature gateway execution failure.</p>
            <button type="button" onClick={() => triggerChatFlow(retryPrompt)} style={{ padding: '6px 14px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              ?? Retry Generation
            </button>
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (textInput.trim() && (statusState === 'idle' || statusState === 'error')) { const p = textInput; setTextInput(''); triggerChatFlow(p); } }} style={{ display: 'flex', gap: '10px' }}>
        <input value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder='Type here or click a starter state action link...' style={{ flex: 1, padding: '12px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} />
        <button type='submit' style={{ padding: '0 24px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
      </form>
    </div>
  );
}
