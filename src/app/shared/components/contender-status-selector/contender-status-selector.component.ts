import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class ContenderStatusSelectorComponent implements OnInit {
  @Input() value: ContenderStatus = ContenderStatus.NEUTRAL;
  @Input() name: string = 'contenderStatus';
  @Input() tooltip: string = '';
  @Output() valueChange = new EventEmitter<ContenderStatus>();

  currentTooltip: string = '';

  readonly allOptions = [
    { value: ContenderStatus.CONTEND, label: 'Contend', tooltip: 'Exclusively win now' },
    { value: ContenderStatus.COMPETE, label: 'Compete', tooltip: 'Focused on winning now' },
    { value: ContenderStatus.NEUTRAL, label: 'Neutral', tooltip: 'Focused on overall value' },
    { value: ContenderStatus.RELOAD, label: 'Reload', tooltip: 'Focused on younger players' },
    { value: ContenderStatus.REBUILD, label: 'Rebuild', tooltip: 'Exclusively young players' }
  ];

  // Expose enum to template  
  ContenderStatus = ContenderStatus;

  ngOnInit() {
    // Set initial tooltip to the selected option's tooltip or fallback
    this.updateTooltipForSelected();
  }

  onValueChange(newValue: ContenderStatus) {
    this.value = newValue;
    this.valueChange.emit(newValue);
    this.updateTooltipForSelected();
  }

  onOptionHover(option: any) {
    this.currentTooltip = option.tooltip;
  }

  onOptionsLeave() {
    this.updateTooltipForSelected();
  }

  private updateTooltipForSelected() {
    const selectedOption = this.allOptions.find(opt => opt.value === this.value);
    this.currentTooltip = selectedOption?.tooltip || this.tooltip;
  }
}
