import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-jobboard',
  templateUrl: './job_board.component.html',
  imports: [CommonModule, NzSkeletonModule],
})
export class JobboardComponent {
  loading = false;
  jobs = [];
  portfolioItems = [
    {
      id: 1,
      title: 'STEAM School n 45',
      image: '/test-image.png',
    },
    {
      id: 2,
      title: 'STEAM School n 45',
      image:
        'https://i.pinimg.com/236x/91/76/ee/9176eecaf08ff51ddfd840a53013c166.jpg',
    },
    {
      id: 3,
      title: 'STEAM School n 45',
      image:
        'https://i.pinimg.com/236x/91/76/ee/9176eecaf08ff51ddfd840a53013c166.jpg',
    },
    {
      id: 4,
      title: 'STEAM School n 45',
      image:
        'https://i.pinimg.com/236x/91/76/ee/9176eecaf08ff51ddfd840a53013c166.jpg',
    },
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  getPortfoliosForUser() {
    this.loading = true;
    this.apiService.getJobsForUsers().subscribe({
      next: (response: any) => {
        this.loading = false;
        this.jobs = response.data;
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Failed to fetch blogs', error);
      },
    });
  }

  navigateToJob(id: number) {
    this.router.navigate(['/job', id]);
  }

  ngOnInit() {
    this.getPortfoliosForUser();
  }
}
