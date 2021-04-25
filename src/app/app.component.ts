import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-intro';

  constructor(private router: Router) {
    console.log(router);
  }

  randomNavigation(): void {
    this.router.navigate(['home', Math.random()]); // /home/1
    // this.router.navigateByUrl('/home/123');
  }
}
