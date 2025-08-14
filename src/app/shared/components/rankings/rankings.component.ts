
import { Component, computed, signal, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { ContenderStatusSelectorComponent } from '../contender-status-selector/contender-status-selector.component';
import { Player } from '../../../models/player';
import { Pick } from '../../../models/pick';
import { Asset } from '../../../models/asset';
import { PlayerService, isPlayer, isPick } from '../../../services/player.service';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, PickCardComponent, ContenderStatusSelectorComponent],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {
  allAssets: Asset[] = [];
  assets = signal<Asset[]>([]);
  desktopPageSize = 10;
  mobilePageSize = 5;
  page = signal(0);
  loading = signal(true);
  mode = signal<ContenderStatus>(ContenderStatus.NEUTRAL);
  selectedMode = ContenderStatus.NEUTRAL;
  isMobile = signal(false);

  // Make type guards available to template
  isPlayer = isPlayer;
  isPick = isPick;

  // Expose enum to template
  ContenderStatus = ContenderStatus;

  constructor(private playerService: PlayerService) {
    this.checkScreenSize();
    this.playerService.playerData$
      .pipe(takeUntilDestroyed())
      .subscribe((apiAssets: Asset[]) => {
        this.allAssets = apiAssets;
        this.sortAssets();
        this.loading.set(false);
      });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile.set(window.innerWidth <= 768);
  }

  private getAssetValue(asset: Asset, mode: ContenderStatus): number {
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
  }

  sortAssets() {
    const sortedAssets = [...this.allAssets].sort((a, b) => {
      // Sort by value depending on type and mode
      const mode = this.mode();
      const valueA = this.getAssetValue(a, mode);
      const valueB = this.getAssetValue(b, mode);
      return valueB - valueA; // Sort descending (highest value first)
    });
    
    this.assets.set(sortedAssets);
    
    // Reset page to 0 when sorting to show first page
    this.page.set(0);
  }

  onModeChange(mode: ContenderStatus) {
    this.selectedMode = mode;
    this.mode.set(mode);
    this.sortAssets();
  }

  pagedAssets = computed(() => {
    const isMobileView = this.isMobile();
    const assetsArray = this.assets();
    const currentPage = this.page();
    
    if (isMobileView) {
      // Mobile: simple pagination with 5 items per page, sequential order
      const start = currentPage * this.mobilePageSize;
      const pageAssets = assetsArray.slice(start, start + this.mobilePageSize);
      
      return pageAssets.map((asset, index) => ({
        asset,
        rank: start + index + 1
      }));
    }
    
    // Desktop: use pagination and column ordering
    const start = currentPage * this.desktopPageSize;
    const pageAssets = assetsArray.slice(start, start + this.desktopPageSize);
    
    // Create array with assets and their original ranks
    const assetsWithRanks = pageAssets.map((asset, index) => ({
      asset,
      rank: start + index + 1
    }));
    
    // Reorganize to fill columns vertically (1-5 in first column, 6-10 in second)
    const columns = 2;
    const itemsPerColumn = Math.ceil(assetsWithRanks.length / columns);
    const reorderedAssets: {asset: Asset, rank: number}[] = [];
    
    // Fill first column with ranks 1-5, second column with ranks 6-10
    for (let i = 0; i < assetsWithRanks.length; i++) {
      if (i < itemsPerColumn) {
        // First column (items 0-4 become ranks 1-5)
        reorderedAssets[i * 2] = assetsWithRanks[i];
      } else {
        // Second column (items 5-9 become ranks 6-10)
        const secondColumnIndex = (i - itemsPerColumn) * 2 + 1;
        reorderedAssets[secondColumnIndex] = assetsWithRanks[i];
      }
    }
    
    // Filter out undefined entries and return
    return reorderedAssets.filter(item => item !== undefined);
  });

  get totalPages() {
    const isMobileView = this.isMobile();
    const pageSize = isMobileView ? this.mobilePageSize : this.desktopPageSize;
    return Math.ceil(this.assets().length / pageSize);
  }

  nextPage() {
    if (this.page() < this.totalPages - 1) this.page.update((p) => p + 1);
  }
  prevPage() {
    if (this.page() > 0) this.page.update((p) => p - 1);
  }
}
