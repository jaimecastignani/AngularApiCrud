import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientReception } from './model/client-reception';
import { ClientPalet } from './model/client-palet';
import { Menu } from './model/menu';

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
  palets: ClientPalet[];
  sendIdPalet: number;
  idReception: number;
  isPalet: boolean = false;
  isListPendingReceptions: boolean = false;
  isLoadReceptionPalets: boolean = false;
  option: number;

  menuArry: Menu[] = [
    { id: 1, title: "Buscar Palet" },
    { id: 2, title: "Lista recepciones pendientes" },
    { id: 3, title: "Cargar recepciones palets" }
  ];

  constructor(private http: HttpClient) { }

  /**
   * funcion que se lanza al iniciar la pagina
   */
  ngOnInit() { }

  optionMenu(op: number) {
    this.option = op;
  }

  getPalet() {
    this.restItems = [];
    this.http.get<any>(this.restItemsUrl + 'searchPalet?idPalet=' + this.sendIdPalet, {
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
    this.restItems = [];
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

  getLoadReceptionPalets() {
    this.restItems = [];
    this.http.get<any>(this.restItemsUrl + 'loadReceptionPalets?idReception=' + this.idReception, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.palets = this.restItems;
          console.log(this.restItems);
        }
      )
  }
}