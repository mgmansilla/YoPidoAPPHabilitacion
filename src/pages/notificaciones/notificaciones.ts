import { Component, OnInit, ApplicationRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OSNotification, OSNotificationPayload } from '@ionic-native/onesignal';
import { PushnotificationProvider } from "../../providers/notificaciones/pushnotification";


@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage implements OnInit {
  mensajes:OSNotificationPayload[]=[];

  constructor(public navCtrl: NavController,public pushService:PushnotificationProvider,
    private applicationRef:ApplicationRef) {

  }

   ngOnInit(){
    this.pushService.pushListener.subscribe(noti =>{
      this.mensajes.unshift(noti);

      this.applicationRef.tick();
    })

    

  }
 async aionViewWillEnter(){

  console.log('will entre - cargar mensajes');
  this.mensajes= await  this.pushService.getMensajes();

  }


}
