import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
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
  cantidad_selec:string;

   cantArray = new Array();
   cantidadStock:string[];

  cantidades:string[]=['1','2','3','4','5'];
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _cs:CarritoProvider,
              private viewCtrl:ViewController,
              private alertCtrl:AlertController) {

                // for (const item of _cs.items) {
                //       console.log("Stock", item.stock);
                //       this.cantArray = new Array(item.stock);
                //       for (let cantidadStock = 1; cantidadStock <= this.cantArray.length; cantidadStock++) {
                //         console.log("Cantidades Disponibles",cantidadStock);
                        
                        
                //       }
                      
                // }        
  }


 


        showPrompt() {
          const prompt = this.alertCtrl.create({
            title: 'Cantidad',
            message: "Ingrese una cantidad",
            inputs: [
              {
                name: 'Cantidad',
                placeholder: 'cantidad...',
                
              },
            ],
            buttons: [
              {
                text: 'Cancelar',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'Guardar',
                handler: data => {
                  console.log('Saved clicked',data);

                  // this.navCtrl.pop(data)
                }
              }
            ]
          });
          prompt.present();
        }
  }
  


  





