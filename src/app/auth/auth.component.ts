import { HttpClient, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('email') public emailInput: ElementRef<HTMLInputElement>;
  public usersResponse$: Observable<HttpResponse<any>>;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get('https://api.github.com/users/juszczak')
      .pipe(
        map((response: { followers_url: string }) => response.followers_url),
        switchMap(followersUrl => this.httpClient.get(followersUrl)),
        map((followers: any[]) => followers.map(follower => follower.login)),
      )
      .subscribe(console.log);

    const url = 'https://reqres.in/api/users';
    this.usersResponse$ = this.httpClient.get(url, {observe: 'response', responseType: 'json'});
    this.usersResponse$.subscribe(console.log);
    this.login('eve.holt@reqres.in', 'cityslicka').subscribe(console.log);
  }

  ngAfterViewInit(): void {
    const keys$ = fromEvent(this.emailInput.nativeElement, 'keyup').pipe(
      map(event => (event.target as HTMLInputElement).value),
      // throttleTime(2000),
      debounceTime(1000),
      // sampleTime(1000),
      switchMap(email => this.isEmailTaken(email)),
    );

    keys$.subscribe(console.log);
  }

  public isEmailTaken(value: string): Observable<boolean> {
    console.log(value);
    return of(true);
  }

  public login(email: string, password: string): Observable<HttpResponse<any>> {
    const url = 'https://reqres.in/api/login';
    const body = { email, password };

    return this.httpClient.post(url, body, { observe: 'response', responseType: 'json' });
  }
}
