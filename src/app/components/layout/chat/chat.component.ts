// src/app/components/layout/chat/chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  user: string;
  message: string;
  date: string;
  filePath?: string;  // Ruta al archivo en el servidor
  fileName?: string;  // Nombre del archivo
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public newMessage: string = '';
  public messages: ChatMessage[] = [];
  private userName: string = '';
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5002'); // Conectar al servidor de Socket.IO
  }

  ngOnInit(): void {
    this.requestNotificationPermission();
    this.getUserName();
    this.initSocketEventListeners();
    this.socket.emit('newUser', { user: this.userName });
  }
  
  requestNotificationPermission(): void {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permiso para notificaciones concedido.');
        } else {
          console.warn('Permiso para notificaciones denegado.');
        }
      });
    }
  }

  getUserName(): void {
    this.userName = localStorage.getItem('username') || '';
    if (!this.userName) {
      this.userName = prompt("Ingrese su nombre de usuario:") || 'Invitado';
      localStorage.setItem('username', this.userName);
    }
    document.getElementById('user')!.innerText = this.userName;
  }

  initSocketEventListeners(): void {
    this.socket.on('message', (msg: string) => {
      console.log(msg);
    });
  
    this.socket.on('newMessage', (data: ChatMessage) => {
      console.log(`Mensaje recibido de ${data.user}: ${data.message}`);
      this.messages.push(data);
      this.updateMessages();
    });
  
    this.socket.on('fileMessage', (data: ChatMessage) => {
      console.log(`Archivo recibido de ${data.user}: ${data.fileName}`);
      this.messages.push(data);
      this.updateMessages();
      this.showFileNotification(data); // Mostrar la notificación al recibir un archivo
    });
  
    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });
  }
  
  /**
   * Mostrar una notificación de archivo recibido
   * @param data Información del archivo recibido
   */
  showFileNotification(data: ChatMessage): void {
    if (Notification.permission === "granted") {
      const notification = new Notification("Nuevo archivo recibido", {
        body: `Archivo de ${data.user}: ${data.fileName}`,
        icon: "/assets/file-icon.png" // Cambia este icono por uno adecuado
      });
  
      notification.onclick = () => {
        window.open(data.filePath, '_blank'); // Descargar el archivo al hacer clic en la notificación
      };
    } else {
      console.warn("Permiso para notificaciones no otorgado.");
    }
  }

  sendMessage(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    console.log('Enviando mensaje:', this.newMessage); // Verificar que se envía el mensaje
    if (this.newMessage.trim()) {
      this.socket.emit('newMessage', { user: this.userName, message: this.newMessage });
      this.newMessage = '';
    } else {
      console.warn('No se pudo enviar el mensaje: El mensaje está vacío.');
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      fetch('http://localhost:5002/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.path) {
            console.log('Archivo subido exitosamente:', data.filename);
            // Emitir un evento de archivo al servidor
            this.socket.emit('fileMessage', { path: data.path, filename: data.filename });
            // Añadir el archivo como un mensaje en el cliente
            this.messages.push({
              user: this.userName,
              message: 'Archivo añadido.',
              date: new Date().toLocaleString(),
              filePath: data.path,
              fileName: data.filename
            });
            this.updateMessages();
          }
        })
        .catch(error => console.error('Error al cargar el archivo:', error));
    }
  }

  updateMessages(): void {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = '';
      this.messages.forEach((msg) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${msg.user}</strong> <small>${msg.date}</small><br>${msg.message}`;
        
        if (msg.filePath) {
          const a = document.createElement('a');
          a.href = msg.filePath;
          a.innerText = `Descargar archivo: ${msg.fileName}`;
          a.target = '_blank';
          p.appendChild(document.createElement('br'));
          p.appendChild(a);
        }
  
        messagesContainer.appendChild(p);
      });
    }
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}