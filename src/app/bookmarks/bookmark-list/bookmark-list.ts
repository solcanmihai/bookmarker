import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkListCategory } from '../../models';
import { map, Observable } from 'rxjs';
import { ListService } from '../bookmarks';

@Component({
  selector: 'app-bookmark-list',
  imports: [CommonModule, MatIconModule],
  templateUrl: './bookmark-list.html',
  styleUrl: './bookmark-list.scss',
})
export class BookmarkList implements OnInit {
  private bookmarkService = inject(ListService);

  bookmarks$: Observable<BookmarkListCategory[]> = this.bookmarkService.items$;

  ngOnInit(): void {
    this.bookmarkService.loadItems();
  }
}
