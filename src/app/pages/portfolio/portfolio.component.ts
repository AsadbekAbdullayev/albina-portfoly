import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-portfolio',
  imports: [NzSkeletonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  loading = false;
  portFolioDetail = {};

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  getBlog(id: number) {
    this.loading = true;
    this.apiService.getjobById(id).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.portFolioDetail = response.data;
        console.log(response.data, 'res');
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Failed to fetch blog', error);
      },
    });
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params) => {
      this.getBlog(Number(params.get('id')));
    });
  }
}
