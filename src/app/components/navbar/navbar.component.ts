import { Component } from '@angular/core';

@Component({
  selector: 'blog-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpen: boolean = false;
}
