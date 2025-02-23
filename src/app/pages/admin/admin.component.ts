import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PortfolioComponent } from './portfolios/portfolios.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, PostsComponent, PortfolioComponent],
})
export class AdminComponent {
  selectedSection: string = 'posts';
  constructor(public router: Router) {}
  selectSection(section: string) {
    console.log(section);
    this.selectedSection = section;
  }
  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
}
