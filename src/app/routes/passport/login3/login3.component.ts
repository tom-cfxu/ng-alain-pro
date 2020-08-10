import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'passport-login3',
  templateUrl: './login3.component.html',
  styleUrls: ['./login3.component.less'],
  host: {
    '[class.ant-row]': 'true',
    '[class.pro-passport]': 'true',
  },
})
export class UserLogin3Component implements OnDestroy {
  form: FormGroup;
  error = '';

  constructor(
    fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    public http: _HttpClient,
  ) {
    this.form = fb.group({
      mobilePrefix: ['+86'],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  // #region fields

  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';
    const data = this.form.value;
    this.http.post('/register', data).subscribe(() => {
      this.router.navigateByUrl('/passport/register-result', {
        queryParams: { email: data.mail },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
