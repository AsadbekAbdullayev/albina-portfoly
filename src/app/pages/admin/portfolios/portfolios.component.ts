import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
})
export class PortfolioComponent {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  selectedFiles: File[] = [];
  dialogRef: any;

  portfolios = [
    {
      id: 1,
      title: 'First Portfolio',
      description: 'This is the first portfolio item.',
      images: [],
    },
  ];

  constructor(private dialog: MatDialog) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
      this.selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (this.dialogRef) {
            if (!this.dialogRef.componentInstance.data.item.images) {
              this.dialogRef.componentInstance.data.item.images = [];
            }
            this.dialogRef.componentInstance.data.item.images.push(
              e.target.result
            );
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  openDialog(
    item: any = { title: '', description: '', images: [] },
    isEdit: boolean = false
  ) {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      data: { item, isEdit },
      width: '500px',
    });

    this.selectedFiles = [];

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (isEdit) {
          this.editPortfolio(result);
        } else {
          this.addPortfolio(result);
        }
      }
    });
  }

  addPortfolio(portfolio: any) {
    this.portfolios.push({
      ...portfolio,
      id: this.portfolios.length + 1,
    });
  }

  editPortfolio(portfolio: any) {
    const index = this.portfolios.findIndex((p) => p.id === portfolio.id);
    if (index !== -1) {
      this.portfolios[index] = { ...portfolio };
    }
  }

  deletePortfolio(portfolio: any) {
    this.portfolios = this.portfolios.filter((p) => p.id !== portfolio.id);
  }

  removeImage(imageIndex: number) {
    if (this.dialogRef) {
      this.dialogRef.componentInstance.data.item.images.splice(imageIndex, 1);
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  saveItem(data: any) {
    this.dialog.closeAll();
    return data.item;
  }
}
