import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzUploadModule } from 'ng-zorro-antd/upload';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Portfolio {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  images: string[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzIconModule,
    NzSwitchModule,
    NzCardModule,
    NzListModule,
    NzLayoutModule,
    NzMenuModule,
    NzUploadModule
  ],
})
export class AdminComponent implements OnInit {
  darkMode = false;
  blogDialog = false;
  portfolioDialog = false;
  isCollapsed = false;

  beforeUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.portfolioDialog) {
          this.newPortfolio.images.push(e.target.result);
        } else {
          this.newBlog.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
    return false;
  };

  blogs: Blog[] = [];
  portfolios: Portfolio[] = [];

  displayedBlogColumns: string[] = ['title', 'description', 'image', 'actions'];
  displayedPortfolioColumns: string[] = [
    'title',
    'description',
    'youtubeUrl',
    'images',
    'actions',
  ];

  newBlog: Blog = {
    id: 0,
    title: '',
    description: '',
    image: '',
  };

  newPortfolio: Portfolio = {
    id: 0,
    title: '',
    description: '',
    youtubeUrl: '',
    images: [],
  };

  constructor(private message: NzMessageService) {}

  ngOnInit() {
    this.blogs = [
      {
        id: 1,
        title: 'Sample Blog',
        description: 'Sample Description',
        image: 'assets/images/sample.jpg',
      },
    ];

    this.portfolios = [
      {
        id: 1,
        title: 'Sample Portfolio',
        description: 'Sample Description',
        youtubeUrl: 'https://youtube.com/watch?v=sample',
        images: ['assets/images/sample1.jpg', 'assets/images/sample2.jpg'],
      },
    ];
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme');
  }

  showMessage(message: string) {
    this.message.success(message);
  }

  openNewBlog() {
    this.newBlog = {
      id: 0,
      title: '',
      description: '',
      image: '',
    };
    this.blogDialog = true;
  }

  saveBlog() {
    if (this.newBlog.title && this.newBlog.description) {
      if (this.newBlog.id === 0) {
        this.newBlog.id = this.blogs.length + 1;
        this.blogs.push({ ...this.newBlog });
        this.showMessage('Blog Created Successfully');
      } else {
        const index = this.blogs.findIndex((b) => b.id === this.newBlog.id);
        this.blogs[index] = { ...this.newBlog };
        this.showMessage('Blog Updated Successfully');
      }
      this.blogDialog = false;
    }
  }

  editBlog(blog: Blog) {
    this.newBlog = { ...blog };
    this.blogDialog = true;
  }

  deleteBlog(blog: Blog) {
    this.blogs = this.blogs.filter((b) => b.id !== blog.id);
    this.showMessage('Blog Deleted Successfully');
  }

  openNewPortfolio() {
    this.newPortfolio = {
      id: 0,
      title: '',
      description: '',
      youtubeUrl: '',
      images: [],
    };
    this.portfolioDialog = true;
  }

  savePortfolio() {
    if (this.newPortfolio.title && this.newPortfolio.description) {
      if (this.newPortfolio.id === 0) {
        this.newPortfolio.id = this.portfolios.length + 1;
        this.portfolios.push({ ...this.newPortfolio });
        this.showMessage('Portfolio Created Successfully');
      } else {
        const index = this.portfolios.findIndex(
          (p) => p.id === this.newPortfolio.id
        );
        this.portfolios[index] = { ...this.newPortfolio };
        this.showMessage('Portfolio Updated Successfully');
      }
      this.portfolioDialog = false;
    }
  }

  editPortfolio(portfolio: Portfolio) {
    this.newPortfolio = { ...portfolio };
    this.portfolioDialog = true;
  }

  deletePortfolio(portfolio: Portfolio) {
    this.portfolios = this.portfolios.filter((p) => p.id !== portfolio.id);
    this.showMessage('Portfolio Deleted Successfully');
  }

  onUpload(event: any, isPortfolio = false) {
    const file = event.target.files[0];
    if (isPortfolio) {
      this.newPortfolio.images.push(URL.createObjectURL(file));
    } else {
      this.newBlog.image = URL.createObjectURL(file);
    }
    this.showMessage('File Uploaded Successfully');
  }
}
