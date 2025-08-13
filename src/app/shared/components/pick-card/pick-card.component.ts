import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Pick } from '../../../models/pick';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-pick-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MatIconModule, MatTooltipModule],
  templateUrl: './pick-card.component.html',
  styleUrls: ['./pick-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickCardComponent {
  @Input() pick: Pick | null = null;
  @Input() removable = false;
  @Input() rank?: number;
  @Input() mode: ContenderStatus = ContenderStatus.NEUTRAL;
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

  get value(): number | null {
    if (!this.pick) return null;
    switch (this.mode) {
      case ContenderStatus.CONTEND:
        return this.pick.contend_value;
      case ContenderStatus.COMPETE:
        return this.pick.compete_value;
      case ContenderStatus.NEUTRAL:
        return this.pick.neutral_value;
      case ContenderStatus.RELOAD:
        return this.pick.reload_value;
      case ContenderStatus.REBUILD:
        return this.pick.rebuild_value;
      default:
        return this.pick.neutral_value;
    }
  }
}
