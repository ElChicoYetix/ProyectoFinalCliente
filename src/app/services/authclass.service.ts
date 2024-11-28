import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthclassService {
  private API_KEY = '3';
  private BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Obtener todos los equipos
   */
  getAllTeams(): Observable<any[]> {
    const url = `${this.BASE_URL}/${this.API_KEY}/search_all_teams.php?l=NFL`;
    return this.http.get<any>(url).pipe(
      map(response => response.teams || []),
      catchError(error => {
        console.error('Error al obtener equipos:', error);
        throw error;
      })
    );
  }

  /**
   * Obtener jugadores por equipo
   * @param teamId ID del equipo
   */
  getPlayersByTeam(teamId: string): Observable<{ name: string; image: string; position: string }[]> {
    const url = `${this.BASE_URL}/${this.API_KEY}/lookup_all_players.php?id=${teamId}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        return (response.player || []).map((player: any) => ({
          name: player.strPlayer, // Nombre del jugador
          image: player.strThumb || 'https://via.placeholder.com/150', // Imagen del jugador (placeholder si no hay imagen)
          position: player.strPosition || 'Unknown' // Posición del jugador
        }));
      }),
      catchError(error => {
        console.error(`Error al obtener jugadores para el equipo ${teamId}:`, error);
        throw error;
      })
    );
  }

  isLoggedIn() {
    return true;
  }
}