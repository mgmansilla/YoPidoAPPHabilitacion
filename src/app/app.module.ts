import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductosProvider } from '../providers/productos/productos';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CarritoProvider } from '../providers/carrito/carrito';
import { PushnotificationProvider } from "../providers/notificaciones/pushnotification";
import { HttpClientModule } from '@angular/common/http';
//pipes
import { PipesModule } from "../pipes/pipes.module";
//paginas
import {CarritoPage,CategoriasPage,OrdenesDetallePage,OrdenesPage,PorCategoriasPage,TabsPage,LoginPage} from "../../src/app/index.pages";
import { ProductoPage } from "../pages/producto/producto";
//almacenamiento
import { IonicStorageModule } from '@ionic/storage';

import { BusquedaPage } from '../pages/busqueda/busqueda';
import { RegistrarPage } from '../pages/registrar/registrar';
import { NotificacionesPage } from "../pages/notificaciones/notificaciones";
// oneSignal
import { OneSignal } from '@ionic-native/onesignal';

// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { WhatssapPage } from '../pages/whatssap/whatssap';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductoPage,
    CarritoPage,
    CategoriasPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    TabsPage,
    LoginPage,
    BusquedaPage,
    RegistrarPage,
    NotificacionesPage,
    WhatssapPage,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductoPage,
    CarritoPage,
    CategoriasPage,
    OrdenesDetallePage,
    OrdenesPage,
    PorCategoriasPage,
    TabsPage,
    LoginPage,
    BusquedaPage,
    RegistrarPage,
    NotificacionesPage,
    WhatssapPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductosProvider,
    UsuarioProvider,
    CarritoProvider,
    PushnotificationProvider,
    OneSignal,
  ]
})
export class AppModule {}
