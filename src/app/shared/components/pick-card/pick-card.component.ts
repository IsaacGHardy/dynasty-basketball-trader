import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Pick } from '../../../models/pick';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pick-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MatIconModule],
  templateUrl: './pick-card.component.html',
  styleUrls: ['./pick-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickCardComponent {
  @Input() pick: Pick | null = null;
  @Input() removable = false;
  @Input() rank?: number;
  @Output() remove = new EventEmitter<void>();

  getPickDisplay(): string {
    if (!this.pick) return '';
    return `${this.pick.year} ${this.getOrdinalNumber(this.pick.round)} Round`;
  }

  private getOrdinalNumber(num: number): string {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const remainder = num % 100;
    return num + (suffix[(remainder - 20) % 10] || suffix[remainder] || suffix[0]);
  }

  getTierColor(): string {
    if (!this.pick) return '#bdbdbd';
    
    switch (this.pick.tier.toLowerCase()) {
      case 'early': return '#4caf50';
      case 'mid': return '#ff9800';
      case 'late': return '#f44336';
      default: return '#bdbdbd';
    }
  }
}
