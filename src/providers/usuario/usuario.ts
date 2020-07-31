import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

//url
import { URL_SERVICIOS } from "../../config/url.servicios";
//alert
import { AlertController,Platform } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { LoadingController } from 'ionic-angular';



@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;




  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              private platform:Platform,
              private storage:Storage,
              public loadingCtrl:LoadingController) {
    console.log('Hello UsuarioProvider Provider');
    this.cargar_storage();
  }


  //esta funcion me indica que si el usuario esta activo me da un token y me permite salir de la sesion

  activo():boolean{
    if (this.token && this.id_usuario) {
      return true;
        
    } else {
      return false;
      
    }

  }


  ingresar(correo:string,contrasena:string){

 

    let data = new FormData();
    data.append("correo",correo);
    data.append("contrasena",contrasena);
    let url = URL_SERVICIOS + "/inicio";
    return this.http.post( url, data )
      .subscribe( (resp:any) =>{
        let data_resp = resp;
        console.log(data_resp);
        if ( data_resp.error) {
          this.alertCtrl.create({
            title: "Error al iniciar",
            subTitle: data_resp.mensaje,
            buttons: ["Ok"]
            
          }).present();
        } else {
          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;
          //guardar storage
          this.guardar_storage();

        }

      });

  }

  registrarMe(nombre_completo:string,correo:string,contrasena:string){

 

    let data = new FormData();
    data.append("nombre_completo",nombre_completo);
    data.append("correo",correo);
    data.append("contrasena",contrasena);
    let url = URL_SERVICIOS + "inicio/registrar";
    return this.http.post( url, data )
      .subscribe( (resp:any) =>{
        let data_resp = resp;
        console.log(data_resp);
        if ( data_resp.error) {
          this.alertCtrl.create({
            title: "Error al Registrar Usuario",
            subTitle: data_resp.mensaje,
            buttons: ["Ok"]
            
          }).present();
        } else {

          this.alertCtrl.create({
            title: "Usuario Creado",
            subTitle: data_resp.mensaje,
            buttons: ["Ok"]
            
          }).present();

          this.token = data_resp.token;
          this.id_usuario = data_resp.id_usuario;
          //guardar storage
          this.guardar_storage();

        }

      });

  }

  cerrar_sesion(){

    this.token = null;
    this.id_usuario= null;

    //guardar en el storage
    this.guardar_storage();

  }


  private guardar_storage(){
    if (this.platform.is("Cordova")) {

      //dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);


      
      
    } else {
      //computadora
      if (this.token) {
        localStorage.setItem("token",this.token);
        localStorage.setItem("id_usuario",this.id_usuario);
        
      } else {

        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }

     

    }


  }

  cargar_storage(){
    let promesa = new Promise ((resolve)=>{

      if (this.platform.is("Cordova")) {
        //dispositivo
  
        //primero hay que ver que el almacenamiento este preparado
        this.storage.ready()
            .then(()=>{
            this.storage.get("token")
            //preguntamos si hay items y los mostramos
              .then(token =>{
          if (token) {
            this.token = token;
            
          }
         
        })

        this.storage.get("id_usuario")
        //preguntamos si hay items y los mostramos
          .then(id_usuario =>{
          if (this.id_usuario) {
          this.id_usuario = this.id_usuario;
        
      }
      resolve();
    })

      })


        
      } else {
        if (localStorage.getItem("token") && localStorage.getItem("id_usuario") )  {
          //existen items en el celular
          this.token= localStorage.getItem("token");
          this.id_usuario= localStorage.getItem("id_usuario");
        }
      
        resolve();
      }

    });
    return promesa;
    

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Espere un momento...",
      duration: 3000
    });
    loader.present();
  }

}
