import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserServiceService } from './service/user-service.service';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LoadingService } from '../spinner/service/loading.service';
import { delay, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IMockDataInterface } from './interface/mockData.interface';

@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    ProfileInfoComponent,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss',
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  constructor(
    private userServiceService: UserServiceService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) {}

  profileInfo: boolean = true;
  imgUrl?: string;
  getUserFormDataSubscription$!: Subscription;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.loadingService.show();
    this.getUserFormDataSubscription$ = this.userServiceService
      .getUserFormData()
      .subscribe({
        next: (data) => {
          this.loadingService.hide();
          this.userEditProfileForm.patchValue(data);
        },
        error: (error) => {
          this.loadingService.hide();
          alert('Failed to load user data. Please try again.');
        },
      });
  }

  userEditProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    profilePicture: new FormControl(''),
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          this.userEditProfileForm.patchValue({
            profilePicture: event.target.result as string,
          });
        }
      };
    }
  }

  onSubmit() {
    if (this.userEditProfileForm.valid) {
      const sanitizedData: IMockDataInterface = {
        firstName: this.userEditProfileForm.get('firstName')?.value || '',
        lastName: this.userEditProfileForm.get('lastName')?.value || '',
        email: this.userEditProfileForm.get('email')?.value || '',
        phoneNumber: this.userEditProfileForm.get('phoneNumber')?.value || '',
        profilePicture:
          this.userEditProfileForm.get('profilePicture')?.value || '',
      };

      this.loadingService.show();
      this.userServiceService
        .updateUserFormData(sanitizedData)
        .pipe(delay(2000))
        .subscribe({
          next: (updatedData: IMockDataInterface) => {
            this.loadingService.hide();
            this.profileInfo = true;

            // Succes message
            this.snackBar.open('Profile updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            this.loadingService.hide();

            // Error message
            this.snackBar.open(
              'Failed to update profile. Please try again.',
              'Close',
              {
                duration: 3000,
                panelClass: ['error-snackbar'],
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
          },
        });
    }
  }

  cancelButton() {
    this.getUserData();
  }

  onEditProfile() {
    this.profileInfo = false;
  }

  ngOnDestroy(): void {
    this.getUserFormDataSubscription$.unsubscribe();
  }
}
