// src/app/core/services/socket.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: Socket;

  constructor(private auth: AuthService) {}

  connect() {
    if (this.socket) return;
    const token = this.auth.getToken();
    this.socket = io(environment.socketUrl, {
      auth: { token },
    });
  }

  on(event: string, cb: (...args: any[]) => void) {
    this.socket?.on(event, cb);
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
