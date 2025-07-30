import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScoringService {
  private scoringSubject = new BehaviorSubject<'sleeper' | 'espn'>('sleeper');
  scoring$ = this.scoringSubject.asObservable();

  setScoring(scoring: 'sleeper' | 'espn') {
    this.scoringSubject.next(scoring);
  }

  getScoring() {
    return this.scoringSubject.value;
  }
}
