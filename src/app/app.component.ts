import { Component, isDevMode, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavbarComponent } from './components';
import * as AOS from 'aos';
import * as GLightbox from 'glightbox';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ngOnInit() {
    AOS.init();

    const glightbox = GLightbox({
      selector: '.glightbox',
    });
  }
}
