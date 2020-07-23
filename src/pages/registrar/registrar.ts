import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  correo:string = "";
  contrasena:string= "";
  nombre_completo:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl:ViewController,
              private _us:UsuarioProvider,
              private ModalCtrl:ModalController) {
  }

  

  registrarMe(){
    this._us.registrarMe(this.nombre_completo,this.correo , this.contrasena)
    if (this._us.activo()) {
      this.viewCtrl.dismiss(true);
      
    }
    
  }

}
