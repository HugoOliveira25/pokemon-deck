import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListaComponent } from './components/deck-lista/deck-lista.component';
import { DeckFormComponent } from './components/deck-form/deck-form.component';
import { DeckDetalhesComponent } from './components/deck-dialog-detalhes/deck-detalhes.component';

const routes: Routes = [
  { path: '', redirectTo: '/deck-lista', pathMatch: 'full' },
  { path: 'deck-lista', component: DeckListaComponent },
  { path: 'deck-form', component: DeckFormComponent },
  { path: 'deck-form/:id', component: DeckFormComponent },
  { path: 'deck-detalhes/:id', component: DeckDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
