import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxCardModule, IgxDialogModule, IgxOverlayService } from 'igniteui-angular';
import { DeckDetalhesComponent } from './components/deck-detalhes/deck-detalhes.component';
import { DeckListaComponent } from './components/deck-lista/deck-lista.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeckFormComponent } from './components/deck-form/deck-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckDetalhesComponent,
    DeckListaComponent,
    DeckFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IgxCardModule,
    IgxDialogModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [IgxOverlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
