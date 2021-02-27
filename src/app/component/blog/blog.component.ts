import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/post.interface';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];
  postActual: number;
  listaCategorias: string[];

  constructor(private postService: PostService) {
    this.postActual = 0;
  }

  async ngOnInit() {
    try {
      const listaPosts = await this.postService.getAllPosts();
      this.posts = listaPosts;
    } catch (error) {
      console.log(error);
    }
    this.listaCategorias = this.postService.getCategoria();
  }

  onClick(siguiente) {
    if (siguiente) {
      this.postActual++;
    } else {
      this.postActual--;
    }
  }

  async onChange($event) {
    try {
      if ($event.target.value === 'todos') {
        this.posts = await this.postService.getAllPosts();
      } else {
        this.posts = await this.postService.getPostByCategoria($event.target.value);
      }
    } catch (error) {
      console.log(error);
    }
  }
  onClickCompleta(pPost) {
    pPost.completa = !pPost.completa; // a pPost si es true está completada, ! hace lo contrario
    localStorage.setItem('arr_posts', JSON.stringify(this.posts));
  }

  onClickEliminar(pIndice) {
    this.posts.splice(pIndice, 1);
    localStorage.setItem('arr_posts', JSON.stringify(this.posts));
  }
  pIndice = 0;

  onClickDelete() {
    this.posts = [];
    localStorage.removeItem('arr_posts');
  }
}
