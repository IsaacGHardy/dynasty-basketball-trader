import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { Asset } from '../../../models/asset';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { isPlayer, isPick } from '../../../services/player.service';

@Component({
  selector: 'app-player-lookup',
  standalone: true,
  imports: [CommonModule, PlayerSearchComponent, PlayerCardComponent, PickCardComponent],
  template: `
    <ng-container *ngIf="!selectedAsset; else card">
      <app-player-search (playerSelected)="onAssetSelected($event)"></app-player-search>
    </ng-container>
    <ng-template #card>
      <app-player-card 
        *ngIf="isPlayer(selectedAsset)" 
        [player]="selectedAsset">
      </app-player-card>
      <app-pick-card 
        *ngIf="isPick(selectedAsset)" 
        [pick]="selectedAsset">
      </app-pick-card>
    </ng-template>
  `
})
export class PlayerLookupComponent {
  selectedAsset: Asset | null = null;
  
  // Make type guards available to template
  isPlayer = isPlayer;
  isPick = isPick;

  onAssetSelected(asset: Asset) {
    this.selectedAsset = asset;
  }
}
