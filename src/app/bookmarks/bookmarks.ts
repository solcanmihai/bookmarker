import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { BookmarkListCategory } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import Fuse from 'fuse.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/api';

  private http = inject(HttpClient);

  get<T = any>(url: string, options: Parameters<HttpClient['get']>[1] = {}, myOptions?: any) {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { ...options, ...myOptions });
  }

  post<T = any>(
    url: string,
    body: any,
    options: Parameters<HttpClient['post']>[2] = {},
    myOptions?: any,
  ) {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, { ...options, ...myOptions });
  }

  put<T = any>(
    url: string,
    body: any,
    options: Parameters<HttpClient['post']>[2] = {},
    myOptions?: any,
  ) {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, { ...options, ...myOptions });
  }
}

@Injectable()
export class ListService<T> {
  private items = new BehaviorSubject<T[]>([]);
  private searchTerm = new BehaviorSubject<string>('');
  private router = inject(Router);

  private itemOpen = new BehaviorSubject(false);
  public itemOpen$ = this.itemOpen.asObservable();
  private fuse!: any;

  public items$ = this.items.asObservable().pipe(
    switchMap(items => {
      this.fuse = new Fuse(items, { keys: ['title', 'url'] });

      return this.searchTerm.pipe(
        map(searchTerm => {
          if (searchTerm?.length) {
            return this.searchItems(items, searchTerm);
          } else {
            return this.groupItemsByDate(items);
          }
        }),
      );
    }),
  );

  private apiService = inject(ApiService);

  private searchItems(items: any[], searchTerm: string): BookmarkListCategory[] {
    return [
      {
        title: `Results for: ${searchTerm}`,
        items: this.fuse.search(searchTerm).map((el: any) => el.item),
      },
    ];
  }

  private groupItemsByDate(items: any[]): BookmarkListCategory[] {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const midnightDatestamp = midnight.getTime() / 1000;

    const groupedItems = items.reduce(
      (acc, item) => {
        const itemDate = item.creationDate;

        if (itemDate >= midnightDatestamp) {
          acc.today.push(item);
        } else if (itemDate >= midnightDatestamp - 60 * 60 * 24) {
          acc.yesterday.push(item);
        } else if (itemDate < midnightDatestamp - 60 * 60 * 24) {
          acc.older.push(item);
        }

        return acc;
      },
      {
        today: [],
        yesterday: [],
        older: [],
      },
    );

    return [
      { title: 'Today', items: groupedItems.today },
      { title: 'Yesterday', items: groupedItems.yesterday },
      { title: 'Older', items: groupedItems.older },
    ];
  }

  loadItems() {
    this.apiService.get<T[]>('bookmarks').subscribe((data: any) => {
      this.items.next(data);
    });
  }

  createBookmark(info: any, activatedRoute: ActivatedRoute) {
    return this.apiService.post('bookmarks', info).pipe(
      tap(() => {
        this.router.navigate(['..'], { relativeTo: activatedRoute });
      }),
    );
  }
  updateBookmark(info: any, activatedRoute: ActivatedRoute) {
    return this.apiService.put('bookmarks', info).pipe(
      tap(() => {
        this.router.navigate(['..'], { relativeTo: activatedRoute });
      }),
    );
  }

  search(term: string) {
    this.searchTerm.next(term);
  }
}
