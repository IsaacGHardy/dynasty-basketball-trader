import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { B } from '@angular/cdk/keycodes';

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
  @Input() team1Mode: 'contender' | 'rebuilder' = 'contender';
  @Input() team2Mode: 'contender' | 'rebuilder' = 'contender';

  calculateValue(players: Player[], mode: 'contender' | 'rebuilder', bestAsset: number): number {
    if(players.length === 0) return 0;
    let totalValue = 0;
    for (let i = 0; i < players.length; i++) {
      let playerValue = (mode === 'contender' ? players[i].contend_value : players[i].rebuild_value) || 0;
      let weight = (100 - (bestAsset - playerValue)) / 100;
      totalValue += ((playerValue * (weight)));
    }
    return totalValue;
  }

  calculateBestAsset(t1PlayersSorted: Player[], t2PlayersSorted: Player[]): number {
    let t1Best: number = 0;
    let t2Best: number = 0;
    if(t1PlayersSorted.length !=0) t1Best = this.team2Mode === 'contender' ? t1PlayersSorted[0].contend_value : t1PlayersSorted[0].rebuild_value;
    if(t2PlayersSorted.length !=0) t2Best = this.team1Mode === 'contender' ? t2PlayersSorted[0].contend_value : t2PlayersSorted[0].rebuild_value;
    return t1Best > t2Best ? t1Best : t2Best;
  }

  get evalPercent(): number {
    // Sort team1Players and team2Players by value (contend or rebuild) descending
    const t1PlayersSorted = [...this.team1Players].sort((a, b) => {
      const aVal = this.team1Mode === 'contender' ? (a.contend_value || 0) : (a.rebuild_value || 0);
      const bVal = this.team1Mode === 'contender' ? (b.contend_value || 0) : (b.rebuild_value || 0);
      return bVal - aVal;
    });
    const t2PlayersSorted = [...this.team2Players].sort((a, b) => {
      const aVal = this.team2Mode === 'contender' ? (a.contend_value || 0) : (a.rebuild_value || 0);
      const bVal = this.team2Mode === 'contender' ? (b.contend_value || 0) : (b.rebuild_value || 0);
      return bVal - aVal;
    });

    const bestAsset = this.calculateBestAsset(t1PlayersSorted, t2PlayersSorted);

    // Modes are swapped because it considers how valuable the incoming players are to the other team
    const t1 = this.calculateValue(t1PlayersSorted, this.team2Mode, bestAsset);
    const t2 = this.calculateValue(t2PlayersSorted, this.team1Mode, bestAsset);

    const percent = (t1 - t2) * (100 / (t1 + t2)) + 50;

    return percent;
  }

  get tradeStatus(): string {
    const p = this.evalPercent;
    if (p <= 20) return 'Team 1 HEIST!';
    if (p <= 40) return 'Team 1 Wins Big';
    if (p <= 48) return 'Team 1 Wins';
    if (p < 52)  return 'Fair Deal';
    if (p < 60)  return 'Team 2 Wins';
    if (p < 80)  return 'Team 2 Wins Big';
    if (p >= 80) return 'Team 2 HEIST!';
    return 'Even Trade';
  }
}
