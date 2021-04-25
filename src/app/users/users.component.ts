import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public followers$: Observable<string[]>;

  constructor(private activatedRoute: ActivatedRoute, private usersService: UsersService) {}

  ngOnInit(): void {
    this.followers$ = this.activatedRoute.paramMap.pipe(
      map(paramsMap => paramsMap.get('login') ?? 'juszczak'),
      switchMap(login => this.usersService.getUserFollowers(login)),
    );

    // this.login = this.activatedRoute.snapshot.paramMap.get('login') ?? 'juszczak';
  }
}
