import { Component } from '@angular/core';
import { ScoringService } from '../../../services/scoring.service';
import { PlayerService, isPlayer, isPick } from '../../../services/player.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { PickCardComponent } from '../pick-card/pick-card.component';
import { TradeEvaluationComponent } from '../trade-evaluation/trade-evaluation.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Asset } from '../../../models/asset';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, PlayerSearchComponent, PlayerCardComponent, PickCardComponent, TradeEvaluationComponent, MatButtonToggleModule, FormsModule],
  styleUrls: ['./trade.component.css'],
  templateUrl: './trade.component.html'
})

export class TradeComponent {
  team1Assets: Asset[] = [];
  team2Assets: Asset[] = [];

  team1Mode: 'contender' | 'rebuilder' = 'contender';
  team2Mode: 'contender' | 'rebuilder' = 'contender';

  // Make type guards available to template
  isPlayer = isPlayer;
  isPick = isPick;

  constructor(
    private scoringService: ScoringService,
    private playerService: PlayerService
  ) {
    this.scoringService.scoring$
      .pipe(takeUntilDestroyed())
      .subscribe(scoring => {
        this.playerService.getPlayers(scoring).subscribe((players: Asset[]) => {
          this.updateTeamPlayers(this.team1Assets, players);
          this.updateTeamPlayers(this.team2Assets, players);
        });
      });
  }

  private updateTeamPlayers(team: Asset[], latestPlayers: Asset[]) {
    for (let i = 0; i < team.length; i++) {
      const updated = latestPlayers.find(p => p.id === team[i].id);
      if (updated) {
        team[i] = { ...updated };
      }
    }
  }

  addPlayerToTeam(team: 1 | 2, asset: Asset) {
    if (team === 1) {
      this.team1Assets.push(asset);
    } else {
      this.team2Assets.push(asset);
    }
  }

  removePlayerFromTeam(team: 1 | 2, index: number) {
    if (team === 1) {
      this.team1Assets.splice(index, 1);
    } else {
      this.team2Assets.splice(index, 1);
    }
  }
}
