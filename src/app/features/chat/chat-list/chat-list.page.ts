import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { NgFor, DatePipe } from '@angular/common';
import { ChatService } from 'src/app/core/services/chat';

@Component({
  standalone: true,
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    NgFor,
    DatePipe,
  ],
})
export class ChatListPage implements OnInit {
  rooms: any[] = [];

  constructor(
    private chat: ChatService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.chat.getMyRooms().subscribe((rooms: any) => {
      this.rooms = rooms;
    });
  }

  openRoom(roomId: number) {
    this.router.navigate(['/chat/room', roomId]);
  }
}
