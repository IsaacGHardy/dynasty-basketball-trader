import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { TradeEvaluationComponent } from '../trade-evaluation/trade-evaluation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, PlayerSearchComponent, PlayerCardComponent, TradeEvaluationComponent, MatButtonToggleModule, FormsModule],
  styleUrls: ['./trade.component.css'],
  template: `
    <div class="trade-container">
      <div class="team-section">
        <div class="team-header">
          <span class="team-label">Team 1</span>
          <mat-button-toggle-group class="team-toggle" [(ngModel)]="team1Mode" name="team1Mode" appearance="legacy">
            <mat-button-toggle value="contender">Contender</mat-button-toggle>
            <mat-button-toggle value="rebuilder">Rebuilder</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <ng-container *ngFor="let player of team1Players; let i = index">
          <app-player-card [player]="player" [removable]="true" (remove)="removePlayerFromTeam(1, i)" [mode]="team1Mode" class="trade-player-card"></app-player-card>
        </ng-container>
        <app-player-search (playerSelected)="addPlayerToTeam(1, $event)"></app-player-search>
      </div>
      <app-trade-evaluation [team1Players]="team1Players" [team2Players]="team2Players" [team1Mode]="team1Mode" [team2Mode]="team2Mode"></app-trade-evaluation>
      <div class="team-section">
        <div class="team-header">
          <span class="team-label">Team 2</span>
          <mat-button-toggle-group class="team-toggle" [(ngModel)]="team2Mode" name="team2Mode" appearance="legacy">
            <mat-button-toggle value="contender">Contender</mat-button-toggle>
            <mat-button-toggle value="rebuilder">Rebuilder</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
        <ng-container *ngFor="let player of team2Players; let i = index">
          <app-player-card [player]="player" [removable]="true" (remove)="removePlayerFromTeam(2, i)" [mode]="team2Mode" class="trade-player-card"></app-player-card>
        </ng-container>
        <app-player-search (playerSelected)="addPlayerToTeam(2, $event)"></app-player-search>
      </div>
    </div>
  `
})
export class TradeComponent {
  team1Players: Player[] = [];
  team2Players: Player[] = [];

  team1Mode: 'contender' | 'rebuilder' = 'contender';
  team2Mode: 'contender' | 'rebuilder' = 'contender';

  addPlayerToTeam(team: 1 | 2, player: Player) {
    if (team === 1) {
      this.team1Players.push(player);
    } else {
      this.team2Players.push(player);
    }
  }

  removePlayerFromTeam(team: 1 | 2, index: number) {
    if (team === 1) {
      this.team1Players.splice(index, 1);
    } else {
      this.team2Players.splice(index, 1);
    }
  }
}
