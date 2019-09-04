import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {

  private lists: List[] = [];

  constructor() {
    this.loadStorage();
  }

  getAll(){
    return this.lists;
  }

  getListsByState(completed:boolean):List[]{
    this.lists = this.lists.filter(l => l.completed === completed);
    return this.lists;
  }

  updateTitle(id:number, title:string):List[]{
    this.lists.find(l => l.id = id).title = title;
    this.saveStorage();
    return this.lists;
  }

  setNew(title:string){
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();
    return newList.id;
  }

  deleteList(listId:number):List[]{
    this.lists = this.lists.filter(l => l.id !== listId);
    this.saveStorage();
    return this.lists;
  }

  getListById(id:number | string){
    return this.lists.find(list => list.id === Number(id));
  }

  saveStorage(){
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  loadStorage(){
    const data = localStorage.getItem('data');
    if(data)
      this.lists = JSON.parse(localStorage.getItem('data'));
  }
}
