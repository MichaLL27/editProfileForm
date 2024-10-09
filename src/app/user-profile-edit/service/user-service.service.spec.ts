import { TestBed } from '@angular/core/testing';
import { UserServiceService } from './user-service.service';
import { IMockDataInterface } from '../interface/mockData.interface';
import { of } from 'rxjs';

describe('UserServiceService', () => {
  let service: UserServiceService;

  const mockUserData: IMockDataInterface = {
    firstName: 'Michael',
    lastName: 'Lazarashvili',
    email: 'lazarashvili2704@gmail.com',
    phoneNumber: '595024131',
    profilePicture: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserServiceService],
    });
    service = TestBed.inject(UserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data from getUserFormData', (done) => {
    service.getUserFormData().subscribe((data) => {
      expect(data).toEqual(mockUserData);
      done();
    });
  });

  it('should update user data correctly', (done) => {
    const updatedData: IMockDataInterface = {
      firstName: 'Luka', // My brothers name
      lastName: 'Lazarashvili',
      email: 'lazarashvili02@gmail.com',
      phoneNumber: '598480585',
      profilePicture: 'new-profile.jpg',
    };

    service.updateUserFormData(updatedData).subscribe((data) => {
      expect(data.firstName).toBe('Luka');
      expect(data.lastName).toBe('Lazarashvili');
      expect(data.email).toBe('lazarashvili02@gmail.com');
      expect(data.phoneNumber).toBe('598480585');
      expect(data.profilePicture).toBe('new-profile.jpg');
      done();
    });
  });
});
