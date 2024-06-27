import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/deck-lista', pathMatch: 'full' },
  {
    path: 'deck-lista',
    loadChildren: () => import('./components/deck/deck.module').then(m => m.DeckModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
