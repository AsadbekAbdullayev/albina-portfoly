import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NzSpinModule,
  ],
})
export class PostsComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', Validators.required),
  });

  selectedId?: number;
  loadingBlogs: boolean = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: ApiService,
    private message: NzMessageService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: '',
      description: '',
      img: '', // Holds the file
    });
  }

  dialogRef: any;
  selectedFile: string = '';
  posts: any[] = [];

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.loadingBlogs = true;
    this.apiService.getBlogs().subscribe({
      next: (response: any) => {
        this.loadingBlogs = false;
        this.posts = response.data;
      },
      error: (error: any) => {
        this.loadingBlogs = false;
        console.error('Failed to fetch blogs', error);
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // this.postForm.patchValue({ img: file });
      // this.selectedFile = URL.createObjectURL(file);
      this.apiService.uploadFile(file).subscribe({
        next: (response) => {
          this.postForm.patchValue({
            img: response.data.fileUrl,
          });
        },
        error: (error) => {
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
        img: '',
      });
    }
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      data: {},
      width: '500px',
    });
  }

  addPost(post: any) {
    this.posts.push({
      ...post,
      id: this.posts.length + 1,
    });
  }

  editPost(post: any) {
    this.selectedId = post.id;

    this.postForm.patchValue({
      title: post.title,
      description: post.content,
      img: post.thumbnail,
    });
    this.openDialog(false);
  }

  updatePost() {
    const { title, description, img } = this.postForm.value;
    if (!title || !description || !img) {
      this.message.warning('Please fill the fields');
    } else {
      this.apiService
        .updateBlog(this.selectedId || 0, title, description, img)
        .subscribe({
          next: (response: any) => {
            this.message.success('Blog is updated !');
            this.dialog.closeAll();
            this.postForm.patchValue({ img: '', title: '', description: '' });
            this.selectedId = undefined;
            this.getBlogs();
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
    this.apiService.deleteBlog(post.id).subscribe({
      next: (response: any) => {
        this.message.success('Blog is deleted !');
        this.getBlogs();
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
    this.postForm.patchValue({ img: '', title: '', description: '' });
    this.selectedId = undefined;
  }

  saveItem() {
    const { title, description, img } = this.postForm.value;
    if (!title || !description || !img) {
      this.message.warning('Please fill the fields');
    } else {
      this.apiService.postBlog(title, description, img).subscribe({
        next: (response: any) => {
          this.message.success('Blog is created !');
          this.dialog.closeAll();
          this.postForm.patchValue({ img: '', title: '', description: '' });
          this.getBlogs();
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
