/*
 * Dynasty Basketball Trader - Guide Component
 * Copyright (c) 2025 Isaac Hardy
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GUIDE_CONTENT, GuideSection, GuideItem } from './guide-content';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent {
  guideSections = GUIDE_CONTENT;

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
