import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { URL_SERVICIOS } from "../../config/url.servicios";

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  
  items:any[];
  cantidad_selec:any;

  cantidades:string[]=['1','2','3','4','5'];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _cs:CarritoProvider,
              private viewCtrl:ViewController) {
          
                this.cantidad_selec='1';

  }
  
}

  





