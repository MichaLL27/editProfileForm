import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  @Output() editProfile = new EventEmitter<boolean>();
  constructor(private userServiceService: UserServiceService) {}
  profileInfo: any;


  ngOnInit(): void {
    this.userServiceService.getUserFormData().subscribe((data) => {
      this.profileInfo = data;
    });
  }

  editProfileInfo() {
    this.editProfile.emit(true);
  }
}
