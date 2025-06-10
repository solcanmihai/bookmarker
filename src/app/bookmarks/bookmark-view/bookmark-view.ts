import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { ListService } from '../bookmarks';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bookmark-view',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './bookmark-view.html',
  styleUrl: './bookmark-view.scss',
})
export class BookmarkView {
  private activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  private bookmarkService = inject(ListService);
  private cdr = inject(ChangeDetectorRef);

  public bookmarkForm = this.fb.group({
    id: [this.activatedRoute.snapshot.data?.['bookmark']?.id],
    creationDate: [this.activatedRoute.snapshot.data?.['bookmark']?.creationDate],
    title: [this.activatedRoute.snapshot.data?.['bookmark']?.title ?? '', Validators.required],
    url: [
      this.activatedRoute.snapshot.data?.['bookmark']?.url ?? '',
      [Validators.required /** TODO: maybe custom url validator? */],
    ],
  });

  isNew$ = this.activatedRoute.params.pipe(
    map(params => {
      if (params['id'] === 'new') {
        return true;
      }
      return false;
    }),
  );

  createOrUpdateBookmark() {
    const body: any = this.bookmarkForm.value;
    this.isNew$
      .pipe(
        take(1),
        switchMap(isNew => {
          if (isNew) {
            body.creationDate = Date.now() / 1000;
            return this.bookmarkService.createBookmark(body, this.activatedRoute);
          } else {
            return this.bookmarkService.updateBookmark(body, this.activatedRoute);
          }
        }),
      )
      .subscribe(res => console.log(res));
  }
}
