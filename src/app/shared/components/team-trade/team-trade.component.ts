import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { ContenderStatusSelectorComponent } from '../contender-status-selector/contender-status-selector.component';
import { Asset } from '../../../models/asset';
import { isPlayer, isPick } from '../../../services/player.service';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-team-trade',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, PlayerCardComponent, PickCardComponent, PlayerSearchComponent, ContenderStatusSelectorComponent],
  templateUrl: './team-trade.component.html',
  styleUrls: ['./team-trade.component.css']
})
export class TeamTradeComponent {
  @Input() teamName: string = '';
  @Input() assets: Asset[] = [];
  @Input() mode: ContenderStatus = ContenderStatus.NEUTRAL;
  
  @Output() assetAdded = new EventEmitter<Asset>();
  @Output() assetRemoved = new EventEmitter<number>();
  @Output() modeChanged = new EventEmitter<ContenderStatus>();

  // Expose utility functions to template
  isPlayer = isPlayer;
  isPick = isPick;

  // Expose enum to template
  ContenderStatus = ContenderStatus;

  onAssetSelected(asset: Asset) {
    this.assetAdded.emit(asset);
  }

  onAssetRemoved(index: number) {
    this.assetRemoved.emit(index);
  }

  onModeChange(newMode: ContenderStatus) {
    this.mode = newMode;
    this.modeChanged.emit(newMode);
  }
}
