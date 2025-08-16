import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/trade', pathMatch: 'full' },
  {
    path: 'trade',
    loadComponent: () =>
      import('./shared/components/trade/trade.component').then(
        (m) => m.TradeComponent
      ),
  },
  {
    path: 'rankings',
    loadComponent: () =>
      import('./shared/components/rankings/rankings.component').then(
        (m) => m.RankingsComponent
      ),
  },
  {
    path: 'guide',
    loadComponent: () =>
      import('./shared/components/guide/guide.component').then(
        (m) => m.GuideComponent
      ),
  },
];
