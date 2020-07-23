
import { Injectable, EventEmitter } from '@angular/core';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal';

// Storage
import { Storage } from '@ionic/storage';


import { Platform } from "ionic-angular";
@Injectable()
export class PushnotificationProvider {

  mensajes:OSNotificationPayload[]=[
    
    // {
    //   title:'Titulo de la push',
    //   body:'Este es el body de la push',
    //   date:new Date()
    // }

  ];

  // Este userId me sirve para obtener el id unico del usuario para poder mandar notificaciones a ese usuario

  userdID :string;

  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal,public platform:Platform,
              private storage:Storage) {

                this.cargarMensajes();
  }

 async getMensajes(){

   await this.cargarMensajes();
   return [...this.mensajes];
  }
 
   init_notification(){

    
      
    this.oneSignal.startInit('04f163eb-a02c-4890-9403-81ca67cf5638', '1058624285851');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe( (noti ) => {
       console.log('Notificacion Recibida', noti);
       this.notificacionRecibida(noti);
       
    });
    
    this.oneSignal.handleNotificationOpened().subscribe( async(noti ) => {
      console.log('Notificacion abierta', noti );
     await this.notificacionRecibida(noti.notification);
    });
    
    // Obtener id del suscriptor
    
    this.oneSignal.getIds().then(info =>{
      this.userdID = info.userId;
      console.log(this.userdID);
      
    })




    this.oneSignal.endInit();
    


   }


   async notificacionRecibida(noti:OSNotification ){

   await this.cargarMensajes();

    // Cuando me llega una notificacion lo que yo tengo que hacer es extraer el payload
    const payload =noti.payload;

    // prevenir notificacion duplicadas

    const exitePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

    if (exitePush) {
      return;
    }

    this.mensajes.unshift(payload);

    this.pushListener.emit(payload);

    await this.guardarMensajes();
    


   }

  //  Guardar mensajes en el local storage
   guardarMensajes(){

    this.storage.set('mensajes',this.mensajes);

   }


  //  Cargamos los mensajes caso contrarios retornamos un array vacio
   async cargarMensajes(){
      this.mensajes= await  this.storage.get('mensajes') || [];

      return this.mensajes;
   }


}
