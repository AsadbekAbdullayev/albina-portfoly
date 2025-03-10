import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  imports: [SlickCarouselModule, CommonModule, NzSkeletonModule],
})
export class BlogComponent {
  loading = false;
  blogs = [];
  slides = signal<{ img: string; desc: string; title: string; id: number }[]>(
    []
  );

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  constructor(private apiService: ApiService, private router: Router) {}

  navigateToBlog(index: number) {
    this.router.navigate([`/post/${index}`]);
  }
  getBlogsForUser() {
    this.loading = true;
    this.apiService.getBlogsForUsers().subscribe({
      next: (response: any) => {
        this.loading = false;
        let newData = response.data.map((item: any) => {
          return {
            id: item.id,
            img: item.thumbnail,
            desc: item.content,
            title: '',
          };
        });
        this.slides.set(newData);
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Failed to fetch blogs', error);
      },
    });
  }

  ngOnInit() {
    this.getBlogsForUser();
  }
}
