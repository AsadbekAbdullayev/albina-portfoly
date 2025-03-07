import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-detail',
  imports: [BodyComponent, HeaderComponent],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css',
})
export class JobDetailComponent {
  loading = false;
  blogDetail = {};
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  getBlog(id: number) {
    this.loading = true;
    // const postId = this.route?.snapshot.paramMap.get('id');
    this.apiService.getBlogById(id).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.blogDetail = response.data;
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
