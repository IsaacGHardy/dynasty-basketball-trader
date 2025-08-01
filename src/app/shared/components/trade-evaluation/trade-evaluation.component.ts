import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../models/asset';
import { AssetTier } from '../../../models/asset_tier';
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

  private calculateTieredAssets(assetValues: number[], bestAsset: number, tier: AssetTier): number {
    let totalValue = 0;
    
    assetValues.forEach((assetValue, index) => {
      const weight = (100 - (bestAsset - assetValue)) / 100;
      const diminishingFactor = this.getDiminishingFactor(tier, index);
      totalValue += ((assetValue * weight) ** 2) * diminishingFactor;
    });
    
    return totalValue;
  }

private getDiminishingFactor(tier: AssetTier, index: number): number {
  switch (tier) {
    case AssetTier.HIGH:
      return 1; // No diminishing returns for high value assets
    case AssetTier.MID:
      return Math.pow(0.5, index + 1); // 50% diminishing returns
    case AssetTier.LOW:
      return 0;
    default:
      return 1;
  }
}

  private calculateValue(assets: Asset[], mode: ContenderStatus, bestAsset: number): number {
    if(!assets || assets.length === 0) return 0;
     // Get all asset values
    const sortedAssetValues = assets
    .map(asset => this.getAssetValue(asset, mode))
    .sort((a, b) => b - a);

    // Categorize assets by tiers
    const { highValue, midValue, lowValue } = this.categorizeAssetsByTier(sortedAssetValues, bestAsset);

    // Calculate total value with tier-based diminishing returns
    let totalValue = 0;
    totalValue += this.calculateTieredAssets(highValue, bestAsset, AssetTier.HIGH);
    totalValue += this.calculateTieredAssets(midValue, bestAsset, AssetTier.MID);
    totalValue += this.calculateTieredAssets(lowValue, bestAsset, AssetTier.LOW);

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

  private categorizeAssetsByTier(assetValues: number[], bestAsset: number) {
    const highValueThreshold = bestAsset * 0.9;   // 90%+ of best asset = high value
    const midValueThreshold = bestAsset * 0.7;    // 70-90% of best asset = mid value

    const highValue = assetValues.filter(v => v >= highValueThreshold);
    const midValue = assetValues.filter(v => v >= midValueThreshold && v < highValueThreshold);
    const lowValue = assetValues.filter(v => v < midValueThreshold);
    
    return { highValue, midValue, lowValue };
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

    const team1Value = this.calculateValue(this.team1Assets, this.team1Mode, bestAsset);
    const team2Value = this.calculateValue(this.team2Assets, this.team2Mode, bestAsset);

    const totalTradeValue = team1Value + team2Value;

    // If no meaningful value is being traded
    if (totalTradeValue === 0) {
      return 50;
    }

    return ((team2Value - team1Value) * (100 / totalTradeValue)) + 50;
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
