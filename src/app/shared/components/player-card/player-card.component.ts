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
  @Input() player: Player | null = null;
  @Input() removable = false;
  @Input() rank?: number;
  @Input() mode: 'contender' | 'rebuilder' = 'rebuilder';
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

  get value(): number | null {
    if (!this.player) return null;
    return this.mode === 'contender' ? this.player.contend_value : this.player.rebuild_value;
  }
};
