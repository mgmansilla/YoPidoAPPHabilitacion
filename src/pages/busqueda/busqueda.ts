import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from "../../providers/productos/productos";
import { ProductoPage } from "../producto/producto";
@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  productoPage = ProductoPage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _ps:ProductosProvider) {
  }

  buscar_producto(evento:any){

    const valor = evento.target.value;
    console.log(valor);

    this._ps.buscar_producto(valor);
    
  }

}
