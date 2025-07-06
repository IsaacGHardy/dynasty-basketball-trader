import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  @Input() player: any = null;
  searchValue: string = '';
}
