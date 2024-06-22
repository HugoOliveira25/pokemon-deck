import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/models/card-model';
import { Deck } from 'src/app/models/deck-model';
import { DeckService } from 'src/app/services/deck-service';
import { PokemonService } from 'src/app/services/pokemon-service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss']
})

export class DeckFormComponent implements OnInit {
  deck: Deck = { name: '', cards: [] };
  cards: Card[] = [];
  cardSelecionado: Card | null = null;
  isEdit = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonTcgService: PokemonService,
    private deckService: DeckService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const deckId = Number(params.get('id'));
      if (deckId) {
        this.isEdit = true;
        const existingDeck = this.deckService.obterDeck(deckId);
        if (existingDeck) {
          this.deck = { ...existingDeck };
        }
      }
    });
    this.isLoading = true;
    this.pokemonTcgService.obterCards().subscribe(response => {
      this.cards = response.data.map((card: any) => ({
        name: card.name,
        supertype: card.supertype,
        types: card.types,
        img: card.images.small
      }));
      this.isLoading = false;
    },
      error => {
        console.log('Erro ao carregar dados: ', error)
      });
  }

  adicionarCard(): void {
    if (this.cardSelecionado) {
      const existingCard = this.deck.cards.find(card => card.name === this.cardSelecionado!.name);
      if (existingCard) {
        if (existingCard.count! < 4) {
          existingCard.count!++;
        }
      } else {
        this.deck.cards.push({ ...this.cardSelecionado, count: 1 });
      }
    }
  }

  removerCard(card: Card): void {
    const index = this.deck.cards.findIndex(c => c.name === card.name);
    if (index !== -1) {
      if (this.deck.cards[index].count! > 1) {
        this.deck.cards[index].count!--;
      } else {
        this.deck.cards.splice(index, 1);
      }
    }
  }

  get totalCards(): number {
    return this.deck.cards.reduce((total, card) => total + (card.count || 0), 0);
  }

  isDeckValid(): boolean {
    return this.totalCards >= 24 && this.totalCards <= 60;
  }

  onSubmit(): void {
    if (this.isDeckValid()) {
      if (this.isEdit) {
        this.deckService.editarDeck(this.deck);
      } else {
        this.deck.id = new Date().getTime();
        this.deckService.adicionarDeck(this.deck);
      }
      this.router.navigate(['/deck-lista']);
    }
  }

  voltar(): void {
    this.router.navigate(['/deck-lista']);
  }
}
