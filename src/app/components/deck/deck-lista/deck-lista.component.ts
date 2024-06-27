import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Deck } from 'src/app/models/deck-model';
import { DeckService } from 'src/app/services/deck-service';

@Component({
  selector: 'app-deck-lista',
  templateUrl: './deck-lista.component.html'
})

export class DeckListaComponent implements OnInit {
  decks$!: Observable<Deck[]>;

  constructor(private deckService: DeckService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.decks$ = this.deckService.decks$;
  }

  verDatalhes(deckId: number): void {
    this.router.navigate(['/deck-detalhes', deckId]);
  }

  editarDeck(deckId: number): void {
    this.router.navigate(['/deck-form', deckId]);
  }

  deletarDeck(deckId: number): void {
    this.deckService.deletarDeck(deckId);
  }

  criarDeck(): void {
    this.router.navigate(['/deck-form']);
  }
}