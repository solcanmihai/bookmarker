import { Routes } from '@angular/router';
import { BookmarkList } from './bookmarks/bookmark-list/bookmark-list';
import { BookmarkView } from './bookmarks/bookmark-view/bookmark-view';
import { ListService } from './bookmarks/bookmarks';

export const routes: Routes = [
  {
    path: '',
    providers: [ListService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BookmarkList,
      },
      {
        path: ':id',
        component: BookmarkView,
      },
    ],
  },
];
