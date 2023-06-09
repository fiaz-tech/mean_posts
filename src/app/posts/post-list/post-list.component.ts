import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { Post } from '../post.model'
import { PostService } from '../posts.service'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {


posts: Post[] = [];
isLoading = false;
totalPosts = 0;
postsPerPage = 2;
userId: string;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
userIsAuthenticated = false;
private postsSub: Subscription;
private authStatusSub: Subscription;


constructor(public postService: PostService, private authService: AuthService){}

ngOnInit() {
  this.isLoading = true;
  this.postService.getPosts(this.currentPage);
  this.userId = this.authService.getUserId();
  this.postsSub =
  this.postService.getPostUpdateListener()
  .subscribe((postData: {posts: Post[], postCount: number}) => {
    this.isLoading = false;
    this.totalPosts = postData.postCount;
    this.posts = postData.posts;
    //console.log(this.posts)
  });
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
    isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    }
  )



}

onChangedPage(pageData: PageEvent) {

  //console.log(pageData)
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postService.getPosts(this.currentPage);
}

onDelete(postId: string) {
  this.isLoading = true;
  this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.currentPage);
    });
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
  this.authStatusSub.unsubscribe();
}

}
