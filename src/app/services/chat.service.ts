// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket | null = null;
  private socketUrl = 'http://localhost:5002';

  connect(): void {
    if (!this.socket) {
      this.socket = io(this.socketUrl);
      this.socket.on('connect', () => {
        console.log('Conectado al servidor de Socket.IO');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Error de conexión:', error);
      });
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit('newMessage', { user: 'Usuario', message });
      console.log('Mensaje enviado al servidor:', message);
    } else {
      console.warn('No se pudo enviar el mensaje: WebSocket no conectado.');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Conexión de Socket.IO cerrada');
    }
  }
}