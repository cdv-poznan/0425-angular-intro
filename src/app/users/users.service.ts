import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public getUserFollowers(login: string): Observable<string[]> {
    const url = `https://api.github.com/users/${login}`;
    return this.httpClient.get<any>(url).pipe(
      switchMap(user => this.httpClient.get<any[]>(user.followers_url)),
      map(followers => followers.map(follower => follower.login)),
    );
  }
}
