import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  login: string = '';
  loading: boolean = false;
  password: string = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private message: NzMessageService
  ) {}

  signin() {
    if (!this.login || !this.password) {
      this.message.warning('Please fill the fields');
    } else {
      this.loading = true;

      this.apiService.login(this.login, this.password).subscribe({
        next: (response: any) => {
          this.message.success('Welcome');
          localStorage.setItem('token', response.accessToken); // Store the token
          this.router.navigate(['/admin']); // Navigate to dashboard
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
          if (error.error.message == 'email_or_password_error') {
            this.message.error('Login or Password is wrong !');
          } else {
            this.message.error(error.error.message);
          }
        },
      });
    }
  }
}
