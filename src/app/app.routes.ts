import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent, PostsComponent } from './components';
import { PostComponent } from './components/blog/post/post.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CategoryComponent } from './components/blog/category/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'posts', component: PostsComponent, title: 'Posts' },
  { path: 'post/:id', component: PostComponent, title: 'Post' },
  { path: 'category/:tag', component: CategoryComponent, title: 'Category' },
  { path: 'blog', component: SearchResultComponent, title: 'Search Result' },
  { path: 'not-found', component: NotFoundComponent, title: 'Page not found' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
