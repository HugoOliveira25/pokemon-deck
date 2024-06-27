import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from 'src/app/models/card-model';
import { Deck } from 'src/app/models/deck-model';
import { DeckService } from 'src/app/services/deck-service';
import { PokemonService } from 'src/app/services/pokemon-service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html'
})

export class DeckFormComponent implements OnInit {
  deck: Deck = { name: '', cards: [] };
  cards: Card[] = [];
  cardSelecionado!: string;
  isEdit = false;
  isLoading: boolean = false;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonTcgService: PokemonService,
    private deckService: DeckService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nomeBaralho: ['', Validators.required],
      carta: ['']
    });

    this.form.controls['nomeBaralho'].valueChanges.subscribe(value => this.deck.name = value);
    this.form.controls['carta'].valueChanges.subscribe(value => this.cardSelecionado = value);

    this.route.paramMap.subscribe(params => {
      const deckId = Number(params.get('id'));
      if (deckId) {
        this.isEdit = true;
        const existingDeck = this.deckService.obterDeck(deckId);

        if (existingDeck) {
          this.form.controls['nomeBaralho'].setValue(existingDeck.name);
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
      var card = this.cards.find(card => card.name === this.cardSelecionado);
      if (card) {
        const existingCard = this.deck.cards.find(deckCard => deckCard.name === card?.name);
        if (existingCard) {
          if (existingCard.count! < 4) {
            existingCard.count!++;
          }
        } else {
          this.deck.cards.push({ ...card, count: 1 });
        }
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

  salvar(): void {
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
