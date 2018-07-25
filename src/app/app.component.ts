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
  countryArray: Country[]=[];
  /** Respuest de la API */
  restItems: any;
  /** Url de la API */
  restItemsUrl = 'https://restcountries.eu/rest/v2/all';
  /** Semafro para mostrar la tabla de resultado de la combo de paises */
  selected: boolean = false;
  /** Pais seleccionado en la combo evento CLICK */
  opcionSeleccionado: string='';
  /** Objeto Pais */
  pais: Country;
  
  constructor(private http: HttpClient) {}
  
  /**
   * Cuando seleccionamos en la combo se captura el itme seleccionado y se 
   * compara con la lista que nos ha devuelto la API y poder mostrar una 
   * tabla con el resultado
   */
  capturar() {
   for (let count of this.restItems) {
      if (count.name == this.opcionSeleccionado) {
        this.pais = count;
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

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http.get<any[]>(this.restItemsUrl).pipe(map(data => data));
  }

  /**
   * Funcion para añadir en la tabla de añadidos
   */
  add(){
    this.countryArray.push(this.pais);
  }

  /**
   * Funcion que elimina de la tabla de añadidos
   * @param coun 
   */
  remove(coun: Country){
    this.countryArray = this.countryArray.filter(x => x != coun);
    //this.pais = new Country();
  }
}