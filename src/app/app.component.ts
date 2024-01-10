import { Component, afterRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, NavbarComponent } from './components';
import * as Aos from 'aos';
import { AppState } from './state/app/app.state';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getPosts } from './state/blog/blog.state';
import { LoadPosts } from './state/blog/blog.action';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public ngUnSubscribe = new Subject();
  posts$ = this.store.select(getPosts);

  constructor(private store: Store<AppState>) {
    afterRender(() => {
      Aos.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }

  ngOnInit(): void {
    this.posts$.pipe(takeUntil(this.ngUnSubscribe)).subscribe((posts) => {
      if (posts == null) {
        this.store.dispatch(
             LoadPosts({
               query: { page: 1, limit: 10, keyword: '' },
               IsReFetch: false,
            }) 
          ); 
         }
       });
  }   
   
  ngOnDestroy(): void {
    this.ngUnSubscribe.complete();
  }
}
