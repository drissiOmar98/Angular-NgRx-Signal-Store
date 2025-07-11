import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    CommonModule
  ],
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit {
  isDarkTheme = false;

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    this._themeService.isDarkTheme$.subscribe(
      isDark => this.isDarkTheme = isDark
    );
  }

  toggleTheme() {
    this._themeService.toggleTheme();
  }
}
