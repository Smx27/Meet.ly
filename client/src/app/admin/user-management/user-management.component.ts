import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModelComponent } from 'src/app/models/roles-model/roles-model.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  bsModelRef:BsModalRef<RolesModelComponent> = new BsModalRef<RolesModelComponent>(); 
  availableRoles = [
    'Admin',
    'Moderator',
    'Member'
  ]

  constructor(private adminService:AdminService, private modelService:BsModalService) { }

  ngOnInit(): void {
    this.getUserWithRole();
  }

  getUserWithRole(){
    this.adminService.getUserWithRole().subscribe({
      next: users => this.users = users
    })
  }

  openRolesModel(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState:{
        userName: user.username,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]
      }
    }
    this.bsModelRef = this.modelService.show(RolesModelComponent, config);
    this.bsModelRef.onHidden?.subscribe({
      next: () => {
        const selectedRoles = this.bsModelRef.content!.selectedRoles;
        if(!this.arrayCheck(selectedRoles,user.roles)){
          this.adminService.updateUserRole(user.username,selectedRoles.join(',')).subscribe({
            next: ()=> console.log('success')
          })
        }
      }
    })
  }
  private arrayCheck(arr1:any[], arr2:any[]){
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
