import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient, private createpost: PostsService) { }

  ngOnInit() {
    this.createpost.FetchPost().subscribe(posts => {
      this.loadedPosts = posts;
    });
  }

  onCreatePost(postData: { title: string; content: string; id?: string }) {
    // Send Http request
    this.createpost.createPost(postData.title, postData.content);
  }

  instanceUrl:string = 'https://concretio-4c-dev-ed.lightning.force.com';
  
  userSessionToken = "00D5g000002FlkG!AQoAQH9Isr3rIeMVtvLKf6l7p263FCHq7pOo7P5DVx1Kg7Tz7xd8QjJjroaJlQwpUtgh6ME1EzQA1t_zDG48OBlHUIWJGHo6";


  salesforceLogin(){
    let query = 'SELECT Id, Name FROM Contact';
    let BASE_URL =this.instanceUrl +( "/services/data/v49.0/query/?q=" + query);
    let headers = new HttpHeaders()
    headers=headers.set("Api-User-Agent", "Example/1.0")
    headers=headers.set('Authorization', `Bearer ${this.userSessionToken}`);
    headers=headers.set('Accept', "application/json")
    headers=headers.set('content-type','application/json')
    headers=headers.set('Access-Control-Allow-Origin','*')
    console.log(headers)
     this.http.get (BASE_URL,{'headers' : headers}).subscribe(res =>{console.log(res)});
  }


  // salesforceLogin() {
  //   var param = {
  //     grant_type: "password",
  //     client_id : "3MVG9fe4g9fhX0E6V0e5Qn.hwhUkab8kQ4o7OIH506LRZbVMCseo._mWxKvv6ht9mRiBqoUa6.Mr3W7fDOGQB",
  //     client_secret : "18203CD6729D0C2CCF521FE49159FF18BD7320329F9C3AA0EA79EAA5386403CA",
  //     username:"mmmayankmishra26@gmail.com",
  //     password:"Mayank@123"
  //   }
   

  //   this.http
  //     .post(
  //       "https://concretio-4c-dev-ed.lightning.force.com/services/oauth2/token",
  //       param, 
  //       {
  //         headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'}),
  //         observe: 'response'
  //       }
  //     )
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //     },(error)=>{
  //       console.log(error);
  //     });
  // }

  onFetchPosts() {
    // Send Http request
    this.createpost.FetchPost()
    .subscribe(posts => { this.loadedPosts = posts }
      , error => {
        console.log(error);
        
    });
  }

  onClearPosts() {
    // Send Http request
  }


}
