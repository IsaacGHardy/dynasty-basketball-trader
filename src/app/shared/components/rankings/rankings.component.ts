import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PLAYER_LIST } from '../player-search/player-search.component';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {
  players: Player[] = PLAYER_LIST.slice().sort((a: Player, b: Player) => b.value - a.value);
  pageSize = 7;
  page = signal(0);

  pagedPlayers = computed(() => {
    const start = this.page() * this.pageSize;
    return this.players.slice(start, start + this.pageSize);
  });

  get totalPages() {
    return Math.ceil(this.players.length / this.pageSize);
  }

  nextPage() {
    if (this.page() < this.totalPages - 1) this.page.update(p => p + 1);
  }
  prevPage() {
    if (this.page() > 0) this.page.update(p => p - 1);
  }
}
