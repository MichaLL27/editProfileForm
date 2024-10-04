import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}

  private mockData = {
    firstName: 'Michael',
    lastName: 'Lazarashvili',
    email: 'lazarashvili2704@gmail.com',
    phoneNumber: '595024131',
  };

  getUserFormData(): Observable<any> {
    return of(this.mockData).pipe(delay(1000));
  }
}
