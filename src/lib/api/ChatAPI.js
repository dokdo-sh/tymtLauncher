// This code was the beginning of the API for the end-to-end encryption messaging.

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ChatModule } from './chat/chat.module';
// import { UserModule } from './user/user.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(),
//     ChatModule,
//     UserModule,
//   ],
// })
// export class AppModule {}

// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { UserService } from './user.service';
// import { User } from './user.entity';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   async getUsers(): Promise<User[]> {
//     return this.userService.getUsers();
//   }

//   @Post()
//   async createUser(@Body() user: User): Promise<void> {
//     return this.userService.createUser(user);
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async getUsers(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   async createUser(user: User): Promise

//   <void> {
//     this.userRepository.save(user);
//     }
//     }
    
//     import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
    
//     @Entity()
//     export class User {
//     @PrimaryGeneratedColumn()
//     id: number;
    
//     @Column()
//     username: string;
    
//     @Column()
//     password: string;
//     }
    
//     import { Module } from '@nestjs/common';
//     import { TypeOrmModule } from '@nestjs/typeorm';
//     import { UserModule } from '../user/user.module';
//     import { ChatController } from './chat.controller';
//     import { ChatService } from './chat.service';
//     import { Chat } from './chat.entity';
    
//     @Module({
//     imports: [TypeOrmModule.forFeature([Chat]), UserModule],
//     controllers: [ChatController],
//     providers: [ChatService],
//     })
//     export class ChatModule {}
    
//     import { Controller, Get, Post, Body } from '@nestjs/common';
//     import { ChatService } from './chat.service';
//     import { Chat } from './chat.entity';
    
//     @Controller('chat')
//     export class ChatController {
//     constructor(private readonly chatService: ChatService) {}
    
//     @Get()
//     async getChats(): Promise<Chat[]> {
//     return this.chatService.getChats();
//     }
    
//     @Post()
//     async sendMessage(@Body() chat: Chat): Promise<void> {
//     return this.chatService.sendMessage(chat);
//     }
//     }
    
//     import { Injectable } from '@nestjs/common';
//     import { InjectRepository } from '@nestjs/typeorm';
//     import { Repository } from 'typeorm';
//     import { Chat } from './chat.entity';
//     import * as crypto from 'crypto';

//     @Injectable()
// export class ChatService {
// constructor(
// @InjectRepository(Chat)
// private readonly chatRepository: Repository<Chat>,
// ) {}

// async getChats(): Promise<Chat[]> {
// return this.chatRepository.find();
// }

// async sendMessage(chat: Chat): Promise<void> {
// // Encrypt the message using OpenSSL
// const cipher = crypto.createCipher('aes192', 'secretkey');
// let encrypted = cipher.update(chat.message, 'utf8', 'hex');
// encrypted += cipher.final('hex');

// // Set the encrypted message on the chat object
// chat.message = encrypted;

// // Save the chat message to the database
// this.chatRepository.save(chat);

// }
// }

// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { User } from '../user/user.entity';

// @Entity()
// export class Chat {
// @PrimaryGeneratedColumn()
// id: number;

// @Column()
// message: string;

// @ManyToOne(type => User, user => user.chats)
// user: User;
// }