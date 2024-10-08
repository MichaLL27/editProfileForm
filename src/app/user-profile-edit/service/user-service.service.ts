import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { IMockDataInterface } from '../interface/mockData.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor() {}

  private mockData: IMockDataInterface = {
    firstName: 'Michael',
    lastName: 'Lazarashvili',
    email: 'lazarashvili2704@gmail.com',
    phoneNumber: '595024131',
    profilePicture: '',
  };

  private profileSubject = new BehaviorSubject<IMockDataInterface>(
    this.mockData
  );

  getUserFormData(): Observable<IMockDataInterface> {
    return this.profileSubject.asObservable().pipe(delay(2000));
  }

  updateUserFormData(
    updatedData: IMockDataInterface
  ): Observable<IMockDataInterface> {
    this.mockData = { ...this.mockData, ...updatedData };
    this.profileSubject.next(this.mockData);
    return of(this.mockData);
  }
}
