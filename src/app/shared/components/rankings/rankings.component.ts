
import { Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, MatButtonToggleModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {
  allPlayers: Player[] = [];
  players: Player[] = [];
  pageSize = 7;
  page = signal(0);
  loading = signal(true);
  mode = signal<'contender' | 'rebuilder'>('contender');

  constructor(private playerService: PlayerService) {
    this.playerService.playerData$
      .pipe(takeUntilDestroyed())
      .subscribe((apiPlayers: Player[]) => {
        this.allPlayers = apiPlayers;
        this.sortPlayers();
        this.loading.set(false);
      });
  }

  sortPlayers() {
    this.players = [...this.allPlayers].sort((a, b) =>
      this.mode() === 'contender'
        ? (b.contend_value || 0) - (a.contend_value || 0)
        : (b.rebuild_value || 0) - (a.rebuild_value || 0)
    );
    // If already on page 0, force update by setting to -1 then 0
    let currentPage = this.page();
      this.page.set(-1);
      setTimeout(() => this.page.set(currentPage), 0);
  }

  onModeChange(mode: 'contender' | 'rebuilder') {
    this.mode.set(mode);
    this.sortPlayers();
  }

  pagedPlayers = computed(() => {
    const start = this.page() * this.pageSize;
    return this.players.slice(start, start + this.pageSize);
  });

  get totalPages() {
    return Math.ceil(this.players.length / this.pageSize);
  }

  nextPage() {
    if (this.page() < this.totalPages - 1) this.page.update((p) => p + 1);
  }
  prevPage() {
    if (this.page() > 0) this.page.update((p) => p - 1);
  }
}
