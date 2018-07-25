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
  
  countryArray: Country[]=[];

  title = 'app';
  restItems: any;
  //restItemsUrl = 'https://restcountries.eu/rest/v2/region/europe';
  restItemsUrl = 'https://restcountries.eu/rest/v2/all';
  selected: boolean = false;
  constructor(private http: HttpClient) {}
  
  // Seleccionamos o iniciamos el valor '0' del <select>
  opcionSeleccionado: string='';
  pais: Country;
  
  capturar() {

   for (let count of this.restItems) {
      if (count.name == this.opcionSeleccionado) {
        this.pais = count;
        this.selected = true;
        break;
      }
    }
  }
  
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
  add(){
    this.pais.id = this.countryArray.length + 1;
    this.countryArray.push(this.pais);
  }
}