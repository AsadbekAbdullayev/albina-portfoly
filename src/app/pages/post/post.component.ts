import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/ui/footer/footer.component';
import { BodyComponent } from './body/body.component';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [BodyComponent, FooterComponent],
})
export class PodcastComponent {}
