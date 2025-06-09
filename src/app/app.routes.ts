import { Routes } from '@angular/router';
import { BookmarkList } from './bookmarks/bookmark-list/bookmark-list';

export const routes: Routes = [
 {
    path: '',
    pathMatch: 'full',
    component: BookmarkList
 }
];
