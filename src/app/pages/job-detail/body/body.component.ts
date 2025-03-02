import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [FooterComponent],
})
export class BodyComponent implements OnInit {
  imageArray = [
    { src: '/assets/img/test-image.png' },
    { src: '/assets/img/test-image.png' },
    { src: '/assets/img/test-image.png' },
    { src: '/assets/img/test-image.png' },
    { src: '/assets/img/test-image.png' },
    { src: '/assets/img/test-image.png' },
  ];

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
