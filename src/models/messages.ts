// src/entity/Message.ts

// src/entity/Message.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { User } from './user';
  import { DirectMessage } from './dm';
  
  @Entity()
  export class Message {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    content!: string;
  
    @ManyToOne(() => User)
    sender!: User;
  
    @ManyToOne(() => DirectMessage, (directMessage) => directMessage.messages)
    directMessage!: DirectMessage;
  
    @CreateDateColumn()
    timestamp!: Date;
  }