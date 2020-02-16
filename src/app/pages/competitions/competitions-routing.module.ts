import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompetitionsComponent} from './competitions.component';
import {CompetitionsTableComponent} from './competitions-table.component';
import {AdminGuard} from '../../@auth/admin.guard';
import {FinishCompetitionComponent} from './finish-component/finish.component';
import {AddCompetitionComponent} from './add-competition/add.component';
import {CompetitionsArchiveTableComponent} from './archive/competitions-archive-table.component';

const routes: Routes = [{
  path: '',
  component: CompetitionsComponent,
  children: [
    {
      path: 'list',
      canActivate: [AdminGuard],
      component: CompetitionsTableComponent,
    },
    {
      path: 'archive',
      canActivate: [AdminGuard],
      component: CompetitionsArchiveTableComponent,
    },
    {
      path: 'finish/:id',
      canActivate: [AdminGuard],
      component: FinishCompetitionComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: AddCompetitionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetitionsRoutingModule {

}
