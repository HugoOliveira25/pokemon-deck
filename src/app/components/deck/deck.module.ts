import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeckDetalhesComponent } from './deck-detalhes/deck-detalhes.component';
import { DeckListaComponent } from './deck-lista/deck-lista.component';
import { DeckFormComponent } from './deck-form/deck-form.component';
import { IgxCardModule, IgxDialogModule, IgxOverlayService } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DeckRoutingModule } from './deck-routing.module';

@NgModule({
    declarations: [
        DeckDetalhesComponent,
        DeckListaComponent,
        DeckFormComponent
    ],
    imports: [
        CommonModule,
        IgxCardModule,
        IgxDialogModule,
        ReactiveFormsModule,
        DeckRoutingModule
    ],
    providers: [IgxOverlayService],
})

export class DeckModule {

}