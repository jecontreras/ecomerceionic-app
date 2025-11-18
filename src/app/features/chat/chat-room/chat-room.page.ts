import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonFooter,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';

import { NgFor, NgIf } from '@angular/common';
import { ChatService } from 'src/app/core/services/chat';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonFooter,
    IonBackButton,
    IonButtons,
    FormsModule,      // 👈 NECESARIO para ngModel
    IonicModule,       // 👈 NECESARIO para ion-input, ion-button, ion-content, etc.
    NgFor,
    NgIf
  ]
})
export class ChatRoomPage implements OnInit, OnDestroy {
  roomId!: number;
  messages: any[] = [];
  message = '';

  newMessageSub: any;
  readSub: any;

  constructor(
    private route: ActivatedRoute,
    private chat: ChatService
  ) {}

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));

    // Unirse al room
    this.chat.joinRoom(this.roomId);

    // Cargar mensajes
    this.chat.getMessages(this.roomId).subscribe((msgs: any) => {
      this.messages = msgs;
    });

    // Escuchar nuevos mensajes
    this.newMessageSub = this.chat.onNewMessage().subscribe((msg: any) => {
      if (msg.room === this.roomId || msg.roomId === this.roomId) {
        this.messages.push(msg);
      }
    });

    // Escuchar mensajes leídos
    this.readSub = this.chat.onMessagesRead().subscribe((data) => {
      if (data.roomId === this.roomId) {
        this.messages = this.messages.map((m) => ({
          ...m,
          isRead: true
        }));
      }
    });

    // marcar como leídos
    this.chat.markAsRead(this.roomId).subscribe();
  }

  send() {
    if (!this.message.trim()) return;

    this.chat.sendMessage(this.roomId, this.message).subscribe((msg) => {
      this.messages.push(msg);
      this.message = '';
    });
  }

  ngOnDestroy() {
    this.newMessageSub?.unsubscribe();
    this.readSub?.unsubscribe();
  }
}
