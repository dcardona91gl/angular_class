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

  setNew(title:string){
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();
    return newList.id;
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
