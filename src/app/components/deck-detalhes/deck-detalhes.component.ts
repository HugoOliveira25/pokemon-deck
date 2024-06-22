import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/models/card-model';
import { DeckService } from 'src/app/services/deck-service';

@Component({
  selector: 'app-deck-dialog-detalhes',
  templateUrl: './deck-detalhes.component.html',
  styleUrls: ['./deck-detalhes.component.scss']
})

export class DeckDetalhesComponent implements OnInit {
  deck: { id?: number, name: string, cards: Card[] } | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckService: DeckService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const deckId = Number(params.get('id'));
      this.deck = this.deckService.obterDeck(deckId);
    });
  }

  get totalCards(): number {
    return this.deck ? this.deck.cards.reduce((total, card) => total + (card.count || 0), 0) : 0;
  }

  get totalPokemonCards(): number {
    return this.deck ? this.deck.cards.filter(card => card.supertype === 'Pokémon').reduce((total, card) => total + (card.count || 0), 0) : 0;
  }

  get totalTrainerCards(): number {
    return this.deck ? this.deck.cards.filter(card => card.supertype === 'Trainer').reduce((total, card) => total + (card.count || 0), 0) : 0;
  }

  get uniqueTypes(): string[] {
    return this.deck ? [...new Set(this.deck.cards.flatMap(card => card.types))] : [];
  }

  voltar(): void {
    this.router.navigate(['/deck-lista']);
  }
}
