import React, { useState, useEffect, useRef } from 'react';

const WS_URL = 'ws://localhost:8000/ws/1'; // For demo, room 1

const MysteryChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new window.WebSocket(WS_URL);
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };
    return () => ws.current.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws.current) {
      ws.current.send(JSON.stringify({ content: input, revealed }));
      setInput('');
    }
  };

  const handleReveal = () => {
    setRevealed(true);
    ws.current.send(JSON.stringify({ reveal: true }));
  };

  return (
    <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 4px 24px rgba(33,155,243,0.15)', maxWidth: 400, width: '100%', padding: 24, display: 'flex', flexDirection: 'column', minHeight: 500 }}>
      <h2 style={{ background: 'linear-gradient(90deg, #2196f3, #21CBF3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', textAlign: 'center' }}>Mystery Chat</h2>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16, marginTop: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8, textAlign: msg.revealed ? 'right' : 'left' }}>
            <span style={{ fontWeight: msg.revealed ? 'bold' : 'normal', color: msg.revealed ? '#2196f3' : '#333' }}>
              {msg.revealed ? msg.name || 'You' : 'Anonymous'}:
            </span> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, borderRadius: 8, border: '1px solid #21CBF3', padding: 8 }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={{ borderRadius: 8, background: 'linear-gradient(90deg, #2196f3, #21CBF3)', color: 'white', fontWeight: 'bold', border: 'none', padding: '0 16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
          Send
        </button>
      </div>
      <button onClick={handleReveal} style={{ marginTop: 16, borderRadius: 8, background: '#f3f3f3', color: '#2196f3', fontWeight: 'bold', border: 'none', padding: '8px 16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
        Reveal Name
      </button>
    </div>
  );
};

export default MysteryChat;
