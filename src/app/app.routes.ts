import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PodcastComponent } from './pages/post/post.component';
import { AdminComponent } from './pages/admin/admin.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PodcastComponent },
  { path: 'job/:id', component: JobDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
];
