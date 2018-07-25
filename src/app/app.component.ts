import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Country } from './Classes/country';

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
  countryArray: Country[] = [];
  /** Respuest de la API */
  restItems: any;
  /** Url de la API */
  restItemsUrl = '127.0.0.1:8080/typhon/rest/warehouse/helper/searchPalet?idPalet=74';
  //restItemsUrl = 'https://restcountries.eu/rest/v2/all';
  /** Semafro para mostrar la tabla de resultado de la combo de paises */
  selected: boolean = false;
  /** Pais seleccionado en la combo evento CLICK */
  opcionSeleccionado: string = '';
  /** Objeto Pais */
  pais: Country;

  constructor(private http: HttpClient) { }

  /**
   * Cuando seleccionamos en la combo se captura el itme seleccionado y se 
   * compara con la lista que nos ha devuelto la API y poder mostrar una 
   * tabla con el resultado
   */
  capturar() {
    for (let country of this.restItems) {
      if (country.name == this.opcionSeleccionado) {
        this.pais = country;
        this.selected = true;
        break;
      }
    }
  }

  /**
   * funcion que se lanza al iniciar la pagina
   */
  ngOnInit() {
    this.getRestItems();
  }

  /**
   * Funcion que monta el Json resultante de la llamada de la API 
   * en el objeto con el que vamos a trabajar
   */
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }
  /**
   * Funcion que llamada a la API
   */
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }

  /**
   * Funcion para añadir en la tabla de añadidos
   */
  add() {
    this.countryArray.push(this.pais);
  }

  /**
   * Funcion que elimina de la tabla de añadidos
   * @param country 
   */
  remove(country: Country) {
    if (confirm('Estas seguro de que quieres eliminar este pais?')) {
      this.countryArray = this.countryArray.filter(x => x != country);
    }
  }
}