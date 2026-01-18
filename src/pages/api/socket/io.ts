import { NextApiResponseServerIo } from '@/lib/types';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { NextApiRequest } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  // Check if socket server is available
  if (!res.socket?.server) {
    res.status(500).json({ error: 'Socket server not available' });
    return;
  }

  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: NetServer = res.socket.server as any;
    
    try {
      const io = new ServerIO(httpServer, {
        path,
        addTrailingSlash: false,
        transports: ['websocket', 'polling'],
      });
      
      io.on('connection', (s) => {
        s.on('create-room', (fileId) => {
          s.join(fileId);
        });
        s.on('send-changes', (deltas, fileId) => {
          console.log('CHANGE');
          s.to(fileId).emit('receive-changes', deltas, fileId);
        });
        s.on('send-cursor-move', (range, fileId, cursorId) => {
          s.to(fileId).emit('receive-cursor-move', range, fileId, cursorId);
        });
      });
      
      res.socket.server.io = io;
    } catch (error) {
      console.error('Error initializing Socket.IO:', error);
      res.status(500).json({ error: 'Failed to initialize Socket.IO' });
      return;
    }
  }
  res.end();
};

export default ioHandler;
