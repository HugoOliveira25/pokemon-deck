import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Deck } from '../models/deck-model';

@Injectable({
    providedIn: 'root'
})
export class DeckService {
    private decks: Deck[] = [];
    private decksSubject = new BehaviorSubject<Deck[]>(this.decks);
    decks$ = this.decksSubject.asObservable();

    adicionarDeck(deck: Deck) {
        this.decks.push(deck);
        this.decksSubject.next(this.decks);
    }

    editarDeck(updatedDeck: Deck) {
        const index = this.decks.findIndex(deck => deck.id === updatedDeck.id);
        if (index !== -1) {
            this.decks[index] = updatedDeck;
            this.decksSubject.next(this.decks);
        }
    }

    deletarDeck(deckId: number) {
        this.decks = this.decks.filter(deck => deck.id !== deckId);
        this.decksSubject.next(this.decks);
    }

    obterDeck(deckId: number): Deck | undefined {
        return this.decks.find(deck => deck.id === deckId);
    }
}
