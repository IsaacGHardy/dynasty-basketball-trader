
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { ScoringService } from '../../../services/scoring.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatIconModule, RouterModule, TitleCasePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  scoringOptions = ['sleeper', 'espn'];
  constructor(public scoringService: ScoringService) {}
  onScoringChange(scoring: string) {
    this.scoringService.setScoring(scoring as 'sleeper' | 'espn');
  }
}
