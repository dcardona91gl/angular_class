import { Component } from '@angular/core';
import { WishesService } from 'src/app/services/wishes.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { isNumber } from 'util';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  lists:List[];
  listCompletedState:boolean = true;

  constructor(private wishes:WishesService,
              private router:Router,
              private alertControler:AlertController) {}

  async newList(){
    const alert = await this.alertControler.create({
      header: 'Nueva tarea',
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "Ingresa el titulo"
        }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {}
        },
        {
          text: 'Crear',
          handler: (data) => {
            if(data.title.length > 0){
              const id = this.wishes.setNew(data.title);
              isNumber(id) && this.goToListPage(id);
            } 
          } 
        }
      ]
    });

    alert.present();
  }

  goToListPage(id:number){
    this.router.navigate(['/tabs/tab1/new', id])
  }

}
