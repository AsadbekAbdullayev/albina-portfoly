import { Component } from '@angular/core';
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
  slides = [
    {
      img: 'assets/images/test-image.png',
      title: 'ARTICLE',
      desc: 'How to Navigate International Payments for Education Without Stress',
    },
    {
      img: 'assets/images/test-image.png',
      title: 'Title 2',
      desc: 'Overcoming Challenges in Foreign Currency Tuition Payments',
    },
    {
      img: 'assets/images/test-image.png',
      title: 'ARTICLE',
      desc: 'How to Navigate International Payments for Education Without Stress',
    },
    {
      img: 'assets/images/test-image.png',
      title: 'Title 2',
      desc: 'Overcoming Challenges in Foreign Currency Tuition Payments',
    },
  ];

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
        this.blogs = response.data;
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
