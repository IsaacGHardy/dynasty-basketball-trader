import { Routes } from '@angular/router';
import { PlayerSearchComponent } from './shared/components/player-search/player-search.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';

export const routes: Routes = [
  { path: '', component: PlayerSearchComponent },
  { path: 'trade', component: PlayerCardComponent }
];
