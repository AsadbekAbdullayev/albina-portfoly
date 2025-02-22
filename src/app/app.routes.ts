import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { BlogComponent } from './pages/post/post.component';
import { AdminComponent } from './pages/admin/admin.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio/:id', component: PortfolioComponent },
  { path: 'post/:id', component: BlogComponent },
  { path: 'admin', component: AdminComponent },
];
