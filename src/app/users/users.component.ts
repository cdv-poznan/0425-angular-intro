import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public followers$: Observable<string[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit(): void {
    const navigation$ = this.router.events.pipe(filter(event => event instanceof NavigationStart));

    const followers$ = this.activatedRoute.paramMap.pipe(
      map(paramsMap => paramsMap.get('login') ?? 'juszczak'),
      switchMap(login => this.usersService.getUserFollowers(login)),
    );

    this.followers$ = merge(navigation$.pipe(mapTo(null)), followers$);

    // this.login = this.activatedRoute.snapshot.paramMap.get('login') ?? 'juszczak';
  }
}
