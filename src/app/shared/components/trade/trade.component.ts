/*
 * Dynasty Basketball Trader - Trade Component
 * Copyright (c) 2025 Isaac Hardy
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ScoringService } from '../../../services/scoring.service';
import { PlayerService, isPlayer, isPick } from '../../../services/player.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { TeamTradeComponent } from '../team-trade/team-trade.component';
import { TradeEvaluationComponent } from '../trade-evaluation/trade-evaluation.component';
import { Asset } from '../../../models/asset';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, TeamTradeComponent, TradeEvaluationComponent],
  styleUrls: ['./trade.component.css'],
  templateUrl: './trade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TradeComponent {
  team1Assets: Asset[] = [];
  team2Assets: Asset[] = [];

  team1Mode: ContenderStatus = ContenderStatus.NEUTRAL;
  team2Mode: ContenderStatus = ContenderStatus.NEUTRAL;

  // Store asset IDs for efficient lookups
  private team1AssetIds: (string | number)[] = [];
  private team2AssetIds: (string | number)[] = [];
  private allAssets: Asset[] = [];

  // Make type guards available to template
  isPlayer = isPlayer;
  isPick = isPick;

  constructor(
    private scoringService: ScoringService,
    private playerService: PlayerService,
    private cdr: ChangeDetectorRef
  ) {
    // Subscribe to player data updates
    this.playerService.playerData$
      .pipe(takeUntilDestroyed())
      .subscribe(players => {
        this.allAssets = players;
        this.updateTeamAssets();
        this.cdr.markForCheck();
      });
  }

  private updateTeamAssets() {
    // Efficiently update team assets using Map for O(1) lookups
    const assetMap = new Map(this.allAssets.map(asset => [asset.id, asset]));
    
    this.team1Assets = this.team1AssetIds
      .map(id => assetMap.get(id))
      .filter(Boolean) as Asset[];
      
    this.team2Assets = this.team2AssetIds
      .map(id => assetMap.get(id))
      .filter(Boolean) as Asset[];
  }

  onTeam1AssetAdded(asset: Asset) {
    this.team1AssetIds.push(asset.id);
    this.team1Assets.push(asset);
  }

  onTeam1AssetRemoved(index: number) {
    this.team1AssetIds.splice(index, 1);
    this.team1Assets.splice(index, 1);
  }

  onTeam1ModeChanged(mode: ContenderStatus) {
    this.team1Mode = mode;
  }

  onTeam2AssetAdded(asset: Asset) {
    this.team2AssetIds.push(asset.id);
    this.team2Assets.push(asset);
  }

  onTeam2AssetRemoved(index: number) {
    this.team2AssetIds.splice(index, 1);
    this.team2Assets.splice(index, 1);
  }

  onTeam2ModeChanged(mode: ContenderStatus) {
    this.team2Mode = mode;
  }
}
