
import { Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { Player } from '../../../models/player';
import { Pick } from '../../../models/pick';
import { Asset } from '../../../models/asset';
import { PlayerService, isPlayer, isPick } from '../../../services/player.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, PickCardComponent, MatButtonToggleModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {
  allAssets: Asset[] = [];
  assets: Asset[] = [];
  pageSize = 15;
  page = signal(0);
  loading = signal(true);
  mode = signal<'contender' | 'rebuilder'>('contender');

  // Make type guards available to template
  isPlayer = isPlayer;
  isPick = isPick;

  constructor(private playerService: PlayerService) {
    this.playerService.playerData$
      .pipe(takeUntilDestroyed())
      .subscribe((apiAssets: Asset[]) => {
        this.allAssets = apiAssets;
        this.sortAssets();
        this.loading.set(false);
      });
  }

  private getAssetValue(asset: Asset, mode: 'contender' | 'rebuilder'): number {
    if (isPlayer(asset)) {
      return (mode === 'contender' ? asset.contend_value : asset.rebuild_value) || 0;
    } else if (isPick(asset)) {
      return asset.value || 0;
    }
    return 0;
  }

  sortAssets() {
    this.assets = [...this.allAssets].sort((a, b) => {
      // Sort by value depending on type and mode
      const mode = this.mode();
      const valueA = this.getAssetValue(a, mode);
      const valueB = this.getAssetValue(b, mode);
      return valueB - valueA; // Sort descending (highest value first)
    });
    // If already on page 0, force update by setting to -1 then 0
    let currentPage = this.page();
    this.page.set(-1);
    setTimeout(() => this.page.set(currentPage), 0);
  }

  onModeChange(mode: 'contender' | 'rebuilder') {
    this.mode.set(mode);
    this.sortAssets();
  }

  pagedAssets = computed(() => {
    const start = this.page() * this.pageSize;
    const pageAssets = this.assets.slice(start, start + this.pageSize);
    
    // Create array with assets and their original ranks
    const assetsWithRanks = pageAssets.map((asset, index) => ({
      asset,
      rank: start + index + 1
    }));
    
    // Reorganize to fill columns vertically (column-first order)
    const columns = 3;
    const itemsPerColumn = Math.ceil(assetsWithRanks.length / columns);
    const reorderedAssets: {asset: Asset, rank: number}[] = [];
    
    // Fill each column completely before moving to the next
    for (let row = 0; row < itemsPerColumn; row++) {
      for (let col = 0; col < columns; col++) {
        const originalIndex = col * itemsPerColumn + row;
        if (originalIndex < assetsWithRanks.length) {
          reorderedAssets.push(assetsWithRanks[originalIndex]);
        }
      }
    }
    
    return reorderedAssets;
  });

  get totalPages() {
    return Math.ceil(this.assets.length / this.pageSize);
  }

  nextPage() {
    if (this.page() < this.totalPages - 1) this.page.update((p) => p + 1);
  }
  prevPage() {
    if (this.page() > 0) this.page.update((p) => p - 1);
  }
}
