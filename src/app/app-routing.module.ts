import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{SachComponent} from './sach/sach.component';
import{SachDetailComponent} from './sach/sachdetail.component';
import { GiohangComponent } from './giohang/giohang.component';

const routes: Routes = [
  { path: '', redirectTo: '/sach', pathMatch: 'full' },
  { path: 'sach', component: SachComponent },
  { path: 'sach/:id:searchstring', component: SachComponent},
  { path: 'sachdetail/:id', component:  SachDetailComponent},
  { path: 'giohang/:id', component:  GiohangComponent},
  { path: 'giohang', component:  GiohangComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})

export class AppRoutingModule { }
