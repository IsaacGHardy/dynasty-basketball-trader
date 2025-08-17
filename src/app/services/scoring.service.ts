/*
 * Dynasty Basketball Trader - Scoring Service
 * Copyright (c) 2025 Isaac Hardy
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

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
