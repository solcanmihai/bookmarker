import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkListCategory } from '../../models';
import { Observable } from 'rxjs';
import { ListService } from '../bookmarks';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookmark-list',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './bookmark-list.html',
  styleUrl: './bookmark-list.scss',
})
export class BookmarkList implements OnInit {
  private bookmarkService = inject(ListService);
  private cdr = inject(ChangeDetectorRef);

  bookmarks$: Observable<BookmarkListCategory[]> = this.bookmarkService.items$;

  ngOnInit(): void {
    this.bookmarkService.loadItems();
  }
}
