import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Deck } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }

  getDeck() {
      return this.http.get<Deck>("https://www.deckofcardsapi.com/api/deck/new/");
  }

  getCard(deckid: string){
    return this.http.get<any>("https://www.deckofcardsapi.com/api/deck/" + deckid + "/draw/?count=1")
  }

}
