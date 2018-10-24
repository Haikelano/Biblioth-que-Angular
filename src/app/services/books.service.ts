import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Book} from '../models/book.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {P} from '@angular/core/src/render3';

@Injectable()
export class BooksService {
books: Book[] = [];
booksSubject = new Subject<Book[]>();
  constructor() { }
  /*en prend le contenut de la 'Books' et le met dans le subject*/
   emitBooks() {
         this.booksSubject.next(this.books);
  }
  saveBooks() {
     firebase.database().ref('/books').set(this.books);
     }
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }
removeBook(book: Book) {
     const bookIndexToRemove = this.books.findIndex(
       (bookEL) => {
         if ( bookEL === book ) {
           return true;
         }
       });
         this.books.splice(bookIndexToRemove, 1);
         this.saveBooks();
         this.emitBooks();
         }
            /*Promise utiliser pour faire une methode assuncrone qui'il une methode prend de temps */
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
  }
}
