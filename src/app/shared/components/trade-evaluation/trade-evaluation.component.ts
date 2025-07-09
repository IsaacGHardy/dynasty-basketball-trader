import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-trade-evaluation',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./trade-evaluation.component.css'],
  template: `
    <div class="evaluation-bar-container">
      <div class="evaluation-bar-bg">
        <div
          class="evaluation-bar-fill"
          [ngStyle]="{
            left: evalPercent < 50 ? evalPercent + '%' : '50%',
            width: evalPercent < 50 ? (50 - evalPercent) + '%' : (evalPercent - 50) + '%',
            background: '#ff9800'
          }"
        ></div>
        <div class="evaluation-bar-center"></div>
      </div>
      <div class="evaluation-labels">
        <span [class.active]="evalPercent < 50">Team 1</span>
        <span class="neutral">{{ tradeStatus }}</span>
        <span [class.active]="evalPercent > 50">Team 2</span>
      </div>
    </div>
  `
})
export class TradeEvaluationComponent {
  @Input() team1Players: Player[] = [];
  @Input() team2Players: Player[] = [];

  get evalPercent(): number {
    const t1 = this.team1Players.reduce((sum, p) => sum + (p.value || 0), 0);
    const t2 = this.team2Players.reduce((sum, p) => sum + (p.value || 0), 0);
    if (t1 + t2 === 0) return 50;
    return Math.round(50 + 50 * (t1 - t2) / Math.max(t1 + t2, 1));
  }

  get tradeStatus(): string {
    const p = this.evalPercent;
    if (p <= 30) return 'Team 1 HEIST!';
    if (p <= 40) return 'Team 1 Wins Big';
    if (p <= 45) return 'Team 1 Wins';
    if (p < 55)  return 'Fair Deal';
    if (p < 60)  return 'Team 2 Wins';
    if (p < 70)  return 'Team 2 Wins Big';
    if (p >= 70) return 'Team 2 HEIST!';
    return 'Even Trade';
  }
}
