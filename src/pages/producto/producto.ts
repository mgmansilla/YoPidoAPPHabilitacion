import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";


@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  producto:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _cs:CarritoProvider,
              private viewController:ViewController) {

    console.log(this.navParams.get("producto"));
    this.producto = this.navParams.get("producto");
    
  }


}
