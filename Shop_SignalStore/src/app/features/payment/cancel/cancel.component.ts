import { Component } from '@angular/core';
import {ChevronRight, LucideAngularModule} from 'lucide-angular';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cancel',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './cancel.component.html',
  standalone: true,
  styleUrl: './cancel.component.scss'
})
export class CancelComponent {

  protected readonly ChevronRight = ChevronRight;
}
