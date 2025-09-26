import { Component, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {}

  imageArray = Array(6).fill({ src: '/assets/img/test-image.png' });

  @Input() blogDetail: BlogDetail | null = null;
  @Input() loading = false;

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

export interface BlogDetail {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}
