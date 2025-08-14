
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { ScoringService } from './scoring.service';
import { Asset } from '../models/asset';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private baseUrl = 'http://127.0.0.1:8000/players';

  playerData$: Observable<Asset[]>;

  constructor(private http: HttpClient, private scoringService: ScoringService) {
    this.playerData$ = this.scoringService.scoring$.pipe(
      switchMap(scoring => this.http.get<Asset[]>(`${this.baseUrl}?scoring=${scoring}`)),
      shareReplay(1)
    );
  }

  // Optionally, keep a method for one-off fetches
  getPlayers(scoring: 'sleeper' | 'espn'): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.baseUrl}?scoring=${scoring}`);
  }
}

// Type guards for Asset
import { Player } from '../models/player';
import { Pick as DraftPick } from '../models/pick';

export function isPlayer(asset: Asset): asset is Player {
  return asset.type === 'player';
}

export function isPick(asset: Asset): asset is DraftPick {
  return asset.type === 'pick';
}
