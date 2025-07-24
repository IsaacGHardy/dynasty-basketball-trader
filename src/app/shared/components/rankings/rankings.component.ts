import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent implements OnInit {
  players: Player[] = [];
  pageSize = 7;
  page = signal(0);
  loading = signal(true);

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe((apiPlayers: Player[]) => {
      this.players = apiPlayers.sort((a, b) => b.contend_value - a.contend_value);
      this.loading.set(false);
    });
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
