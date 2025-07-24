import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DecimalPipe } from '@angular/common';
import { Player } from '../../../models/player';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, DecimalPipe, MatIconModule],
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerCardComponent {
  @Input() player: Player | null = {
    id: '1',
    name: 'Nikola Jokic',
    position: 'C',
    team: 'Denver Nuggets',
    age: 29,
    pts: 26.4,
    rebs: 12.4,
    ast: 9.0,
    stl: 1.4,
    blk: 0.8,
    tov: 3.2,
    fg3m: 1.1,
    fgm: 10.2,
    fga: 17.5,
    ftm: 5.1,
    fta: 6.2,
    fantasy_pts: 60.2,
    contend_value: 99,
    rebuild_value: 99,
  };
  @Input() removable = false;
  @Input() rank?: number;
  @Output() remove = new EventEmitter<void>();
  readonly isOpen = signal(false);

  getFgPercent(player: Player | null): string {
    if (player && player.fgm != null && player.fga != null && player.fga !== 0) {
      return (player.fgm / player.fga).toFixed(3);
    }
    return 'N/A';
  }

  getFtPercent(player: Player | null): string {
    if (player && player.ftm != null && player.fta != null && player.fta !== 0) {
      return (player.ftm / player.fta).toFixed(3);
    }
    return 'N/A';
  }
};
