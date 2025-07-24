import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { PlayerCardComponent } from '../player-card/player-card.component';

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
  playerList: Player[] = [];
  filteredList: Player[] = [];

  constructor(private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(players => {
      this.playerList = players;
      this.filteredList = [...players];
    });
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
