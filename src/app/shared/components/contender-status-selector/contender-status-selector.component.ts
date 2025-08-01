import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContenderStatus } from '../../../models/contender-status';

@Component({
  selector: 'app-contender-status-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatOptionModule, MatTooltipModule],
  templateUrl: './contender-status-selector.component.html',
  styleUrls: ['./contender-status-selector.component.css']
})
export class ContenderStatusSelectorComponent {
  @Input() value: ContenderStatus = ContenderStatus.NEUTRAL;
  @Input() name: string = 'contenderStatus';
  @Input() tooltip: string = '';
  @Output() valueChange = new EventEmitter<ContenderStatus>();

  readonly allOptions = [
    { value: ContenderStatus.CONTEND, label: 'Contend' },
    { value: ContenderStatus.COMPETE, label: 'Compete' },
    { value: ContenderStatus.NEUTRAL, label: 'Neutral' },
    { value: ContenderStatus.RELOAD, label: 'Reload' },
    { value: ContenderStatus.REBUILD, label: 'Rebuild' }
  ];

  // Expose enum to template  
  ContenderStatus = ContenderStatus;

  onValueChange(newValue: ContenderStatus) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
