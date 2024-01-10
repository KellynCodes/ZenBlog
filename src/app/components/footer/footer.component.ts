import { Component } from '@angular/core';
import { BrowserApiService } from '../../../services/utils/browser.api.service';

@Component({
  selector: 'blog-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private browserApi: BrowserApiService) {}

  year = new Date().getFullYear();
  scrollToTop(): void {
    if (this.browserApi.isBrowser) {
      window.scrollTo(0, 0);
    }
  }
}
