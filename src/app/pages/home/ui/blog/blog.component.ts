import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  imports: [SlickCarouselModule, CommonModule],
})
export class BlogComponent {
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
    slidesToShow: 1,
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

  constructor(private router: Router) {}

  navigateToBlog(index: number) {
    this.router.navigate([`/blog/${index}`]);
  }
}
