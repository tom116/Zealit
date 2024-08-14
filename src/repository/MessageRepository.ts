// src/repository/MessageRepository.ts

import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../models/messages';
import { DirectMessage } from '../models/dm';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}

// src/repository/DirectMessageRepository.ts

@EntityRepository(DirectMessage)
export class DirectMessageRepository extends Repository<DirectMessage> {
    static getInstance: any;
}