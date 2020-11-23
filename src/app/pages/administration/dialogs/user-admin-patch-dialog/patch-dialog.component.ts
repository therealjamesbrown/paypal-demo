/**
 * 
 * ================================
 * ; Title: patch-dialog.component.ts
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Date: 10/14/2020
 * ; Description: User patch dialog component
 * ================================
 * 
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { UserCreationService } from '../../services/user-creation.service'
import { User } from '../../interfaces/user.interface'

@Component({
  selector: 'app-patch-dialog',
  templateUrl: './patch-dialog.component.html',
  styleUrls: ['./patch-dialog.component.css']
})
export class PatchDialogComponent implements OnInit {
  user: User
  constructor(private userCreationService: UserCreationService, private cookieService: CookieService, private http: HttpClient) { }

  ngOnInit() { }
  cancel() {

  }
  delete() {
    let id = this.cookieService.get('id')
    this.userCreationService.getUserById(id).subscribe(res => {
      if (res) {
        this.user = res['data']
      } else {
        console.log("No User Found")
      }
    })
    this.userCreationService.patch(id, this.user).subscribe(err => {
      if (err) console.log(err)
     else console.log("DELETE Success")
   }) 
  }
}
