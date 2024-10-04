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

  onSubmit() {
    if (this.userEditProfileForm.valid) {
      console.log(this.userEditProfileForm.value);
    }
  }

  onFileSelected(event: any) {
    const file = event?.target?.files[0];
    if (file) this.userEditProfileForm.patchValue({ profilePicture: file });
  }
}
