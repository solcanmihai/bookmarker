import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  addIds(items: any[]) {
    return items.map(item => ({...item, id: `${item.name} - ${item.url}`}))
  }

  createDb() {
    let bookmarks = [
      {
        name: 'Test',
        url: 'http://www.google.com',
        creationDate: 1749363374
      },
      {
        name: 'Test 2',
        url: 'http://www.google.com',
        creationDate: 1749363074
      }
    ];

    return this.addIds(bookmarks);
  }
} 