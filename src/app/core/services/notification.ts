// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private api: ApiService) {}

  getMyNotifications() {
    return this.api.get<any[]>('/notifications');
  }
}
