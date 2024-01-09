import { Component, afterNextRender, isDevMode, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavbarComponent } from './components';
import * as Aos from 'aos';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    afterNextRender(() => {
      Aos.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }

  ngOnInit() {}
}
