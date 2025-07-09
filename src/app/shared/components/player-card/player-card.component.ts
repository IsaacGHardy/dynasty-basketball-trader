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
    id: 1,
    name: 'Nikola Jokic',
    position: 'C',
    team: 'Denver Nuggets',
    age: 29,
    value: 99,
    stats: {
      pts: 26.4,
      reb: 12.4,
      ast: 9.0,
      stl: 1.4,
      blk: 0.8,
      threepm: 1.1,
      fgp: 0.583,
      ftp: 0.819
    }
  };
  @Input() removable = false;
  @Output() remove = new EventEmitter<void>();
  readonly isOpen = signal(false);
};
