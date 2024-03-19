import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HeaderComponent } from '../../core/ui/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
