import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs';

import { Post } from '../post.model'
import { PostService } from '../posts.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
// posts = [
 // {title: "first title", content: "first - comment"},
 // {title: "second title", content: "second - comment"},
//  {title: "last title", content:  "last - comment"}
// ]

posts: Post[] = [];
isLoading = false;
private postsSub: Subscription;


constructor(public postService: PostService){}

ngOnInit() {
  this.isLoading = true;
  this.postService.getPosts();
  this.postsSub =
  this.postService.getPostUpdateListener()
  .subscribe((posts: Post[]) => {
    this.isLoading = false
    this.posts = posts;
    console.log(posts)
  });
}

onDelete(postId: string) {
  this.postService.deletePost(postId);
}

ngOnDestroy(){
  this.postsSub.unsubscribe()
}

}
