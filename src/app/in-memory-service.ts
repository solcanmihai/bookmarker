import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class InMemoryService implements InMemoryDbService {
  // addIds(items: any[]) {
  //   return items.map(item => ({ ...item, id: `${item.name} - ${item.url}` }));
  // }

  createDb() {
    let bookmarks = [
      {
        id: uuidv4(),
        title: 'Test',
        url: 'http://www.google.com',
        creationDate: 1749363074 + 60 * 60 * 36,
      },
      {
        id: uuidv4(),
        title: 'Test',
        url: 'http://www.google.com',
        creationDate: 1749363074 + 60 * 60 * 48,
      },
      {
        id: uuidv4(),
        title: 'Test 2',
        url: 'http://www.google.com',
        creationDate: 1749363074 + 60 * 60 * 24,
      },
      {
        id: uuidv4(),
        title: 'Test 3',
        url: 'http://www.google.com',
        creationDate: 1749363074,
      },
    ];

    return { bookmarks };
  }

  genId() {
    return uuidv4();
  }
}
