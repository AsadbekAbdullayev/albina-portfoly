import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  HostListener,
  signal,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ChangeDetectorRef } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  imports: [
    MatIconModule,
    YouTubePlayer,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NzSpinModule,
    NzImageModule,
  ],
})
export class PortfolioComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    youtubeLink: new FormControl('', [Validators.required]),
  });
  width = signal(600);
  height = signal(300);
  images: { id: number; url: string }[] = [];
  selectedId?: number;
  loadingBlogs: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: ApiService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.postForm = this.fb.group({
      title: '',
      description: '',
      youtubeLink: '',
    });
  }
  @ViewChild('Player') Player!: ElementRef<HTMLDivElement>;
  dialogRef: any;
  posts: any[] = [];
  @HostListener('window:resize')
  onResize() {
    this.width.set(this.Player.nativeElement.clientWidth * 0.99);
    this.cdr.detectChanges();
  }

  extractVideoId(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  ngOnInit() {
    this.getPortfolios();
    this.width.set(this.Player.nativeElement.clientWidth * 0.9);
    this.cdr.detectChanges();
  }

  getPortfolios() {
    this.loadingBlogs = true;
    this.apiService.getPortfolios().subscribe({
      next: (response: any) => {
        this.loadingBlogs = false;
        this.posts = response.data;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loadingBlogs = false;
        console.error('Failed to fetch blogs', error);
      },
    });
  }
  deleteImage(id: number) {
    this.images = this.images.filter((image) => image.id !== id);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.apiService.uploadFile(file).subscribe({
        next: (response) => {
          this.images.push({
            id: this.images.length + 1,
            url: response.data.fileUrl,
          });

          console.log(this.images);
        },
        error: (error) => {
          this.message.error('Something went wrong');

          console.error('File upload failed', error);
        },
      });
    }
  }

  openDialog(isAdding: any) {
    if (isAdding) {
      this.postForm.patchValue({
        title: '',
        description: '',
        youtubeLink: '',
      });
      this.images = [];
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      data: {},
      width: '500px',
    });
  }

  editPost(post: any) {
    this.selectedId = post.id;

    this.postForm.patchValue({
      title: post.title,
      description: post.description,
      youtubeLink: post.youtubeLink,
    });
    this.images = post.photoLinks.map((image: string, i: number) => ({
      id: i,
      url: image,
    }));
    this.openDialog(false);
  }

  updatePost() {
    const { title, description, youtubeLink } = this.postForm.value;
    if (!title || !description || !youtubeLink) {
      this.message.warning('Please fill the fields');
    } else {
      this.apiService
        .updatePortfolio(
          this.selectedId || 0,
          title,
          description,
          String(youtubeLink),
          this.images.map((img) => img.url)
        )
        .subscribe({
          next: (response: any) => {
            this.message.success('Portfolio is updated !');
            this.dialog.closeAll();
            this.postForm.patchValue({
              title: '',
              description: '',
              youtubeLink: '',
            });
            this.images = [];
            this.selectedId = undefined;
            this.getPortfolios();
          },
          error: (error: any) => {
            if (error.status == 401 || error.status == 403) {
              this.dialog.closeAll();
              this.message.error('Auth failed');
              this.router.navigate(['/login']);
            } else {
              this.message.error(error.error.message);
            }
          },
        });
    }
  }

  deletePost(post: any) {
    this.apiService.deletePortfolio(post.id).subscribe({
      next: (response: any) => {
        this.message.success('Portfolio is deleted !');
        this.getPortfolios();
      },
      error: (error: any) => {
        if (error.status == 401 || error.status == 403) {
          this.message.error('Auth failed');
          this.router.navigate(['/login']);
        } else {
          this.message.error('Failed to delete blog');
        }
      },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
    this.postForm.patchValue({ title: '', description: '', youtubeLink: '' });
    this.images = [];
    this.selectedId = undefined;
  }

  saveItem() {
    const { title, description, youtubeLink } = this.postForm.value;
    if (!title || !description) {
      this.message.warning('Please fill the fields');
    } else {
      this.apiService
        .postPortfolio(
          title,
          description,
          String(youtubeLink),
          this.images.map((img) => img.url)
        )
        .subscribe({
          next: (response: any) => {
            this.message.success('Portfolio is created !');
            this.dialog.closeAll();
            this.postForm.patchValue({
              title: '',
              description: '',
              youtubeLink: '',
            });
            this.images = [];
            this.getPortfolios();
          },
          error: (error: any) => {
            if (error.status == 401 || error.status == 403) {
              this.dialog.closeAll();
              this.message.error('Auth failed');
              this.router.navigate(['/login']);
            } else {
              this.message.error(error.error.message);
            }
          },
        });
    }
  }
}
