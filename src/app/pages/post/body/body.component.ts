import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  imports: [NavbarComponent],
})
export class BodyComponent implements OnInit {
  imageSrc = '/assets/img/test-image.png';

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
