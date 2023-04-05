import { Injectable } from '@angular/core'
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";
//import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Post } from "./post.model";


@Injectable({providedIn: 'root'})
export class PostService{

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private router: Router) {}


  //getPosts(){
   // return [...this.posts];
  //}

  getPosts() {
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:33000/api/posts"
      )
     // .pipe(map((postData) => {
      //  return postData.posts.map(post => {
      //    return {
      //      title: post.title,
      //      content: post.content,
       //     _id: post._id
       //   };
      //  });
    //  }))
      .subscribe(postData => {
        //this.posts = transformedPosts;
        this.posts = postData.posts
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  //addPost(title: string, content: string){
   // const post: Post = {title: title, content: content};
   // this.posts.push(post);
   // this.postsUpdated.next([...this.posts]);
  //}

  addPost(title: string, content: string) {
    const post: Post = { _id: null, title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:33000/api/posts", post)
      .subscribe(responseData => {
        alert("successfully added a post")
        //const _id = responseData.postId;
        //post._id = _id;
       this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

      });

  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:33000/api/posts/" + id
    );
  }

  updatePost(_id: string, title: string, content: string) {
    const post: Post = { _id: _id, title: title, content: content };
    this.http
      .put("http://localhost:33000/api/posts/" + _id + "/update", post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p._id === post._id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:33000/api/posts/"+postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post._id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log('deleted')
      });
  }



}
