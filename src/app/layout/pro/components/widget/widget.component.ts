import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: '[layout-pro-header-widget]',
  templateUrl: './widget.component.html',
  host: {
    '[class.alain-pro__header-right]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProHeaderWidgetComponent {
  constructor(
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
