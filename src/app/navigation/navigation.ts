import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListService } from '../bookmarks/bookmarks';
import { ActivatedRoute, ActivationEnd, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, map, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit {
  searchControl = new FormControl('');
  bookmarkService = inject(ListService);
  private destroyRef = inject(DestroyRef);

  // bookmarkOpen$ = inject(ListService).itemOpen$;
  showSearch$ = inject(Router).events.pipe(
    filter(e => e instanceof ActivationEnd),
    startWith(new ActivationEnd(inject(ActivatedRoute).snapshot)),
    map((e: ActivationEnd) => {
      let snapshot = e.snapshot;
      while (snapshot.firstChild) {
        snapshot = snapshot.firstChild;
      }
      return snapshot.data['navVisible'] as boolean;
    }),
    distinctUntilChanged(),
  );
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap((val: string | null) => {
          this.bookmarkService.search(val ?? '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
