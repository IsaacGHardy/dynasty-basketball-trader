import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerCardComponent } from '../player-card/player-card.component';

@Component({
  selector: 'app-player-lookup',
  standalone: true,
  imports: [CommonModule, PlayerSearchComponent, PlayerCardComponent],
  template: `
    <ng-container *ngIf="!selectedPlayer; else card">
      <app-player-search (playerSelected)="onPlayerSelected($event)"></app-player-search>
    </ng-container>
    <ng-template #card>
      <app-player-card [player]="selectedPlayer"></app-player-card>
    </ng-template>
  `
})
export class PlayerLookupComponent {
  selectedPlayer: Player | null = null;
  onPlayerSelected(player: Player) {
    this.selectedPlayer = player;
  }
}
