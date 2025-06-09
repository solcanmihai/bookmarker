import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkView } from './bookmark-view';

describe('BookmarkView', () => {
  let component: BookmarkView;
  let fixture: ComponentFixture<BookmarkView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
