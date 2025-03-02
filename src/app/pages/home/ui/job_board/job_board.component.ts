import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import testImg from '../../../../assets/img/test-image.png';

@Component({
  selector: 'app-jobboard',
  templateUrl: './job_board.component.html',
  styleUrls: ['./podcast.component.css'],
  imports: [CommonModule],
})
export class JobboardComponent {
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

  constructor(private router: Router) {
    console.log(this.portfolioItems, 'otems');
  }

  navigateToJob(id: number) {
    this.router.navigate(['/job', id]);
  }
}
