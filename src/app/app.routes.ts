import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './components';
import { PostComponent } from './components/blog/post/post.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'posts', component: PostComponent, title: 'Posts' },
  { path: 'post/:id', component: PostComponent, title: 'Post' },
  { path: 'not-found', component: NotFoundComponent, title: 'Page not found' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
