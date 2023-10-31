import React, { useState } from 'react';
import { db } from '../firebase/fb'; // Adjust path accordingly
import { collection, addDoc } from 'firebase/firestore';
import './ChatInput.css';

function ChatInput({ username }) {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          username,
          timestamp: new Date(),
        });
        setMessage('');
      } catch (e) {
        console.error('Error sending message: ', e);
      }
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Escribe tu mensaje"
      />
      <button type="submit" className='buttongoogle'>Enviar</button>
    </form>
  );
}

export default ChatInput;
