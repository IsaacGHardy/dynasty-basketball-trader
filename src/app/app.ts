/*
 * Dynasty Basketball Trader
 * Copyright (c) 2025 Isaac Hardy
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'dynasty-basketball-trader';
}
