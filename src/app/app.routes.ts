import { Routes } from '@angular/router';
import { BookmarkList } from './bookmarks/bookmark-list/bookmark-list';
import { BookmarkView } from './bookmarks/bookmark-view/bookmark-view';
import { ListService } from './bookmarks/bookmarks';
import { Navigation } from './navigation/navigation';
import { bookmarkDetailsResolver } from './bookmark-details-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Navigation,
    providers: [ListService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BookmarkList,
        data: { navVisible: true },
      },
      {
        path: ':id',
        component: BookmarkView,
        resolve: {
          bookmark: bookmarkDetailsResolver,
        },
        data: { navVisible: false },
      },
    ],
  },
];
