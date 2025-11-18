import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ApiService } from './api';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: Socket;

  constructor(private api: ApiService) {}

  // conectar el socket cuando el usuario inicia sesión
  initSocket(token: string) {
    this.socket = io(this.api.baseUrl, {
      auth: {
        token
      }
    });
  }

  // unir al usuario a una sala
  joinRoom(roomId: number) {
    this.socket.emit('join', `room-${roomId}`);
  }

  // escuchar nuevos mensajes
  onNewMessage(): Observable<any> {
    return new Observable((obs) => {
      this.socket.on('newMessage', (msg) => {
        obs.next(msg);
      });
    });
  }

  // escuchar mensajes leídos
  onMessagesRead(): Observable<any> {
    return new Observable((obs) => {
      this.socket.on('messagesRead', (data) => {
        obs.next(data);
      });
    });
  }

  // obtener las salas
  getMyRooms() {
    return this.api.get('/chat/myRooms');
  }

  // obtener mensajes de una sala
  getMessages(roomId: number) {
    return this.api.get(`/chat/messages/${roomId}`);
  }

  // enviar un mensaje
  sendMessage(roomId: number, message: string, attachments: any[] = []) {
    return this.api.post('/chat/send', { 
      roomId,
      message,
      attachments 
    });
  }

  // marcar los mensajes como leídos
  markAsRead(roomId: number) {
    return this.api.post(`/chat/read/${roomId}`, {});
  }
}
