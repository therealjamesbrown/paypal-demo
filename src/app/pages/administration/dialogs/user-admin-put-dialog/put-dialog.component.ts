/**
 * 
 * ================================
 * ; Title: put-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User put dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { UserCreationService } from '../../services/user-creation.service'
import { UserprofileService } from 'src/app/pages/services/userprofile.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
}

@Component({
  selector: 'app-put-dialog',
  templateUrl: './put-dialog.component.html',
  styleUrls: ['./put-dialog.component.css']
})
export class PutDialogComponent implements OnInit {
  updatedUserForm: FormGroup
  user: any
  roles: any
  selected: any
  rolesDataSource;
  filteredRolesDataSource;

  
  constructor(private userCreationService: UserCreationService, private cookieService: CookieService, private http: HttpClient, private fb: FormBuilder, private userProfileService: UserprofileService) {

   }
  ngOnInit() {
    this.userCreationService.get().subscribe(res => {
      this.roles = res['data']
      //console.log(this.roles);
    });

    
    this.userCreationService.getAllUserRoles().subscribe(res =>{
      console.log(res.data);
      //get all the roles and set it to our initial data array
      this.rolesDataSource = res.data;

      //Initialize the new array, filter out the disabled ones, and pushed the active ones into the new array
      this.filteredRolesDataSource = [];
      for (let role of this.rolesDataSource){
        if(role.isDisabled !== true){
          this.filteredRolesDataSource.push(role);
        }
      }
      //console.log(this.filteredSecurityQuestionsDataSource);
    })


    this.updatedUserForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password:  [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      role: [null, Validators.required]
    })
   /* let id = this.cookieService.get('updateId')
    this.http.get(`http://localhost:3000/api/user/${id}`).subscribe(user => {
      this.user = user['data']
    }) */
  }
  updateUser() {
    let updatedUser = {
      username: this.updatedUserForm.get('username').value,
      password: this.updatedUserForm.get('password').value,
      firstName: this.updatedUserForm.get('firstName').value,
      lastName: this.updatedUserForm.get('lastName').value,
      address: this.updatedUserForm.get('address').value,
      email: this.updatedUserForm.get('email').value,
      phoneNumber: this.updatedUserForm.get('phoneNumber').value,
      role: this.updatedUserForm.controls.role.value
    }
    let id = this.cookieService.get('id')
    this.userCreationService.put(id, updatedUser).subscribe(err => {
      if (err) console.log(err)
      else console.log("UPDATE Success")
    })
    this.updatedUserForm.reset();
  }
}
