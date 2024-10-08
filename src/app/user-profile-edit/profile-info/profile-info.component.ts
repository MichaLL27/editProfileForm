import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from '../../spinner/service/loading.service';
import { IMockDataInterface } from '../interface/mockData.interface';

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

  getUserFormData$!: Observable<IMockDataInterface>;

  ngOnInit(): void {
    this.getUserFormData$ = this.userServiceService.getUserFormData();
  }

  editProfileInfo() {
    this.editProfile.emit(true);
  }
}
