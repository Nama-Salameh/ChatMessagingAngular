import { Component, EventEmitter, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../environments/environment';

import { Router } from '@angular/router';
import { AdminService } from '../adminService/admin.service';

@Component({
  selector: 'app-admin-selector',
  templateUrl: './admin-selector.component.html',
  styleUrls: ['./admin-selector.component.css'],
})
export class AdminSelectorComponent {
  @Output() adminSelected = new EventEmitter<string>();
  selectedAdminId: string = '';
  admins: any[] = [];
  firestore: firebase.firestore.Firestore;

  constructor(private router: Router, private adminService: AdminService) {
    firebase.initializeApp(environment.firebaseConfig);
    this.firestore = firebase.firestore();
    this.loadAdmins();
  }

  loadAdmins() {
    this.admins = this.adminService.admins;
  }

  selectAdmin(adminId: string) {
    this.selectedAdminId = adminId;
    this.router.navigate(['/conversation'], {
      queryParams: { adminId: adminId },
      // skipLocationChange: true,
    });
  }
}
