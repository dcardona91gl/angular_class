import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'stateFilter',
  pure: false
})
export class StateFilterPipe implements PipeTransform {

  transform(lists: List[], completed: boolean = true): List[] {
    return lists.filter(l => l.completed == completed);
  }

}
