import { Component } from '@angular/core';
import { Platform,ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage,HomePage,CategoriasPage} from "../app/index.pages";
import { CarritoProvider } from "../providers/carrito/carrito";
import { UsuarioProvider } from './index.services';

// oneSignal
import { PushnotificationProvider } from "../providers/notificaciones/pushnotification";


//import { HomePage } from '../pages/home/home';
import { CarritoPage } from '../pages/carrito/carrito';
import { NotificacionesPage } from '../pages/notificaciones/notificaciones';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  categoria= CategoriasPage;
  notificaciones = NotificacionesPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private _cs:CarritoProvider,
    private _us:UsuarioProvider,  
    private ModalCtrl:ModalController,
    private pushProvider:PushnotificationProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.pushProvider.init_notification();
    });


    
  }

  irACategoria(){
    this.ModalCtrl.create(this.categoria).present();

  }
  irAnotificaciones(){
    this.ModalCtrl.create(this.notificaciones).present();
  }



  
}

