import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './navigation/navigation';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'interviu';
  iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.iconRegistry.registerFontClassAlias('material-symbols-outlined');
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
