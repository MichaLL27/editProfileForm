import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

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
    profilePicture: null,
  };

  private profileSubject = new BehaviorSubject<any>(this.mockData);

  getUserFormData(): Observable<any> {
    return this.profileSubject.asObservable().pipe(delay(1000));
  }

  updateUserFormData(updatedData: any): Observable<any> {
    this.mockData = { ...this.mockData, ...updatedData };
    this.profileSubject.next(this.mockData);
    return of(this.mockData);
  }
}
