export type Bookmark = {
  id: string;
  name: string;
  url: string;
};

export type ListCategory<T> = {
  title: string;
  items: T[];
};

export type BookmarkListCategory = ListCategory<Bookmark>;
