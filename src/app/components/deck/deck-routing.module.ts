import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeckListaComponent } from "./deck-lista/deck-lista.component";
import { DeckFormComponent } from "./deck-form/deck-form.component";
import { DeckDetalhesComponent } from "./deck-detalhes/deck-detalhes.component";

const routes: Routes = [
    { path: '', component: DeckListaComponent },
    { path: 'deck-form', component: DeckFormComponent },
    { path: 'deck-form/:id', component: DeckFormComponent },
    { path: 'deck-detalhes/:id', component: DeckDetalhesComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeckRoutingModule { }