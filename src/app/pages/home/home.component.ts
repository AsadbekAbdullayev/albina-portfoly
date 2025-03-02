import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import { HeaderComponent } from './ui/header/header.component';
import { PodcastComponent } from './ui/podcast/podcast.component';
import { JobboardComponent } from './ui/job_board/job_board.component';
import { BlogComponent } from './ui/blog/blog.component';
import { FooterComponent } from '../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    PodcastComponent,
    JobboardComponent,
    BlogComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
