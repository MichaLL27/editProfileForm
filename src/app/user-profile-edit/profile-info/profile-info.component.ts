import { Component, OnInit } from '@angular/core';
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
  constructor(private userServiceService: UserServiceService) {}

  profileInfo: any;

  ngOnInit(): void {
    this.userServiceService.getUserFormData().subscribe((x) => {
      console.log(x);
      this.profileInfo = x;
    });
  }
}
