import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'layout-pro-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProFooterComponent {
  get year() {
    return new Date().getFullYear();
  }

  constructor() { }
}
