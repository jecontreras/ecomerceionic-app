import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonBadge,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { NgIf, NgFor, CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderService } from 'src/app/core/services/order';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { cube, checkmarkCircle, bus, refreshCircle, alertCircle } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonBadge,
    IonBackButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    NgIf,
    NgFor,
    CurrencyPipe,
  ],
})
export class OrderDetailPage implements OnInit {
  order?: Order;
  loading = false;

  statusOptions = [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'preparacion', label: 'En preparación' },
    { value: 'transito', label: 'En tránsito' },
    { value: 'entregado', label: 'Entregado' },
    { value: 'devuelto', label: 'Devuelto' },
  ];

  selectedStatus = '';
  trackingNumber = '';
  carrier = '';
  noteText = '';
  @ViewChild('noteModal') noteModal: any;
  noteVisible = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
      addIcons({
        cube,
        checkmarkCircle,
        bus,
        refreshCircle,
        alertCircle
      });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.load(id);
  }

  getStatusIcon(status: string) {
  switch (status) {
    case 'nuevo': return 'cube';
    case 'preparacion': return 'refresh-circle';
    case 'transito': return 'bus';
    case 'entregado': return 'checkmark-circle';
    case 'devuelto': return 'alert-circle';
    default: return 'cube';
  }
}

  load(id: number) {
    this.loading = true;

    this.orderService.getOrderDetail(id).subscribe({
      next: (res) => {
        this.order = res;
        if( this.order.statusHistory ){
          this.order.statusHistory = this.order.statusHistory.sort(
            (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        this.loading = false;

        // asignar valores reales
        this.selectedStatus = res.status;
        this.trackingNumber = res.trackingNumber || '';
        this.carrier = res.carrier || '';
      },
      error: () => {
        this.loading = false;
      },
    });
    
  }

  updateStatus() {
    if (!this.order) return;

    this.orderService
      .changeStatus(
        this.order.id,
        this.selectedStatus,
        this.trackingNumber || undefined,
        this.carrier || undefined
      )
      .subscribe({
        next: (updated: any) => {
          this.order = {
            ...this.order!,
            status: this.selectedStatus,
            trackingNumber: this.trackingNumber,
            carrier: this.carrier,
            statusHistory: updated.statusHistory || this.order?.statusHistory,
          };
          alert('Estado actualizado');
        },
        error: (err) => {
          console.error(err);
          alert('Error actualizando estado');
        },
      });
  }

  openChat() {
    if (!this.order) return;

    this.router.navigate(['/chat'], {
      queryParams: { orderId: this.order.id },
    });
  }

  openNoteModal() {
    this.noteText = '';
    this.noteModal.present();
  }

  closeNoteModal() {
    this.noteModal.dismiss();
  }
  saveNote() {
    if (!this.order || !this.noteText.trim()) return;

    this.orderService.addNote(this.order.id, {
      note: this.noteText,
      visibleToCustomer: this.noteVisible
    }).subscribe({
      next: (res:any) => {
        if( res.id ){
          this.order = res;
          this.noteText = '';
          this.noteVisible = true;
          this.closeNoteModal();
          alert('Nota agregada');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error guardando nota');
      }
    });
  }

  uploadAttachment(event: any) {
    const file = event.target.files[0];
    if (!file || !this.order) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('visibleToCustomer', 'true'); // o false

    this.orderService.uploadAttachment(this.order.id, formData).subscribe({
      next: (res) => {
        if( this.order){
          this.order.attachments = [...(this.order.attachments || []), res];
        }
        alert('Archivo subido');
      },
      error: () => alert('Error subiendo archivo'),
    });
  }



}
