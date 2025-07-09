import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { TradeEvaluationComponent } from '../trade-evaluation/trade-evaluation.component';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, PlayerSearchComponent, PlayerCardComponent, TradeEvaluationComponent],
  styleUrls: ['./trade.component.css'],
  template: `
    <div class="trade-container">
      <div class="team-section">
        <div class="team-label">Team 1</div>
        <ng-container *ngFor="let player of team1Players; let i = index">
          <app-player-card [player]="player" [removable]="true" (remove)="removePlayerFromTeam(1, i)" class="trade-player-card"></app-player-card>
        </ng-container>
        <app-player-search (playerSelected)="addPlayerToTeam(1, $event)"></app-player-search>
      </div>
      <app-trade-evaluation [team1Players]="team1Players" [team2Players]="team2Players"></app-trade-evaluation>
      <div class="team-section">
        <div class="team-label">Team 2</div>
        <ng-container *ngFor="let player of team2Players; let i = index">
          <app-player-card [player]="player" [removable]="true" (remove)="removePlayerFromTeam(2, i)" class="trade-player-card"></app-player-card>
        </ng-container>
        <app-player-search (playerSelected)="addPlayerToTeam(2, $event)"></app-player-search>
      </div>
    </div>
  `
})
export class TradeComponent {
  team1Players: Player[] = [];
  team2Players: Player[] = [];

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
