import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./shared/components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
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
];
