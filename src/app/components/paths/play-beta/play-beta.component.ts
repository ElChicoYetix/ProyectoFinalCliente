import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthclassService } from '../../../services/authclass.service'

interface Player {
  name: string;
  position: string;
  image: string;
  points?: number;
}

@Component({
  selector: 'app-play-beta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-beta.component.html',
  styleUrls: ['./play-beta.component.scss']
})
export class PlayBetaComponent implements OnInit{
  players: Player[] = [];

  constructor(private authclassService: AuthclassService) {}

  ngOnInit(): void {
    const teamId = '133602';
    this.authclassService.getPlayersByTeam(teamId).subscribe({
      next: (data) => {
        this.players = data;
      },
      error: (error) => {
        console.error('Error al cargar jugadores:', error);
      }
    });
  }

  myTeam: Player[] = []; // Lista de "Mis Jugadores"

  // Método para agregar un jugador a "Mis Jugadores"
  addToMyTeam(player: Player): void {
    // Verifica si el jugador ya está en el equipo
    if (!this.myTeam.some(p => p.name === player.name)) {
      // Asigna puntos aleatorios al jugador si no los tiene
      if (!player.points) {
        player.points = Math.floor(Math.random() * 10) + 1;
      }
      this.myTeam.push(player);
    }
  }

  getTotalPoints(): number {
    return this.myTeam.reduce((total, player) => total + (player.points || 0), 0);
  }
  
  // Método para eliminar un jugador de "Mis Jugadores"
  removeFromMyTeam(player: Player): void {
    this.myTeam = this.myTeam.filter(p => p.name !== player.name);
  }

  // Método para guardar "Mis Jugadores" en un archivo JSON
saveMyTeam(): void {
  const dataStr = JSON.stringify(this.myTeam, null, 2); // Formatea el JSON para legibilidad
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'myTeam.json'; // Nombre del archivo
  a.click();

  window.URL.revokeObjectURL(url); // Libera el recurso
}

}