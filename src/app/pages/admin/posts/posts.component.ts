import { Component, ViewChild, TemplateRef, signal } from '@angular/core';
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
@Component({
  selector: 'app-posts',
  standalone: true,
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
  ],
})
export class PostsComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    img: new FormControl('', Validators.required),
  });
  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: '',
      description: '',
      img: '', // Holds the file
    });
  }

  dialogRef: any;
  selectedFile: string = '';
  posts = [
    {
      id: 1,
      title: 'First Post',
      description: 'This is the first post.',
      image: null,
    },
  ];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ img: file });
      this.selectedFile = URL.createObjectURL(file);
    }
  }

  openDialog(
    item: any = { title: '', description: '', image: '' },
    isEdit: boolean = false
  ) {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      data: { item, isEdit },
      width: '500px',
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (isEdit) {
          this.editPost(result);
        } else {
          this.addPost(result);
        }
      }
    });
  }

  addPost(post: any) {
    this.posts.push({
      ...post,
      id: this.posts.length + 1,
    });
  }

  editPost(post: any) {
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = { ...post };
    }
  }

  deletePost(post: any) {
    this.posts = this.posts.filter((p) => p.id !== post.id);
  }

  closeDialog() {
    this.dialog.closeAll();
    this.postForm.patchValue({ img: '', title: '', description: '' });
  }

  saveItem(e: any) {
    // e.preventDefault();
    this.dialog.closeAll();
    console.log(this.postForm.value, 'submitForm');
    this.postForm.patchValue({ img: '', title: '', description: '' });
  }
}
