import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { Pick } from '../../../models/pick';
import { Asset } from '../../../models/asset';
import { isPlayer, isPick } from '../../../services/player.service';

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
  @Input() team1Mode: 'contender' | 'rebuilder' = 'contender';
  @Input() team2Mode: 'contender' | 'rebuilder' = 'contender';
  @Input() showTeam?: 1 | 2; // New input to show only specific team's evaluation

  // Helper function to get value from any asset type
  private getAssetValue(asset: Asset, mode: 'contender' | 'rebuilder'): number {
    if (isPlayer(asset)) {
      return (mode === 'contender' ? asset.contend_value : asset.rebuild_value) || 0;
    } else if (isPick(asset)) {
      return asset.value || 0;
    }
    return 0;
  }

  calculateValue(assets: Asset[], mode: 'contender' | 'rebuilder', bestAsset: number): number {
    if(!assets || assets.length === 0) return 0;
    let totalValue = 0;
    for (let i = 0; i < assets.length; i++) {
      let assetValue = this.getAssetValue(assets[i], mode);
      let weight = (100 - (bestAsset - assetValue)) / 100;
      totalValue += ((assetValue * (weight)) ** 2);
    }
    return totalValue;
  }

  calculateBestAssetOneTeam(incomingAssets: Asset[], outgoingAssets: Asset[], mode: 'contender' | 'rebuilder'): number {
    let bestAsset = 0;
    const allAssets = [...(incomingAssets || []), ...(outgoingAssets || [])];
    if (allAssets.length > 0) {
      bestAsset = Math.max(...allAssets.map(asset => this.getAssetValue(asset, mode)));
    }
    return bestAsset;
  }

  evaluateTradeForTeam(incomingAssets: Asset[], outgoingAssets: Asset[], mode: 'contender' | 'rebuilder'): number {
    const bestAsset = this.calculateBestAssetOneTeam(incomingAssets, outgoingAssets, mode);

    const incomingValue = this.calculateValue(incomingAssets, mode, bestAsset);
    const outgoingValue = this.calculateValue(outgoingAssets, mode, bestAsset);

    return (incomingValue - outgoingValue) * (100 / (incomingValue + outgoingValue)) + 50;
  }


  // Team 1: incoming = team2Assets, outgoing = team1Assets
  // Team 2: incoming = team1Assets, outgoing = team2Assets
  get team1Value(): number {
    return this.evaluateTradeForTeam(this.team2Assets || [], this.team1Assets || [], this.team1Mode);
  }
  get team2Value(): number {
    return this.evaluateTradeForTeam(this.team1Assets || [], this.team2Assets || [], this.team2Mode);
  }

  get team1Bar() {
    return this.getBarProps(this.team1Value);
  }
  get team2Bar() {
    return this.getBarProps(this.team2Value);
  }

  getBarProps(value: number) {
    // value is centered at 50, range 0-100
    let left: string, width: string, color: string, status: string, statusClass: string;
    const absDelta = Math.abs(value - 50);
    if (value > 52) {
      color = '#4caf50';
      status = absDelta > 20 ? 'Large value gain' : 'Small value gain';
      statusClass = 'gain';
      left = '50%';
      width = (value - 50) + '%';
    } else if (value < 48) {
      color = '#f44336';
      status = absDelta > 20 ? 'Large value loss' : 'Small value loss';
      statusClass = 'loss';
      left = value + '%';
      width = (50 - value) + '%';
    } else {
      color = '#ff9800';
      status = 'Neutral value move';
      statusClass = 'neutral';
      left = '48%';
      width = '4%';
    }
    return { left, width, color, status, statusClass };
  }

  // I want to calculate the value for each team as both teams can win given the contend vs rebuild values
  // Instead of having one bar, I'd like to have two bars, one for each team

  get tradeStatus(): string {
    // Example: summarize both teams' value moves
    const t1 = this.team1Bar.status;
    const t2 = this.team2Bar.status;
    if (t1 === 'Neutral value move' && t2 === 'Neutral value move') return 'Both teams: Neutral value move';
    if (t1 === t2) return `Both teams: ${t1}`;
    return `Team 1: ${t1} | Team 2: ${t2}`;
  }
}
