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
      import('./core/guide/guide.component').then(
        (m) => m.GuideComponent
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./core/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent
      ),
  },
  {
    path: 'terms-of-service',
    loadComponent: () =>
      import('./core/terms-of-service/terms-of-service.component').then(
        (m) => m.TermsOfServiceComponent
      ),
  },
];
