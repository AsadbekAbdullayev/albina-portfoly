import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() blogDetail: any = {};
  @Input() loading: boolean = false;
}
