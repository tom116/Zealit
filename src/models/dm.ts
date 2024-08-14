// src/entity/DirectMessage.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    Column,
    JoinTable,
  } from 'typeorm';
  import { User } from './user';
  import { Message } from './messages';
  
  @Entity()
  export class DirectMessage {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    roomId!: string

    @ManyToOne(() => User)
    user1!: User;
  
    @ManyToOne(() => User)
    user2!: User;
  
    @OneToMany(() => Message, (message) => message.directMessage, { cascade: true })
    @JoinTable()
    messages!: Message[];
  }