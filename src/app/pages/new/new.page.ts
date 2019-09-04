import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { WishesService } from '../../services/wishes.service';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  public list:List;
  public itemTitle:string = '';

  constructor(private route:ActivatedRoute,
              private wishes:WishesService) {
    //this.route.params.subscribe((data:any)=> this.getListInfo(data.listId));
    const listId = this.route.snapshot.paramMap.get('listId');
    this.getListInfo(listId);
  }

  getListInfo(id:number | string){
    this.list = this.wishes.getListById(id);
  }

  addNewItem(){
    if(this.itemTitle.length > 0){
      const listItem = new ListItem(this.itemTitle);
      this.list.items.push(listItem);
      this.itemTitle = '';
      this.wishes.saveStorage();
    }
  }

  updateStatus(){
    if(this.list.items.filter(i => i.completed === false).length == 0){
      this.list.completedAt = new Date();
      this.list.completed = true;
    }else{
      this.list.completedAt = null;
      this.list.completed = false;
    }

    this.wishes.saveStorage();
  }

  deleteItem(index:number){
    this.list.items.splice(index, 1);
    this.wishes.saveStorage();
  }

  ngOnInit() {
  }

}
