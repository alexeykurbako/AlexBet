import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../../@auth/admin.guard';
import {EventsComponent} from './events.component';
import {BetComponent} from '../bet/bet.component';
import {EventsTableComponent} from './events-table.component';
import {BetsTableComponent} from "../bet/bets/bets-table.component";

const routes: Routes = [{
  path: '',
  component: EventsComponent,
  children: [
    {
      path: 'list',
      component: EventsTableComponent,
    },
    {
      path: 'bet/:id',
      component: BetComponent,
    },
    {
      path: 'bets/list',
      component: BetsTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {

}

