import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { Asset } from '../../../models/asset';
import { isPlayer, isPick } from '../../../services/player.service';

@Component({
  selector: 'app-team-trade',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonToggleModule, MatTooltipModule, PlayerCardComponent, PickCardComponent, PlayerSearchComponent],
  templateUrl: './team-trade.component.html',
  styleUrls: ['./team-trade.component.css']
})
export class TeamTradeComponent {
  @Input() teamName: string = '';
  @Input() assets: Asset[] = [];
  @Input() mode: 'contender' | 'rebuilder' = 'rebuilder';
  
  @Output() assetAdded = new EventEmitter<Asset>();
  @Output() assetRemoved = new EventEmitter<number>();
  @Output() modeChanged = new EventEmitter<'contender' | 'rebuilder'>();

  // Expose utility functions to template
  isPlayer = isPlayer;
  isPick = isPick;

  onAssetSelected(asset: Asset) {
    this.assetAdded.emit(asset);
  }

  onAssetRemoved(index: number) {
    this.assetRemoved.emit(index);
  }

  onModeChange(newMode: 'contender' | 'rebuilder') {
    this.mode = newMode;
    this.modeChanged.emit(newMode);
  }
}
