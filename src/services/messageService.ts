import { Repository } from 'typeorm';
import { AppDataSource } from '../db/data-source'; // Adjust the import path as needed
import { Message } from '../models/messages';
import { DirectMessage } from '../models/dm'; // Adjust path if necessary

export class MessageService {
  private messageRepository: Repository<Message>;
  private directMessageRepository: Repository<DirectMessage>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(Message);
    this.directMessageRepository = AppDataSource.getRepository(DirectMessage);
  }

  // Method to create or get a direct message
  async startDirectMessage(userAId: number, userBId: number): Promise<number> {
    let directMessage = await this.directMessageRepository.findOne({
      where: [
        { user1: { id: userAId }, user2: { id: userBId } },
        { user1: { id: userBId }, user2: { id: userAId } }
      ]
    });

    if (!directMessage) {
      directMessage = this.directMessageRepository.create({
        user1: { id: userAId },
        user2: { id: userBId },
      });
      await this.directMessageRepository.save(directMessage);
    }

    return directMessage.id;
  }

  // Method to create a message
  async create(content: string, senderId: number, recipientId: number, roomId: string): Promise<Message> {
    console.log("Creating message for Direct Message ID:");

    const directMessage = await this.directMessageRepository.findOne({ where: { roomId } });

    if (!directMessage) {
      throw new Error(`Direct message with ID ${roomId} does not exist.`);
    }

    const newMessage = this.messageRepository.create({ content, sender: { id: senderId }, directMessage });
    return await this.messageRepository.save(newMessage);
  }

  // Method to handle sending a message
  async sendMessage(content: string, senderId: number, recipientId: number): Promise<any> {
    // Get or create the direct message
    const directMessageId = await this.startDirectMessage(senderId, recipientId);
    console.log("Direct message ID:", directMessageId);

    // Create and save the new message
    return directMessageId
  }

  async getByUserId(userId: number): Promise<Message[]> {
    const directMessages = await this.directMessageRepository.find({ where: [{ user1: { id: userId } }, { user2: { id: userId } }] });
    const messages = [];
    for (const dm of directMessages) {
      const dmMessages = await this.messageRepository.find({ where: { directMessage: { id: dm.id } } });
      messages.push(...dmMessages);
    }
    return messages;
  }

  async createDM(user1Id: number, user2Id: number): Promise<void> {
    const roomId = [user1Id, user2Id].sort().join('_'); // Generate the roomId by sorting user IDs
    const newDM = this.directMessageRepository.create({ roomId, user1: { id: user1Id }, user2: { id: user2Id } });
    await this.directMessageRepository.save(newDM);
  }

  async getByDirectMessageId(directMessageId: number): Promise<Message[]> {
    return await this.messageRepository.find({ where: { directMessage: { id: directMessageId } } });
  }
}
