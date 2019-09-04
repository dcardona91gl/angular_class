import { NgModule } from '@angular/core';
import { StateFilterPipe } from './state-filter.pipe';

@NgModule({
  declarations: [StateFilterPipe],
  exports: [StateFilterPipe]
})
export class PipesModule { }
