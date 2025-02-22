import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit {
  visible = false;
  isMobile = false;

  menuItems = [
    {
      label: 'Home',
      onClick: () => {
        this.router.navigate(['/']);
        this.viewportScroller.scrollToPosition([0, 0]);
      },
    },
    {
      label: 'Podcast',
      onClick: () => {
        this.router.navigate(['/']);
        this.viewportScroller.scrollToPosition([0, this.isMobile ? 480 : 774]);
      },
    },
    {
      label: 'Portfolio',
      onClick: () => {
        this.router.navigate(['/']);
        this.viewportScroller.scrollToPosition([
          0,
          this.isMobile ? 1250 : 1934,
        ]);
      },
    },
    {
      label: 'Blog',
      onClick: () => {
        this.router.navigate(['/']);
        this.viewportScroller.scrollToPosition([
          0,
          this.isMobile ? 3680 : 3074,
        ]);
      },
    },
  ];

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 400px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  showDrawer() {
    this.visible = true;
  }

  onClose() {
    this.visible = false;
  }
}
