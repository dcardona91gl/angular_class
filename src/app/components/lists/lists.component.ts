import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { WishesService } from '../../services/wishes.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList) listElement:IonList;
  @Input() completed:boolean = false;
  lists:List[] = [];

  constructor(private router:Router,
              private alertControler:AlertController,
              public wishes:WishesService){
                this.lists = this.wishes.getAll();
              }

  
  goToListPage(id:number){
    this.router.navigate([`/tabs/tab${this.completed ? '2' : '1'}/new`, id])
  }

  
  async editListTitle(list:List){
    const alert = await this.alertControler.create({
      header: 'Nuevo titulo',
      inputs: [
        {
          name: "title",
          type: "text",
          value: list.title,
          placeholder: "Ingresa el nuevo titulo"
        }
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => this.listElement.closeSlidingItems()
        },
        {
          text: 'Editar',
          handler: (data) => {
            if(data.title.length > 0){
              this.lists = this.wishes.updateTitle(list.id, data.title);
              this.listElement.closeSlidingItems();
            } 
          } 
        }
      ]
    });

    alert.present();
  }

  deleteList(listId:number){
    this.lists = this.wishes.deleteList(listId);
  }

  ngOnInit() {
    //this.lists = this.wishes.getListsByState(this.completed);
  }

}
