import { Component, OnInit } from '@angular/core';
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
    ProfileInfoComponent,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.scss',
})
export class UserProfileEditComponent implements OnInit {
  constructor(private userServiceService: UserServiceService) {}
  ngOnInit(): void {
    this.userServiceService.getUserFormData().subscribe((data) => {
      this.userEditProfileForm.patchValue(data);
    });
  }

  userEditProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    profilePicture: new FormControl(null),
  });

  onFileSelected(event: any) {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      const imgUrl = event.target.result;
      this.userEditProfileForm.patchValue({ profilePicture: imgUrl });
    };
  }

  onSubmit() {
    if (this.userEditProfileForm.valid) {
      this.userServiceService
        .updateUserFormData(this.userEditProfileForm.value)
        .subscribe((updatedData) => {
          console.log('Form submitted and data updated:', updatedData);
        });
    }
  }
}
