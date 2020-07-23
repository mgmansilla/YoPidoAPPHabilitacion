import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CarritoProvider } from "../../app/index.services";
import { Title } from '@angular/platform-browser';



@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  orden:any={};


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _cs:CarritoProvider,
    private alertCtrl:AlertController) {
 
    this.orden= this.navParams.get("orden");
 
 
  }
  borrar_orden(orden_id){
    this._cs.borrar_orden(orden_id)
                .subscribe((data:any )=>{

                  if (data.error) {
                    //error mostrar alerta
                    /*
                    this.alertCtrl.create({
                      title:"No se puede borrar esta orden",
                      subTitle:data.mensaje,
                      buttons:["Ok"]

                      
                    })*/
                  } else {
                    this.navCtrl.popToRoot();
                    
                  }
                })



  }

  

}
