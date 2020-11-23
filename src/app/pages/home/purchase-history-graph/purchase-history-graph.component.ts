/**
 * 
 * ================================
 * ; Title: Purchase-history-graph
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: component responsible for purchase history graph 
 * ================================
 * 
 */


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserprofileService } from '../../services/userprofile.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-purchase-history-graph',
  templateUrl: './purchase-history-graph.component.html',
  styleUrls: ['./purchase-history-graph.component.css']
})
export class PurchaseHistoryGraphComponent implements OnInit {

  purchases: any;
  data: any;
  itemCount = [];
  labels = [];
  username: any = this.cookieService.get('sessionuser');

  constructor(
    private userProfileService: UserprofileService,
    private cookieService: CookieService) {

    //call the purchaseGraph api
    //console.log('i fired')
    //console.log(this.username);
      this.userProfileService.getUserPurchasesByGraph(this.username).subscribe(res => {
        this.purchases = res['data'];
        console.log(this.purchases);
        //set a cookie that we'll grab from the parent component to hide the graph if no data is present.
        //this is helpful for new users.
        if(this.purchases.length === 0){
          this.cookieService.set('hidegraph', 'nodata', 1);
          //console.log('i fired');
        } else {
          this.cookieService.set('showGraph', 'true', 1);
        }

        //loop the purchases
        for (const item of this.purchases){
          this.labels.push(item._id.title);
          this.itemCount.push(item.count);
        }

        this.data = {
          labels: this.labels,
          datasets: [
            //graph object
            {
              data: this.itemCount,
              backgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7',
                '#F1B60E'
              ],
              hoverBackgroundColor: [
                '#ED0A3F',
                '#FF8833',
                '#5FA777',
                '#0066CC',
                '#6B3FA0',
                '#AF593E',
                '#6CDAE7',
                '#F1B60E'
              ],
            }
          ]
        };
      })
   }

  ngOnInit(): void {
  }

}
