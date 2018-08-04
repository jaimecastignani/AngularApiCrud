import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Menu } from './model/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from './model/alumno';

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
  /** Url de la API */
  restItemsUrl = 'http://localhost:8080/ApiRest/escuela/';
  alumno: Alumno;
  alumnos: Alumno[];
  objetoArray: Object[];
  p: number = 0;
  /** Opciones de menu */
  option: number;

  menuArry: Menu[] = [
    { id: 1, title: "Lista Alumnos" }
  ];

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  openModal(alumno: any, modal) {
    this.alumno = alumno;
    this.modalService.open(modal);
  }

  /**
   * funcion que se lanza al iniciar la pagina
   */
  ngOnInit() { }

  optionMenu(op: number) {
    this.option = op;
    this.p = 0;
    this.alumno = new Alumno;
    this.alumnos = [];
  }

  initVars() {
    this.alumno = new Alumno;
    this.alumnos = [];
  }

  /** Buscar alumnos */
  getAlumnos() {
    this.http.get<any>(this.restItemsUrl + 'alumnos').pipe(map(data => data))
      .subscribe(
        restItems => {
          this.alumnos = restItems;
        }
      )
  }
}