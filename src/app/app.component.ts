import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from './model/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from './model/alumno';
import { map } from 'rxjs/operators';
import { Observable } from '../../node_modules/rxjs';

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
  idAlumno: number;
  p: number = 0;
  /** Opciones de menu */
  option: number;
  response: any;
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
  ngOnInit() {
    this.getAlumnos();
  }

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

  /** Crear alumno */
  create(alumno: Alumno) {
    alumno.idAlumno = null;
    this.http.put(this.restItemsUrl + 'create', alumno).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.response = restItems;
        }
      )
    this.getAlumnos();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  update(alumno: Alumno) {
    this.http.post<any>(this.restItemsUrl + 'update', alumno).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.alumnos = restItems;
        }
      )
    this.getAlumnos();
  }

  delete(idAlumno: number) {
    this.http.delete(this.restItemsUrl + 'delete?idAlumno=' + idAlumno).pipe(map(data => data))
      .subscribe(
        restItems => {
          this.response = restItems;
        }
      )
    this.getAlumnos();
  }
}