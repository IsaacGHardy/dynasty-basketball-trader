import { Component } from '@angular/core';
import { ScoringService } from '../../../services/scoring.service';
import { PlayerService, isPlayer, isPick } from '../../../services/player.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { TeamTradeComponent } from '../team-trade/team-trade.component';
import { TradeEvaluationComponent } from '../trade-evaluation/trade-evaluation.component';
import { Asset } from '../../../models/asset';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, TeamTradeComponent, TradeEvaluationComponent],
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

  onTeam1AssetAdded(asset: Asset) {
    this.team1Assets.push(asset);
  }

  onTeam1AssetRemoved(index: number) {
    this.team1Assets.splice(index, 1);
  }

  onTeam1ModeChanged(mode: 'contender' | 'rebuilder') {
    this.team1Mode = mode;
  }

  onTeam2AssetAdded(asset: Asset) {
    this.team2Assets.push(asset);
  }

  onTeam2AssetRemoved(index: number) {
    this.team2Assets.splice(index, 1);
  }

  onTeam2ModeChanged(mode: 'contender' | 'rebuilder') {
    this.team2Mode = mode;
  }
}
