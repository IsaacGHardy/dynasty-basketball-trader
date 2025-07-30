
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export interface ApiPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  pts: number;
  rebs: number;
  ast: number;
  blk: number;
  stl: number;
  tov: number;
  fg3m: number;
  fgm: number;
  fga: number;
  ftm: number;
  fta: number;
  fantasy_pts: number;
  contend_value: number;
  rebuild_value: number;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private apiUrl = 'http://127.0.0.1:8000/players?scoring=sleeper';
  private players$?: Observable<ApiPlayer[]>;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<ApiPlayer[]> {
    if (!this.players$) {
      this.players$ = this.http.get<ApiPlayer[]>(this.apiUrl).pipe(shareReplay(1));
    }
    return this.players$;
  }
}
