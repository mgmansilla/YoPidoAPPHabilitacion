import { Component } from '@angular/core';
import { OrdenesPage,HomePage,CategoriasPage } from "../../app/index.pages";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = HomePage;
  tab2 = CategoriasPage;
  tab3 = OrdenesPage;
  tab4 = "BusquedaPage";//lo invoco directamente como esta en el modulobusqueda

 
  

}
