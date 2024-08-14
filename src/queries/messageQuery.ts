import { AppDataSource } from "../db/data-source";
import { DirectMessage } from "../models/dm";
import { MessageService } from "../services/messageService";

export const startDirectMessage = async (userAId:number, userBId:number) => {
    const directMessageRepository = AppDataSource.getRepository(DirectMessage);
    let directMessage = await directMessageRepository.findOne({
        where: [
            { user1: { id: userAId }, user2: { id: userBId } },
            { user1: { id: userBId }, user2: { id: userAId } }
        ]
    });

    if (!directMessage) {
        directMessage = directMessageRepository.create({
            user1: { id: userAId },
            user2: { id: userBId },
        });
        await directMessageRepository.save(directMessage);
    }
    console.log("this is the direct message id", directMessage.id);
    return directMessage.id;

}
// export const sendMessage = async (content: string, senderId: number, recipientId: number) => {
//     const messageService = new MessageService();
//     const directMessageId = await startDirectMessage(senderId, recipientId);
//     console.log("this is the direct message id", directMessageId);
//     const message = await messageService.create(content, senderId, directMessageId);
//     return message;
// }