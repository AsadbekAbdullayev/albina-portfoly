import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
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
  selectedFile: File | null = null;
  dialogRef: any;

  posts = [
    {
      id: 1,
      title: 'First Post',
      description: 'This is the first post.',
      image: '',
    },
  ];

  constructor(private dialog: MatDialog) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Convert file to base64 string
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.dialogRef) {
          this.dialogRef.componentInstance.data.item.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
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
  }

  saveItem(data: any) {
    this.dialog.closeAll();
    return data.item;
  }
}
