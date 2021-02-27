import { Injectable } from '@angular/core';
import { Post } from '../post.interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  listaPosts: Post[];

  constructor() {
    this.listaPosts = [
      { titulo: 'Basket in the Moon', texto: 'Va usté muy cargadoo al ataquerl diodeno no puedor a wan no te digo trigo por no llamarte Rodrigor te voy a borrar el cerito la caidita', autor: 'Cosme Ter', imagen: 'https://cdn.pixabay.com/photo/2020/03/10/16/47/moon-4919501_960_720.jpg', fecha: '1999-05-23', categoria: 'Deportes' },
      { titulo: 'Good for Me', texto: 'Va usté muy cargadoo al ataquerl diodeno no puedor a wan no te digo trigo por no llamarte Rodrigor te voy a borrar el cerito la caidita', autor: 'Josetxu Letón', imagen: 'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_960_720.jpg', fecha: '2000-10-20', categoria: 'Gastronomía' },
      { titulo: 'Cinema Paradis', texto: 'Va usté muy cargadoo al ataquerl diodeno no puedor a wan no te digo trigo por no llamarte Rodrigor te voy a borrar el cerito la caidita', autor: 'Charles Moló', imagen: 'https://cdn.pixabay.com/photo/2017/11/24/10/43/admission-2974645_960_720.jpg', fecha: '2004-04-25', categoria: 'Cine' }
    ];

    //Compruebo su tengo el array en LocalStorage
    if (localStorage.getItem('arr_posts')) {
      //recupero de LocalStorage el array
      const strArr = localStorage.getItem('arr_posts');
      this.listaPosts = JSON.parse(strArr);
    } else {
      //grupo tareas, creamos el arrTareas
      this.listaPosts = new Array();
    }
    // Llenamos el localStorage con los posts iniciales
    localStorage.setItem('arr_posts', JSON.stringify(this.listaPosts));
  }

  // Método para recoger todos los Posts
  getAllPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      resolve(this.listaPosts);
    });
  }

  // Método para filtar posts por categoría
  getPostByCategoria(pCategoria: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const arrFiltro = [];
      for (let post of this.listaPosts) {
        if (post.categoria === pCategoria) {
          arrFiltro.push(post);
        }
      }
      resolve(arrFiltro);
    });
  }

  // Método para obtener una categoría
  getCategoria(): string[] {
    const arrNuevo = this.listaPosts.map(post => post.categoria);
    return (arrNuevo);
  }

  add(agregarPost: Post) {
    this.listaPosts.push(agregarPost);
    console.log(this.listaPosts);

  }
  //Guardar los posts creados - localStorage
  onCreaPost($event) {
    this.listaPosts.push($event);
    console.log(this.listaPosts);
    const arrToString = JSON.stringify(this.listaPosts);
    localStorage.setItem('arr_posts', arrToString);
  }
}
