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
    <div class="evaluation-bar-container dual">
      <div class="team-bar-group">
        <div class="team-bar-label">Team 1</div>
        <div class="evaluation-bar-bg small">
          <div
            class="evaluation-bar-fill"
            [ngStyle]="{
              left: team1Bar.left,
              width: team1Bar.width,
              background: team1Bar.color
            }"
          ></div>
          <div class="evaluation-bar-center"></div>
        </div>
        <div class="bar-status" [ngClass]="team1Bar.statusClass">{{ team1Bar.status }}</div>
      </div>
      <div class="team-bar-group">
        <div class="team-bar-label">Team 2</div>
        <div class="evaluation-bar-bg small">
          <div
            class="evaluation-bar-fill"
            [ngStyle]="{
              left: team2Bar.left,
              width: team2Bar.width,
              background: team2Bar.color
            }"
          ></div>
          <div class="evaluation-bar-center"></div>
        </div>
        <div class="bar-status" [ngClass]="team2Bar.statusClass">{{ team2Bar.status }}</div>
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
      totalValue += ((playerValue * (weight)) ** 2);
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

  calculateBestAssetOneTeam(incomingPlayers: Player[], outgoingPlayers: Player[], mode: 'contender' | 'rebuilder'): number {
    let bestAsset = 0;
    if (mode === 'contender') {
      bestAsset = Math.max(...incomingPlayers.map(p => p.contend_value || 0), ...outgoingPlayers.map(p => p.contend_value || 0));
    } else {
      bestAsset = Math.max(...incomingPlayers.map(p => p.rebuild_value || 0), ...outgoingPlayers.map(p => p.rebuild_value || 0));
    }
    return bestAsset;
  }

  evaluateTradeForTeam(incomingPlayers: Player[], outgoingPlayers: Player[], mode: 'contender' | 'rebuilder'): number {
    const bestAsset = this.calculateBestAssetOneTeam(incomingPlayers, outgoingPlayers, mode);

    const incomingValue = this.calculateValue(incomingPlayers, mode, bestAsset);
    const outgoingValue = this.calculateValue(outgoingPlayers, mode, bestAsset);

    return (incomingValue - outgoingValue) * (100 / (incomingValue + outgoingValue)) + 50;
  }


  // Team 1: incoming = team2Players, outgoing = team1Players
  // Team 2: incoming = team1Players, outgoing = team2Players
  get team1Value(): number {
    return this.evaluateTradeForTeam(this.team2Players, this.team1Players, this.team1Mode);
  }
  get team2Value(): number {
    return this.evaluateTradeForTeam(this.team1Players, this.team2Players, this.team2Mode);
  }

  get team1Bar() {
    return this.getBarProps(this.team1Value);
  }
  get team2Bar() {
    return this.getBarProps(this.team2Value);
  }

  getBarProps(value: number) {
    // value is centered at 50, range 0-100
    let left: string, width: string, color: string, status: string, statusClass: string;
    const absDelta = Math.abs(value - 50);
    if (value > 52) {
      color = '#4caf50';
      status = absDelta > 20 ? 'Large value gain' : 'Small value gain';
      statusClass = 'gain';
      left = '50%';
      width = (value - 50) + '%';
    } else if (value < 48) {
      color = '#f44336';
      status = absDelta > 20 ? 'Large value loss' : 'Small value loss';
      statusClass = 'loss';
      left = value + '%';
      width = (50 - value) + '%';
    } else {
      color = '#ff9800';
      status = 'Neutral value move';
      statusClass = 'neutral';
      left = '48%';
      width = '4%';
    }
    return { left, width, color, status, statusClass };
  }

  // I want to calculate the value for each team as both teams can win given the contend vs rebuild values
  // Instead of having one bar, I'd like to have two bars, one for each team

  get tradeStatus(): string {
    // Example: summarize both teams' value moves
    const t1 = this.team1Bar.status;
    const t2 = this.team2Bar.status;
    if (t1 === 'Neutral value move' && t2 === 'Neutral value move') return 'Both teams: Neutral value move';
    if (t1 === t2) return `Both teams: ${t1}`;
    return `Team 1: ${t1} | Team 2: ${t2}`;
  }
}
