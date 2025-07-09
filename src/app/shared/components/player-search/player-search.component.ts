import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';

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
  @Output() playerSelected = new EventEmitter<Player>();
  search: FormControl = new FormControl('');
  playerList: Player[] = [
    {
      id: 1,
      name: 'Steph Curry',
      position: 'PG',
      team: 'Golden State Warriors',
      age: 36,
      value: 97,
      stats: { pts: 28.2, reb: 5.2, ast: 6.4, stl: 1.3, blk: 0.4, threepm: 4.5, fgp: 0.489, ftp: 0.924 }
    },
    {
      id: 2,
      name: 'LeBron James',
      position: 'SF',
      team: 'Los Angeles Lakers',
      age: 40,
      value: 94,
      stats: { pts: 27.1, reb: 7.5, ast: 7.3, stl: 1.1, blk: 0.6, threepm: 2.2, fgp: 0.504, ftp: 0.747 }
    },
    {
      id: 3,
      name: 'Kevin Durant',
      position: 'PF',
      team: 'Phoenix Suns',
      age: 36,
      value: 93,
      stats: { pts: 27.7, reb: 6.7, ast: 5.3, stl: 0.7, blk: 1.1, threepm: 2.4, fgp: 0.521, ftp: 0.883 }
    },
    {
      id: 4,
      name: 'Kyrie Irving',
      position: 'PG',
      team: 'Dallas Mavericks',
      age: 33,
      value: 90,
      stats: { pts: 25.0, reb: 4.1, ast: 5.7, stl: 1.2, blk: 0.4, threepm: 2.8, fgp: 0.486, ftp: 0.903 }
    },
    {
      id: 5,
      name: 'James Harden',
      position: 'SG',
      team: 'Los Angeles Clippers',
      age: 35,
      value: 89,
      stats: { pts: 21.0, reb: 6.1, ast: 10.7, stl: 1.5, blk: 0.5, threepm: 2.7, fgp: 0.444, ftp: 0.867 }
    },
    {
      id: 6,
      name: 'Nikola Jokic',
      position: 'C',
      team: 'Denver Nuggets',
      age: 29,
      value: 99,
      stats: { pts: 26.4, reb: 12.4, ast: 9.0, stl: 1.4, blk: 0.8, threepm: 1.1, fgp: 0.583, ftp: 0.819 }
    },
    {
      id: 7,
      name: 'Joel Embiid',
      position: 'C',
      team: 'Philadelphia 76ers',
      age: 31,
      value: 97,
      stats: { pts: 33.1, reb: 10.2, ast: 4.2, stl: 1.0, blk: 1.7, threepm: 1.1, fgp: 0.540, ftp: 0.857 }
    },
    {
      id: 8,
      name: 'Luka Doncic',
      position: 'PG',
      team: 'Dallas Mavericks',
      age: 26,
      value: 98,
      stats: { pts: 32.4, reb: 8.8, ast: 9.6, stl: 1.4, blk: 0.5, threepm: 3.9, fgp: 0.487, ftp: 0.789 }
    },
    {
      id: 9,
      name: 'Jayson Tatum',
      position: 'SF',
      team: 'Boston Celtics',
      age: 27,
      value: 95,
      stats: { pts: 26.9, reb: 8.1, ast: 4.9, stl: 1.1, blk: 0.6, threepm: 3.1, fgp: 0.476, ftp: 0.852 }
    },
    {
      id: 10,
      name: 'Giannis Antetokounmpo',
      position: 'PF',
      team: 'Milwaukee Bucks',
      age: 30,
      value: 98,
      stats: { pts: 30.1, reb: 11.8, ast: 6.2, stl: 1.2, blk: 1.3, threepm: 0.8, fgp: 0.610, ftp: 0.701 }
    }
  ];
  filteredList: Player[] = [...this.playerList];

  constructor() {
    this.search.valueChanges.subscribe(value => {
      this.filteredList = this.playerList.filter(player =>
        player.name.toLowerCase().includes((value || '').toLowerCase())
      );
    });
  }

  onOptionSelected(player: Player) {
    this.playerSelected.emit(player);
    this.search.setValue(''); // Reset the input after selection to prevent [object Object]
  }
}
