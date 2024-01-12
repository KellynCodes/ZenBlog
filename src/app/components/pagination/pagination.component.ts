import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';

@Component({
  selector: 'blog-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;
  @Input({ required: true }) itemsPerPage!: number;
  @Output() pageChanged = new EventEmitter<number>();

  pages = signal<number>(0);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      const newPage = changes['currentPage'].currentValue;
      const pages = this.totalPages - newPage * this.itemsPerPage;
      console.log('new total pages', pages);
      this.pages.set(pages);
      return;
    }

    this.pages.set(this.totalPages - this.currentPage * this.itemsPerPage);
    console.log(this.pages);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number) {
    this.pageChanged.emit(page);
  }
}
