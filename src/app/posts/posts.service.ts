import { Injectable } from '@angular/core'
import {Subject} from 'rxjs'
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import { Post } from "./post.model";
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + "/posts/";


@Injectable({providedIn: 'root'})
export class PostService{

  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>()

  constructor(private http: HttpClient, private router: Router) {}


  getPosts(currentPage: number) {
    const queryParams = `?page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>(
        BACKEND_URL + queryParams
      )

      .subscribe(postData => {
        console.log(postData);
        this.posts = postData.posts
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: postData.maxPosts
        });
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string, imagePath: string, user: any }>(
      BACKEND_URL + id
    );
  }


  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http
      .post<{ message: string, post: Post }>(
        BACKEND_URL,
        postData
        )
      .subscribe(responseData => {
        this.router.navigate(["/"]);

      });

  }



  updatePost(_id: string, title: string, content: string, image: any) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("_id", _id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        _id: _id,
        title: title,
        content: content,
        imagePath: image,
        user: null
      };
    }


    this.http
      .put(BACKEND_URL + _id + "/update", postData)
      .subscribe(response => {

        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL+postId)

  }



}
