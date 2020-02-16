
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { StarterMenuComponent } from './analytics/starter.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'analytics',
      component: StarterMenuComponent,
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'competitions',
      loadChildren: () => import('./competitions/competitions.module')
        .then(m => m.CompetitionsModule),
    },
    {
      path: 'events',
      loadChildren: () => import('./events/events.module')
        .then(m => m.EventsModule),
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

