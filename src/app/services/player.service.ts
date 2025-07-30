
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { ScoringService } from './scoring.service';

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
  private baseUrl = 'http://127.0.0.1:8000/players';


  playerData$: Observable<ApiPlayer[]>;

  constructor(private http: HttpClient, private scoringService: ScoringService) {
    this.playerData$ = this.scoringService.scoring$.pipe(
      switchMap(scoring => this.http.get<ApiPlayer[]>(`${this.baseUrl}?scoring=${scoring}`)),
      shareReplay(1)
    );
  }

  // Optionally, keep a method for one-off fetches
  getPlayers(scoring: 'sleeper' | 'espn'): Observable<ApiPlayer[]> {
    return this.http.get<ApiPlayer[]>(`${this.baseUrl}?scoring=${scoring}`);
  }
}
