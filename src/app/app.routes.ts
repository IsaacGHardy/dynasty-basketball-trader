import { Routes } from '@angular/router';
import { TradeComponent } from './shared/components/trade/trade.component';

export const routes: Routes = [
  { path: 'trade', component: TradeComponent },
  {
    path: 'rankings',
    loadComponent: () =>
      import('./shared/components/rankings/rankings.component').then(
        (m) => m.RankingsComponent
      ),
  },
];
