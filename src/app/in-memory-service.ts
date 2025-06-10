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

  private currentTimestamp = Date.now() / 1000;

  createDb() {
    const bookmarks = [
      {
        id: '70798e82-b16f-4c57-b821-c26e3c047612',
        title: 'Test 4',
        url: 'http://www.google.com',
        creationDate: this.currentTimestamp - 60 * 60 * 36,
      },
      {
        id: 'abc6ec36-0081-4607-bc22-710107eb6633',
        title: 'Test',
        url: 'http://www.google.com',
        creationDate: this.currentTimestamp - 60 * 60 * 48,
      },
      {
        id: '1357761a-b4f8-4d3d-823e-453d24d415d8',
        title: 'Test 2',
        url: 'http://www.google.com',
        creationDate: this.currentTimestamp - 60 * 60 * 24,
      },
      {
        id: '50826ed2-0b63-4d11-9b1a-2dbc357ca527',
        title: 'Test 3',
        url: 'http://www.google.com',
        creationDate: this.currentTimestamp - 1000,
      },
    ];

    return { bookmarks };
  }

  genId() {
    return uuidv4();
  }
}
