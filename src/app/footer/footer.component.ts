import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  checked: boolean = false;
  version: Version = 'V1';

  constructor(private router: Router) {}

  toggle(): void {
    this.checked = !this.checked;
    switch (this.version) {
      case 'V1':
        this.version = 'V2';
        this.router.navigate(['tasks-v2']);
        break;
      case 'V2':
        this.version = 'V1';
        this.router.navigate(['tasks']);
    }
  }
}

export type Version = 'V1' | 'V2'
