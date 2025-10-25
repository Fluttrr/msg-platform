import React from 'react';
import Sidebar from './nav/Sidebar'
import Chat from './chat/Chat'
import { AppProvider } from './contexts/AppContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

function App() {
  return (
    <div className="flex max-h-screen w-screen h-screen m-0">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App