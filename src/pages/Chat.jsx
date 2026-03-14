import React, { useState, useRef, useEffect } from 'react';
import { CHATS, CHAT_MESSAGES } from '../data/mockData';

const AUTO_REPLIES = [
  'Got it, thanks! 👍','Sure, on it!','Will check and get back shortly.',
  'Sounds good!','Let me look into that.','Great, thanks for the update!',
  'Noted! Will follow up.','Perfect, will do! 🙌'
];

export default function Chat() {
  const [chats]           = useState(() => CHATS.map(c => ({ ...c })));
  const [messages, setMessages] = useState(() => CHAT_MESSAGES.map(arr => [...arr]));
  const [active, setActive]     = useState(0);
  const [input, setInput]       = useState('');
  const [chatList, setChatList] = useState(chats);
  const msgRef = useRef(null);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages, active]);

  const send = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    const now = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });

    // Add my message
    setMessages(prev => {
      const updated = prev.map((arr, i) => i === active ? [...arr, { init:'JD', color:'#3b82f6', text, time:now, mine:true }] : arr);
      return updated;
    });
    setChatList(prev => prev.map((c, i) => i === active ? { ...c, msg: text, time: now } : c));

    // Auto reply after 1.5s
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const t2 = new Date().toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' });
      setMessages(prev => {
        const chat = chats[active];
        return prev.map((arr, i) => i === active
          ? [...arr, { init: chat.init, color: chat.color, text: reply, time: t2, mine: false }]
          : arr
        );
      });
      setChatList(prev => prev.map((c, i) => i === active ? { ...c, msg: reply, time: t2 } : c));
    }, 1500);
  };

  const activeChat = chats[active];

  return (
    <div style={{ padding:'22px 24px 0' }}>
      <div className="pg-name" style={{ marginBottom:20 }}>Chat</div>

      <div className="chat-layout">
        {/* Chat List */}
        <div className="chat-sidebar">
          <div style={{ padding:'14px 16px 10px', borderBottom:'1px solid var(--border)' }}>
            <input className="form-inp" placeholder="🔍 Search conversations..." style={{ margin:0 }} />
          </div>
          <div id="chatList">
            {chatList.map((c, i) => (
              <div
                key={i}
                className={'chat-item' + (i === active ? ' active' : '')}
                onClick={() => setActive(i)}
              >
                <div className="ch-av-wrap">
                  <div className="ch-av" style={{ background: c.color }}>{c.init}</div>
                  {c.online && <div className="online-dot" />}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="ch-name">{c.name}</div>
                  <div className="ch-msg">{c.msg}</div>
                </div>
                <div className="ch-meta">
                  <span className="ch-time">{c.time}</span>
                  {c.unread > 0 && <span className="ch-badge">{c.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {/* Header */}
          <div className="chat-hdr">
            <div className="ch-av" style={{ background: activeChat.color }}>{activeChat.init}</div>
            <div>
              <div className="chat-hdr-name">{activeChat.name}</div>
              <div className="chat-hdr-status" style={{ color: activeChat.online ? 'var(--green)' : 'var(--muted)' }}>
                {activeChat.online ? '● Online' : '○ Away'}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div id="chatMessages" ref={msgRef} className="chat-messages">
            {messages[active].map((m, i) => (
              <div key={i} className={'msg-row' + (m.mine ? ' mine' : '')}>
                <div className="msg-av" style={{ background: m.color }}>{m.init}</div>
                <div className="msg-bubble">{m.text}</div>
                <span className="msg-time">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-inp-row">
            <input
              id="msgInput"
              className="form-inp chat-inp"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="send-btn" onClick={send}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}