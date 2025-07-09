import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent {
  search: FormControl = new FormControl('');
  playerList: string[] = [
    'Steph Curry',
    'LeBron James',
    'Kevin Durant',
    'Kyrie Irving',
    'James Harden',
    'Nikola Jokic',
    'Joel Embiid',
    'Luka Doncic',
    'Jayson Tatum',
    'Giannis Antetokounmpo'
  ];
  filteredList: string[] = [...this.playerList];

  constructor() {
    this.search.valueChanges.subscribe(value => {
      this.filteredList = this.playerList.filter(player =>
        player.toLowerCase().includes((value || '').toLowerCase())
      );
    });
  }
}
