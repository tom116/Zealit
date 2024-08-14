import { Server } from 'socket.io';
import { MessageService } from '../services/messageService';

export function dmSocket(io: Server, messageService: MessageService) {
    console.log("this is the message service");
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join_room', (roomId) => {
      console.log('join_room', roomId);
      socket.join(roomId);
    }
    );
    // Handle 'start_direct_message' event
    socket.on('start_direct_message', async (data) => {
      console.log("im kinda here")  
      const { userAId, userBId } = data;
      console.log("this is the data", data.userAId, data.userBId);
      // Generate a consistent room ID by sorting the user IDs
      const roomId = [userAId, userBId].sort().join('_');

      // Join both users to the room
      socket.join(roomId);

      // Emit 'direct_message_started' event with the room ID
      io.to(roomId).emit('direct_message_started', { roomId });

      // Optionally, store the room creation in your message service
      await messageService.createDM(userAId, userBId); 
    });

    // Handle 'send_message' event
    socket.on('send_message', async (data) => {
      const { content, senderId, recipientId } = data;
      console.log('send_message', data);
    
      // Generate the room ID
      const roomId = [senderId, recipientId].sort().join('_');
    
      try {
        // Use the message service to get or create the direct message
        const directMessageId = await messageService.startDirectMessage(senderId, recipientId);
        
        if (!directMessageId || isNaN(directMessageId)) {
          throw new Error(`Invalid Direct Message ID: ${directMessageId}`);
        }
    
        console.log('Direct Message ID:', directMessageId);
    
        // Create a new message
        await messageService.create(content, senderId, recipientId,roomId);
        
        // Emit 'new_message' event to the room with the message data
        io.to(roomId).emit('new_message', { content, senderId, recipientId });
    
      } catch (error:any) {
        console.error('Error sending message:', error.message);
        // Handle or notify the error as needed
      }
    });
}
)}
