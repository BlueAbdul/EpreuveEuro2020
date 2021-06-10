import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { GameComponent } from './body/game/game.component';
import { CustomerFormComponent } from './body/customer-form/customer-form.component';

const routes: Routes = [
  {path:'', component: BodyComponent},
  {path:'game', component: GameComponent},
  {path:'fin', component: CustomerFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
