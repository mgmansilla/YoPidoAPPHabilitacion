import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform,ModalController} from 'ionic-angular';
//storage
import { Storage } from '@ionic/storage';
//servicio de login
import { UsuarioProvider } from "../usuario/usuario";
//paginas del carrito
import { CarritoPage,LoginPage } from "../../app/index.pages";
import { URL_SERVICIOS } from "../../config/url.servicios";

import { Observable } from 'rxjs/Observable';



@Injectable()
export class CarritoProvider {

  items:any[]=[];
  total_carrito:number=0;
  ordenes:any[]=[];
  subtotal:Number;
  //data:Observable<any>;
  producto_id:string;
  cantidad:string;
 
  precio:Number;
  subtotalGeneral:Number;
  total:number;

  // array del stock
   cantidad_selec:string;
   cantArray = new Array();
   cantidadStock:string[];

 

  constructor(public http: HttpClient,
              private alertCtrl:AlertController,
              private platform:Platform,
              private storage: Storage,
              private _us:UsuarioProvider,
              private modalCtrl:ModalController,
             ) {
                this.cargar_storage();
                this.actualizar_total();
                
  }

  // elimina el item X del carrito 
  remove_item (idx:number){

    this.items.splice(idx,1);
    this.actualizar_total();
    this.guardar_storage();
  }


//realizar el pedido 
  realizar_pedido(){
    let data = new FormData();
    let codigos:string[]=[];
   // let fecha = new Date();
    this.guardar_storage();
      
   for (let item of this.items) {

    codigos.push(item.codigo,item.cantidad,item.precio_compra);
      
      
    }
    console.log(codigos);
    data.append("items",codigos.join(","));
    console.log(codigos.join(","));
      
  let url = `${URL_SERVICIOS}/pedidos/realizar_orden/${this._us.token}/${this._us.id_usuario}?vv=${Date.now()}`;

//Con este mandamos los datos en un json    
    return this.http.post( url, data )
      .subscribe( (resp:any) =>{
        console.log(this.items);
        let data_resp = resp;
        console.log(data_resp);
        if ( data_resp.error) {
          this.alertCtrl.create({
            title: "Error en la orden",
            subTitle: data_resp.mensaje,
            buttons: ["Ok"]
            
          }).present();
        } else {
          console.log(this.items);
          this.items = [];
          this.alertCtrl.create({
            title: 'Orden realizada',
            subTitle: 'Contactaremos con usted en breve.',
            buttons: ['ok']
          }).present();

          //this.producto_id = data_resp.producto_id;
          //this.cantidad = data_resp.cantidad;
          //guardar storage
          this.guardar_storage();
          
        }

        this.reset_storage();
      });

 
          
  }

  //funcion para poder vizualizar el carrito y en su defecto poder logearse
  ver_carrito(){

    let modal:any;
    if (this._us.token) {
      //mostrar la pagina del carrito por que trae el token del usuario
     modal= this.modalCtrl.create(CarritoPage);

    } else {
      //mostrar el login por que no esta logeado
     modal= this.modalCtrl.create(LoginPage);
      
    }
    modal.present();
    //una vez que se logea muestra el carrito 

    // le decimos que el carrito tiene un valor buleano true y abre el carrito
    modal.onDidDismiss( (abrirCarrito:boolean)=>{

      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
        
      }


    })

  }

  //agrega al carrito y lo guarda en el storage
  agregar_carrito(item_parametro:any){
    item_parametro.cantidad = '1';
    this.alertCtrl.create({
      title:"Producto Agregado",
      subTitle:item_parametro.producto + ", Producto agregado al carrito...",
      buttons:["OK"]
    }).present();
    for (let item of this.items) {
      if (item.codigo == item_parametro.codigo) {
        this.alertCtrl.create({
          title:"Item existente",
          subTitle:item_parametro.producto + ", ya se encuentra en su carrito de compra",
          buttons:["OK"]
        }).present();
        return;
      }
      
    }
    this.items.push(item_parametro);
    this.actualizar_total();
    this.guardar_storage();
  }

  bajarCantidadProducto(item_parametro:any){
    for (let item of this.items) {
      if(item.codigo == item_parametro.codigo){
        item.cantidad --;
        
      }
    }
  }

  aumentarCantidadProducto(item_parametro:any){
    for (let item of this.items) {
      if(item.codigo == item_parametro.codigo){
        item.cantidad ++;
        
      }
    }
  }

  calcular_subtotal(cantidad,precio,subtotal){
 
     return subtotal=Number(cantidad *precio) ;
  }
  
  actualizar_total2(){

    this.total = this.items.reduce((
      acc,
      item,
    ) => acc + (item.precio_compra * item.cantidad),
    0);
    console.log("Total: ", this.total)
    return this.total;
  }



  actualizar_total(){ 
    this.total_carrito =0;
    this.items.forEach(item => {
    this.total_carrito += Number(item.precio_compra);
    });
    console.log('Total:',this.total_carrito);
    return Number(this.total_carrito);
 
    
  }


  private guardar_storage(){
    if (this.platform.is("Cordova")) {

      //dispositivo
      this.storage.set('items', this.items);

      
      
    } else {
      //computadora

      localStorage.setItem("items",JSON.stringify(this.items));
    }


  }
  private reset_storage(){
    if (this.platform.is("Cordova")) {

      //dispositivo
      //this.storage.clear(); esto borra todo incluyendo el token y user que hizo secion
      this.storage.remove("items");

      
      
    } else {
      //computadora

      //localStorage.clear();
      localStorage.removeItem("items");
    }


  }

  cargar_storage(){
    let promesa = new Promise ((resolve)=>{

      if (this.platform.is("Cordova")) {
        //dispositivo
  
        //primero hay que ver que el almacenamiento este preparado
        this.storage.ready()
            .then(()=>{
            this.storage.get("items")
            //preguntamos si hay items y los mostramos
              .then(items =>{
          if (items) {
            this.items = items;
            
          }
          resolve();
        })
      })
        
      } else {
        if (localStorage.getItem("items")) {
          //existen items en el celular
          this.items= JSON.parse(localStorage.getItem("items"));
        }
      
        resolve();
      }

    });
    return promesa;
    

  }

  cargar_ordenes(){

    let url = `${URL_SERVICIOS}/pedidos/obtener_pedidos/${this._us.id_usuario}/${this._us.token}`;
    this.http.get(url)
      
      .subscribe((resp:any)=>{        
        if (resp['error']) {

          //hay un error
          
        } else {

          this.ordenes=resp.ordenes;
          
        }

      })
  }

  borrar_orden(orden_id:string){

    let url= `${URL_SERVICIOS}/pedidos/borrar_pedido/${this._us.token}/${this._us.id_usuario}/${orden_id}`;

    return this.http.delete(url);
                
  }

  recorrerStock(stock){
 
    this.cantArray = new Array(stock);
    
       
       let alert = this.alertCtrl.create();
       alert.setTitle('Ingrese las Cantidades');
       for (let cantidadStock=1 ; cantidadStock <= this.cantArray.length; cantidadStock++) {
       alert.addInput({
         type: 'checkbox',
         label:''+cantidadStock,
         value:''+cantidadStock,
         checked: false
       });
       console.log("Cantidades Disponibles",cantidadStock);
     }
   
       alert.addButton('Cancel');
       alert.addButton({
         text: 'Okay',
         handler: data => {
           console.log('Checkbox data:', data);
           this.cantidad=data;
         }
       });
       alert.present();
             
     }



}
