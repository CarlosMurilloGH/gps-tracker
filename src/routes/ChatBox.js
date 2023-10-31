import React, { useState, useEffect } from 'react';
import { db } from '../firebase/fb'; // Adjust path accordingly
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import './ChatBox.css';

function ChatBox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesCollection = collection(db, 'messages');
    const q = query(messagesCollection, orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // Cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [db]);

  useEffect(() => {
    const chatBox = document.getElementById('chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="msgcontainer">
    {messages.map((msg) => (
      <div key={msg.id} style={{ marginBottom: '10px', }}>
        <strong>{msg.username}: </strong>{msg.text}
      </div>
    ))}
  </div>
  );
}

export default ChatBox;
