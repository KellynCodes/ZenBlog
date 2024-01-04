import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BlogCategoriesComponent,
  BlogUserListComponent,
  FooterComponent,
  NavbarComponent,
  PaginationComponent,
  PostComponent,
  RecentBlogComponent,
} from './components';
import { RouterOutlet } from '@angular/router';
import { PostDto } from '../types/post';
import { posts } from '../data/posts';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    PaginationComponent,
    BlogUserListComponent,
    PostComponent,
    BlogCategoriesComponent,
    RecentBlogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  post = signal<PostDto[]>(posts);
}
