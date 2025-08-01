import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { Pick } from '../../../models/pick';
import { Asset } from '../../../models/asset';
import { isPlayer, isPick } from '../../../services/player.service';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-trade-evaluation',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./trade-evaluation.component.css'],
  templateUrl: './trade-evaluation.component.html'
})

export class TradeEvaluationComponent {
  @Input() team1Assets!: Asset[];
  @Input() team2Assets!: Asset[];
  @Input() team1Mode: ContenderStatus = ContenderStatus.NEUTRAL;
  @Input() team2Mode: ContenderStatus = ContenderStatus.NEUTRAL;

  // Helper function to get value from any asset type
  private getAssetValue(asset: Asset, mode: ContenderStatus): number {
    if (isPlayer(asset)) {
      switch (mode) {
        case ContenderStatus.CONTEND:
          return asset.contend_value || 0;
        case ContenderStatus.COMPETE:
          return asset.compete_value || 0;
        case ContenderStatus.NEUTRAL:
          return asset.neutral_value || 0;
        case ContenderStatus.RELOAD:
          return asset.reload_value || 0;
        case ContenderStatus.REBUILD:
          return asset.rebuild_value || 0;
        default:
          return asset.neutral_value || 0;
      }
    } else if (isPick(asset)) {
      return asset.value || 0;
    }
    return 0;
  }

  private calculateValue(assets: Asset[], mode: ContenderStatus, bestAsset: number): number {
    if(!assets || assets.length === 0) return 0;
    let totalValue = 0;
    for (let i = 0; i < assets.length; i++) {
      let assetValue = this.getAssetValue(assets[i], mode);

      // Decreasing percent of value maintained based on distance from best asset
      let weight = (100 - (bestAsset - assetValue)) / 100;
      totalValue += ((assetValue * (weight)) ** 2);
    }
    return totalValue;
  }

  private calculateBestAsset(): number {
    let t1bestAsset = 0;
    let t2bestAsset = 0;
    const allAssets = [...(this.team1Assets || []), ...(this.team2Assets || [])];
    if (allAssets.length > 0) {
      t1bestAsset = Math.max(...allAssets.map(asset => this.getAssetValue(asset, this.team1Mode)));
      t2bestAsset = Math.max(...allAssets.map(asset => this.getAssetValue(asset, this.team2Mode)));
    }
    return Math.max(t1bestAsset, t2bestAsset);
  }

  private evaluateTradeForTeam(incomingAssets: Asset[], outgoingAssets: Asset[], mode: ContenderStatus, bestAsset: number): number {

    const incomingValue = this.calculateValue(incomingAssets, mode, bestAsset);
    const outgoingValue = this.calculateValue(outgoingAssets, mode, bestAsset);

    return (incomingValue - outgoingValue);
  }


  // Team 1: incoming = team1Assets, outgoing = team2Assets
  // Team 2: incoming = team2Assets, outgoing = team1Assets
  getTradeResult(): number {
    if ((!this.team1Assets || this.team1Assets.length === 0) && 
        (!this.team2Assets || this.team2Assets.length === 0)) {
      return 50; // No assets on either side
    }
    
    // If only Team 1 has assets, Team 1 wins
    if ((!this.team2Assets || this.team2Assets.length === 0) && 
        this.team1Assets && this.team1Assets.length > 0) {
      return 0; // Team 1 wins big
    }
    
    // If only Team 2 has assets, Team 2 wins
    if ((!this.team1Assets || this.team1Assets.length === 0) && 
        this.team2Assets && this.team2Assets.length > 0) {
      return 100; // Team 2 wins big
    }

    const bestAsset = this.calculateBestAsset();

    const team1Value = this.evaluateTradeForTeam(this.team1Assets, this.team2Assets, this.team1Mode, bestAsset);
    const team2Value = this.evaluateTradeForTeam(this.team2Assets, this.team1Assets, this.team2Mode, bestAsset);

    const team1GivingValue = this.calculateValue(this.team1Assets, this.team1Mode, bestAsset);
    const team2GivingValue = this.calculateValue(this.team2Assets, this.team2Mode, bestAsset);
    const totalTradeValue = team1GivingValue + team2GivingValue;

    // If no meaningful value is being traded
    if (totalTradeValue === 0) {
      return 50;
    }

    return ((team1Value - team2Value) * (100 / totalTradeValue)) + 50;
  }


  get tradeBar() {
    return this.getBarProps(this.getTradeResult());
  }

  getBarProps(value: number) {
    // value is centered at 50, range 0-100
    // < 50 = Team 1 wins, > 50 = Team 2 wins
    let left: string, width: string, color: string, status: string, statusClass: string;
    const absDelta = Math.abs(value - 50);
    
    // Always use orange gradient for the bar
    color = 'linear-gradient(90deg, #ff9800, #ffb74d)';
    
    if (value > 52) {
      status = absDelta > 20 ? 'Team 2 wins big' : 'Team 2 wins slightly';
      statusClass = 'team2-win';
      left = '50%';
      width = (value - 50) + '%';
    } else if (value < 48) {
      status = absDelta > 20 ? 'Team 1 wins big' : 'Team 1 wins slightly';
      statusClass = 'team1-win';
      left = value + '%';
      width = (50 - value) + '%';
    } else {
      status = 'Fair trade';
      statusClass = 'neutral';
      left = '48%';
      width = '4%';
    }
    return { left, width, color, status, statusClass };
  }

  get tradeStatus(): string {
    return this.tradeBar.status;
  }
}
