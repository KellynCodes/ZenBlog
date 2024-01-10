import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './components';
import { PostComponent } from './pages/post/post/post.component';
import { SearchResultComponent } from './pages/post/search-result/search-result.component';
import { CategoryComponent } from './pages/post/category/category.component';
import { UpdateComponent } from './pages/post/update/update.component';
import { CreateComponent } from './pages/post/create/create.component';
import { PostsComponent } from './pages/post/posts/posts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'posts', component: PostsComponent, title: 'Posts' },
  { path: 'post/:id/update', component: UpdateComponent, title: 'Update Post' },
  {
    path: 'post/new-post',
    component: CreateComponent,
    title: 'Create New Blog Post',
  },
  { path: 'post/:id', component: PostComponent, title: 'Post' },
  { path: 'category/:tag', component: CategoryComponent, title: 'Category' },
  { path: 'blog', component: SearchResultComponent, title: 'Search Result' },
  { path: 'not-found', component: NotFoundComponent, title: 'Page not found' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
