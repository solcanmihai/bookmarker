import { ResolveFn } from '@angular/router';
import { ApiService } from './bookmarks/bookmarks';
import { inject } from '@angular/core';

export const bookmarkDetailsResolver: ResolveFn<any> = (route, state) => {
  const id = route.params['id'];
  const apiService = inject(ApiService);

  if (id === 'new') {
    return;
  }

  return apiService.get(`bookmarks/${id}`);
};
