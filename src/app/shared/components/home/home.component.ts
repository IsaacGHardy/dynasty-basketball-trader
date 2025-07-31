import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  features = [
    {
      icon: 'swap_horiz',
      title: 'Trade Analyzer',
      description: 'Evaluate player trades with our advanced scoring system that considers current performance, age, and potential.'
    },
    {
      icon: 'leaderboard',
      title: 'Dynasty Rankings',
      description: 'View comprehensive rankings of players and draft picks based on dynasty league value and long-term potential.'
    },
    {
      icon: 'timeline',
      title: 'Pick Valuations',
      description: 'Get accurate valuations for draft picks across multiple years to make informed trading decisions.'
    },
  ];
}
