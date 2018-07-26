import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientReception } from './model/client-reception';
import { ClientPalet } from './model/client-palet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * Declaracion variables
   */

  title = 'app';
  /** lista de paises añadidos */
  listPendingReception: ClientReception[] = [];
  /** Respuest de la API */
  restItems: any;
  /** Url de la API */
  restItemsUrl = 'http://127.0.0.1:8080/typhon/rest/warehouse/helper/';
  /** Semafro para mostrar la tabla de resultado de la combo de paises */
  existPalet: boolean = false;
  /** Objeto ClientPalet */
  palet: ClientPalet;

  idPalet: string = "";

  constructor(private http: HttpClient) { }

  getPalet() {
    this.http.get<any>(this.restItemsUrl + 'searchPalet?idPalet=' + this.idPalet, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.palet = this.restItems;
          this.existPalet = true;
          console.log(this.restItems);
        }
      )
  }

  getListPendingReceptions() {
    this.http.get<any[]>(this.restItemsUrl + 'listPendingReceptions', {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.listPendingReception = this.restItems;
          console.log(this.restItems);
        }
      )
  }

  /**
   * funcion que se lanza al iniciar la pagina
   */
  ngOnInit() {
  }
  //test
}