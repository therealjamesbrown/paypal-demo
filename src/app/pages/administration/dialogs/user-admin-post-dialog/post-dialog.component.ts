/**
 * 
 * ================================
 * ; Title: post-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User post dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserCreationService } from '../../services/user-creation.service'

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent implements OnInit {
  createUserForm: any
  roles: any
  selected: any
  role: any
  rolesDataSource;
  filteredRolesDataSource;

  constructor(private userCreationService: UserCreationService, private fb: FormBuilder, private http: HttpClient) { }


  ngOnInit() {
    this.userCreationService.get().subscribe(res => {
      this.roles = res['data']
    })


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


    this.createUserForm = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password:  [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      role: [null, Validators.required]
    })
  }
  createUser() {
    let newUser = {
      username: this.createUserForm.get('username').value,
      password: this.createUserForm.get('password').value,
      firstName: this.createUserForm.get('firstName').value,
      lastName: this.createUserForm.get('lastName').value,
      address: this.createUserForm.get('address').value,
      email: this.createUserForm.get('email').value,
      phoneNumber: this.createUserForm.get('phoneNumber').value,
      role: this.createUserForm.controls.role.value
    }
    this.userCreationService.post(newUser).subscribe(err => {
      if (err) console.log(err)
      else console.log("POST SUCCESS")
    }) 
    this.createUserForm.reset();
  }
  cancel() {

  }
}
