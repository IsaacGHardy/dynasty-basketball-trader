import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../models/asset';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../models/player';
import { Pick } from '../../../models/pick';

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
  @Output() playerSelected = new EventEmitter<Asset>();
  search: FormControl = new FormControl('');
  playerList: Asset[] = [];
  filteredList: Asset[] = [];

  constructor(private playerService: PlayerService) {
    this.playerService.playerData$.subscribe(players => {
      this.playerList = players;
      this.filteredList = [...players];
    });
    this.search.valueChanges.subscribe(value => {
      const searchValue = typeof value === 'string' ? value.toLowerCase() : '';
      this.filteredList = this.playerList.filter(asset => {
        if (asset.type === 'player') {
          return (asset as Player).name.toLowerCase().includes(searchValue);
        } else if (asset.type === 'pick') {
          return (asset as Pick).label.toLowerCase().includes(searchValue);
        }
        return false;
      });
    });
  }

  onOptionSelected(asset: Asset) {
    this.playerSelected.emit(asset);
    this.search.setValue(''); // Reset the input after selection to prevent [object Object]
  }

  getDisplayName(asset: Asset): string {
    if (asset.type === 'player') {
      return (asset as Player).name;
    } else if (asset.type === 'pick') {
      return (asset as Pick).label;
    }
    return '';
  }
}
