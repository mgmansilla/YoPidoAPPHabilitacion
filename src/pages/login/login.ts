import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ModalController} from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistrarPage } from '../registrar/registrar';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string = "";
  contrasena:string= "";
  Registrar = RegistrarPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl:ViewController,
              private _us:UsuarioProvider,
              private ModalCtrl:ModalController
              ) {

            //el view controller me ayuda para cerrar el modal por si quiero salir del login y no tengo usuario y contraseña para logearme    
  }
  
  ingresar(){
    this._us.ingresar(this.correo , this.contrasena)
    if (this._us.activo()) {
      this.viewCtrl.dismiss(true);
      
    }
    
  }


  irARegistrar(){
    this.ModalCtrl.create(this.Registrar).present();

  }

 
}
