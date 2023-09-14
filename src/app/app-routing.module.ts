import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WouldYouRatherComponent } from './would-you-rather/would-you-rather.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'would-you-rather', component: WouldYouRatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
