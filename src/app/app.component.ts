import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClientReception } from './model/client-reception';
import { ClientPalet } from './model/client-palet';
import { Menu } from './model/menu';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { VersionProduct } from './model/version-product';

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
  /** Url de la API */
  restItemsUrl = 'http://127.0.0.1:8080/typhon/rest/warehouse/helper/';
  /** Objeto ClientPalet */
  palet: ClientPalet;
  palets: ClientPalet[];
  sendIdPalet: string = "";
  idReception: string = "";
  idContainer: string = "";
  isPalet: boolean = false;
  isListPendingReceptions: boolean = false;
  isLoadReceptionPalets: boolean = false;
  objetoArray: Object;
  error: boolean = false;
  p: number =  0;
  version: Object;
  versionProduct: VersionProduct[];

  /** Opciones de menu */
  option: number;
  menuArry: Menu[] = [
    { id: 1, title: "Buscar Palet" },
    { id: 2, title: "Lista recepciones pendientes" },
    { id: 3, title: "Cargar recepciones palets" },
    { id: 4, title: "Cargar palet de recepciones" },
    { id: 5, title: "Lista versiones en container" }
  ];

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  openModal(version: any, modal){
    this.version = version;
    this.modalService.open(modal);
  }

  /**
   * funcion que se lanza al iniciar la pagina
   */
  ngOnInit() { }

  optionMenu(op: number) {
    this.error = false;
    this.option = op;
    this.sendIdPalet = "";
    this.idReception = "";
    this.palets = [];
    this.objetoArray = [];
    this.listPendingReception = [];
    this.palet = new ClientPalet;
    this. p = 0;
  }

  initVars() {
    this.palet = new ClientPalet;
    this.error = false;
    this.listPendingReception = [];
    this.palets = [];
    this.objetoArray = [];
  }

  /** Buscar palet */
  getPalet() {
    this.initVars();
    this.http.get<any>(this.restItemsUrl + 'searchPalet?idPalet=' + this.sendIdPalet, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.palet = restItems;          
        }
      )
  }

  /** Lista de recepciones pendientes */
  getListPendingReceptions() {
    this.initVars();
    this.http.get<any[]>(this.restItemsUrl + 'listPendingReceptions', {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.listPendingReception = restItems;
        }
      )
  }

  /** Cargar palet de recepciones */
  getLoadReceptionPalets() {
    this.initVars();
    this.http.get<any>(this.restItemsUrl + 'loadReceptionPalets?idReception=' + this.idReception, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.palets = restItems;
        }
      )
  }

  /** Lista de versiones por recepcionar */
  getListVersionsReception() {
    this.initVars();
    this.http.get<any[]>(this.restItemsUrl + 'listVersionsReception?idReception=' + this.idReception, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.objetoArray = restItems;
        }
      )
  }

  /** Lista versiones en container */
  getVersionsInContainer() {
    this.initVars();
    this.http.get<any[]>(this.restItemsUrl + 'versionsInContainer?idContainer=' + this.idContainer, {
      headers: new HttpHeaders().set('Authorization',
        'ApiOPSAuthorization:QsZ6tYQS+d59/dZz9FqDyMYLuvaWeG4tVF4OhMGTAP8=')
    }).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.versionProduct = restItems;
        }
      )
  }
}