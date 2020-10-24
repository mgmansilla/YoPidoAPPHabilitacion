import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { URL_SERVICIOS } from "../../config/url.servicios";


@Injectable()
export class ProductosProvider {
  
  pagina:number=0;
  productos:any[]=[ ];
  lineas:any[]=[];
  por_categoria:any[]=[];
  resultados:any[]=[];

  constructor(public http: HttpClient ) {
    this.cargar_todos();
    this.cargar_lineas();
    
  }

  /*
  cargar_lineas(){


    let url = URL_SERVICIOS + "/lineas";

    this.http.get('url')
          .map( data => data )
          .subscribe((data:any)=>{
            console.log(data);
      
      if (data.error) {
      console.log(data.error);
      
        
      } else {
      
        this.lineas = data.lineas;
        console.log(this.lineas);
        
        
        
      }
     
      
      })
      
}*/

cargar_lineas(){
  let url=URL_SERVICIOS+"/lineas";
  this.http.get(url).subscribe(data=>{
      if(data['error']){
        console.log("ERROR EN :"+URL_SERVICIOS+"/lineas");
      }else{
      console.log(data);
      this.lineas.push(...data['lineas']);
  }
  });
           
           
}

cargar_por_categoria(categoria : string){

let url = URL_SERVICIOS + "/productos/por_tipo/"+ categoria;

this.http.get(url)
         .map(data =>data)
         .subscribe((data:any) =>{
           console.log(data.productos);
           this.por_categoria = data.productos;
           
         })



}

  
  cargar_todos(){

    return new Promise((resolve, reject)=>{
 
     let url =URL_SERVICIOS + "/productos/todos/" + this.pagina;
 
     
     this.http.get(url)
              
             .map( data => data )
             .subscribe((data:any)=>{
               console.log(data);
 
         if (data.error) {
 
           
         } else {
 
           let nuevaData = this.agrupar(data.productos,2);
 
           this.productos.push(...nuevaData);//nuevaData);
           this.pagina = this.pagina + 1;
           
           
         }
         resolve();
 
         })
 
 
 
     });
 
     //con esta variable llamamo a la url para que nos muestre dinamicamente pagina por pag
 
   }
   private agrupar(arr:any,tamano:number) {
       let nuevoARreglo=[];
 
       for (let i = 0; i < arr.length; i+=tamano) {
           nuevoARreglo.push(arr.slice(i,i+tamano));
 
       }
       console.log(nuevoARreglo);
       return nuevoARreglo;
       
   }

   buscar_producto(termino:string){

    let url = URL_SERVICIOS + "/productos/buscar/" + termino;

    this.http.get(url)
        .subscribe((resp:any)=>{

          let data = resp;

          this.resultados = data.productos;

        });
   }


  

}
