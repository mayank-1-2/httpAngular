
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService  {
  instanceUrl:string = 'https://concretio-4c-dev-ed.lightning.force.com/';

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // let query = 'SELECT Id, Name FROM Contact';
    // let BASE_URL =this.instanceUrl +( "/services/data/v49.0/query/?q=" + query);
    // let headers = new HttpHeaders()
    // headers=headers.set("Api-User-Agent", "Example/1.0")
    // headers=headers.set('Authorization', `Bearer ${this.userSessionToken}`);
    // headers=headers.set('Accept', "application/json")
    // headers=headers.set('content-type','application/json')
    // ////console.log('headers ::=>'+headers)
    // return this.http.get (BASE_URL,{'headers' : headers});
    // throw new Error('Method not implemented.');
  }

  


  createPost(title: string, content: string) {

    const postData: { title: string; content: string; id?: string } = { title: title, content: content }
    this.http
      .post(
        'https://angular-first-548cf-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  FetchPost() {
    return this.http.get<{ [key: string]: { title: string; content: string; id?: string } }>('https://angular-first-548cf-default-rtdb.firebaseio.com/posts.json', {
      headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
      observe: 'body'
    })
      .pipe(map((responseData) => {
        console.log(responseData);
        const postArray: { title: string; content: string; id?: string }[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        // console.log(responseData);
        return postArray;
      }))
  }
}
