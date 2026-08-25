'use client';
import { useState } from 'react';
export default function ChatPage() {
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const simulateStreaming = async (userPrompt: string) => {
    setIsLoading(true); setIsStopped(false);
    const userMsgId = Math.random().toString();
    const aiMsgId = Math.random().toString();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: userPrompt }]);
    setMessages(prev => [...prev, { id: aiMsgId, role: 'assistant', content: '' }]);
    const fullResponse = 'Hello! This is a simulated streaming response working token-by-token directly inside your chat application wrapper.';
    const words = fullResponse.split(' ');
    let currentText = '';
    for (let i = 0; i < words.length; i++) {
      if (window.chatStopSignal === true) { window.chatStopSignal = false; break; }
      currentText += words[i] + ' ';
      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: currentText } : m));
      await new Promise(r => setTimeout(r, 120));
    }
    setIsLoading(false);
  };
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>AI Streaming Assistant</h2>
      <div style={{ border: '1px solid #333', borderRadius: '8px', padding: '15px', height: '400px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.length === 0 && <div style={{ color: '#666' }}>Type a message below to start streaming...</div>}
        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', backgroundColor: m.role === 'user' ? '#0070f3' : '#222', color: 'white', padding: '10px 14px', borderRadius: '8px', maxWidth: '80%' }}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>{m.content}
          </div>
        ))}
        {isLoading && <div style={{ color: '#666' }}>Thinking...</div>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (textInput.trim() && !isLoading) { const p = textInput; setTextInput(''); simulateStreaming(p); } }} style={{ display: 'flex', gap: '10px' }}>
        <input value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder='Type a message...' style={{ flex: 1, padding: '12px', background: '#111', color: 'white', border: '1px solid #444', borderRadius: '6px' }} />
        <button type='submit' style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Send</button>
        {isLoading && <button type='button' onClick={() => { window.chatStopSignal = true; setIsLoading(false); }} style={{ padding: '10px 20px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Stop</button>}
      </form>
    </div>
  );
}