import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [NavbarComponent, NzSkeletonModule],
})
export class BodyComponent implements OnInit {
  imageSrc = '/assets/img/test-image.png';
  loading = false;
  blogDetail = {};
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  getBlog(id: number) {
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
      this.loading = true;
      this.getBlog(Number(params.get('id')));
    });
  }
}
