import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { BookmarkListCategory, ListCategory } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/api';

  private http = inject(HttpClient);

  get<T = any>(url: string, options: Parameters<HttpClient['get']>[1] = {}, myOptions?: any) {
    return this.http.get<T>(`${this.baseUrl}/${url}`, options);
  }
}

@Injectable()
export class ListService<T> {
  private items = new BehaviorSubject<T[]>([]);
  private searchTerm = new BehaviorSubject<string>('');

  public items$ = this.items.asObservable().pipe(
    switchMap(items =>
      this.searchTerm.pipe(
        map(searchTerm => {
          if (searchTerm?.length) {
            return this.searchItems(items, searchTerm);
          } else {
            return this.groupItemsByDate(items);
          }
        }),
      ),
    ),
  );

  private apiService = inject(ApiService);

  private searchItems(items: any[], searchTerm: string): BookmarkListCategory[] {
    return [{ title: `Results for: ${searchTerm}`, items }];
  }

  private groupItemsByDate(items: any[]): BookmarkListCategory[] {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const midnightDatestamp = midnight.getTime() / 1000;

    let groupedItems = items.reduce(
      (acc, item) => {
        let itemDate = item.creationDate;

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
    this.apiService.get<any>('bookmarks').subscribe(data => {
      // console.log(data);
      this.items.next(data);
    });
  }
}
