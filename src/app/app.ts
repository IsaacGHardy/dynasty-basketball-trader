import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, PlayerCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'dynasty-basketball-trader';
}
