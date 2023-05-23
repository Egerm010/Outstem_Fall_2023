import { Component } from '@angular/core';
import { DeckService } from './deck.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'card_game_Eric_Germond';
  deck_of_cards: any;

  constructor(private deckService: DeckService) {}

  createDeck() {
  this.deckService.getDeck().subscribe((data: Deck) => {
    this.deck_of_cards = data;
    console.log(this.deck_of_cards);});
}

  pullCard() {
    var validityChecker = (<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1);
    if(validityChecker != "b" && validityChecker != "r"){
      this.pullCard();
    }
    this.deckService.getCard(this.deck_of_cards.deck_id).subscribe((data: any) => {
     
      if(data.cards[0].suit == "SPADES" || data.cards[0].suit == "CLUBS") {
        if((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "b")  {
          (<HTMLInputElement>document.getElementById("response")).value = "";
          document.getElementById("submit_button")?.remove();
          document.getElementById("Question")!.innerHTML = "Correct!";
          var continues = document.createElement('button');
          continues.innerHTML = "Click to continue.";
          continues.id = "continue_button";
          continues.addEventListener('click',() => {this.secondQuestion(data.cards[0].value)});
          document.body.appendChild(continues);
        }
        else {
          document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
        }
      }

      else if(data.cards[0].suit == "DIAMONDS" || data.cards[0].suit == "HEARTS") {
        if((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "r")  {
          (<HTMLInputElement>document.getElementById("response")).value = "";
          document.getElementById("submit_button")?.remove();
          document.getElementById("Question")!.innerHTML = "Correct!";
          var continues = document.createElement('button');
          continues.innerHTML = "Click to continue.";
          continues.id = "continue_button";
          continues.addEventListener('click',() => {this.secondQuestion(data.cards[0].value)});
          document.body.appendChild(continues);
        }
        else {
          document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
        }
      }

      });
  }

  secondQuestion(value: any){
    document.getElementById("continue_button")?.remove();
    console.log(value);
    document.getElementById("Question")!.innerHTML = "Do you think the next card will be higher, lower, or equal to your first card (" + value + ")? Enter in high, low, or equal as your answer below!";
       var secondresponse = document.createElement('button');
           secondresponse.innerHTML = "Submit response 2.";
           secondresponse.id = "submit_button2";
           secondresponse.addEventListener('click',() => {this.pullCardQ2(value)});
           document.body.appendChild(secondresponse);
   }

  pullCardQ2(value: any) {
    var rightOrWrong: boolean;
    var realValue: number;
    var validityChecker = (<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1);
    if(validityChecker != "h" && validityChecker != "l" && validityChecker != "e"){
      this.pullCardQ2(value);
    }
    if(value == "ACE"){
      realValue = 1;
    }
    else if(value == "JACK"){
      realValue = 11;
    }
    else if(value == "QUEEN"){
      realValue = 12;
    }
    else if(value == "KING"){
      realValue = 13;
    }

    else if(value == "JOKER"){
      realValue = 14;
    }
    else {
      realValue = (value as number);
    }

    var pulledCardValue
    this.deckService.getCard(this.deck_of_cards.deck_id).subscribe((data: any) => {
      console.log(data.cards[0].value);
      if(data.cards[0].value == "ACE"){
        pulledCardValue = 1;
      }
      else if(data.cards[0].value == "JACK"){
        pulledCardValue = 11;
      }
      else if(data.cards[0].value == "QUEEN"){
        pulledCardValue = 12;
      }
      else if(data.cards[0].value == "KING"){
        pulledCardValue = 13;
      }
  
      else if(data.cards[0].value == "JOKER"){
        pulledCardValue = 14;
      }
      else {
        pulledCardValue = (data.cards[0].value as number);
      }

      if(realValue == pulledCardValue) {// && (<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "e"){
        if((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "e"){
        document.getElementById("Question")!.innerHTML = "Correct!";
        rightOrWrong = true;
        }
      
      else{
        document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button2")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
      }
    }

      else if(realValue < pulledCardValue){
        if((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "h"){
          document.getElementById("Question")!.innerHTML = "Correct!";
          rightOrWrong = true;
          }
        
        else{
          document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button2")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
        }
      }

      else {
        if((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "l"){
          document.getElementById("Question")!.innerHTML = "Correct!";
          rightOrWrong = true;
          }
        
        else{
          document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button2")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
        }
      }

      if(rightOrWrong == true){
          (<HTMLInputElement>document.getElementById("response")).value = "";
          document.getElementById("submit_button2")?.remove();
          document.getElementById("Question")!.innerHTML = "Correct!";
          var continues = document.createElement('button');
          continues.innerHTML = "Click to continue.";
          continues.id = "continue_button2";
          continues.addEventListener('click',() => {this.thirdQuestion()});
          document.body.appendChild(continues);
      }
     
      });
      
  }

  thirdQuestion(){
 document.getElementById("continue_button2")?.remove();
 document.getElementById("Question")!.innerHTML = "Do you think the next card's suit will be Hearts, Clubs, Spades, or Diamonds? Enter in the suit below!";
    var thirdresponse = document.createElement('button');
        thirdresponse.innerHTML = "Submit response 3.";
        thirdresponse.id = "submit_button3";
        thirdresponse.addEventListener('click',() => {this.pullCardQ3()});
        document.body.appendChild(thirdresponse);
   
}

pullCardQ3() {
  var validityChecker = (<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1);
  if(validityChecker != "s" && validityChecker != "h" && validityChecker != "d" && validityChecker != "c"){
    this.pullCardQ3();
  }
  var restartOrNot: boolean;
  this.deckService.getCard(this.deck_of_cards.deck_id).subscribe((data: any) => {
      console.log(data.cards[0].suit);
    if(data.cards[0].suit == "SPADES"){
      if ((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "s") {
        document.write("<marquee behavior-slide scrollamount='20'><p style='font-size: 100px; font-color: 'blue''>YOU WIN!!!!!</p></marquee>");
      }
      else {
        restartOrNot = true;
      }
    }

    if(data.cards[0].suit == "HEARTS"){
      if ((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "h") {
        document.write("Correct! YOU WIN!!!!!!");
      }
      else {
        restartOrNot = true;
      }
    }

    if(data.cards[0].suit == "CLUBS"){
      if ((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "c") {
        document.write("Correct! YOU WIN!!!!!!");
      }
      else {
        restartOrNot = true;
      }
    }

    if(data.cards[0].suit == "DIAMONDS"){
      if ((<HTMLInputElement>document.getElementById('response')).value.toString().toLowerCase().substring(0,1) == "d") {
        document.write("Correct! YOU WIN!!!!!!");
      }
      else {
      restartOrNot = true;
      }
    }

    if(restartOrNot == true){
      document.getElementById("Question")?.remove();
          document.getElementById("response")?.remove();
          document.getElementById("submit_button3")?.remove();
          var restart = document.createElement('button');
          restart.innerHTML = "Incorrect. Click to restart.";
          restart.addEventListener('click',this.reloadGame);
          document.body.appendChild(restart);
    }

    });
}

reloadGame() {
  window.location.reload();
}
  

  ngOnInit(): void {
    this.createDeck();
  }
}

export interface Deck {
  success: boolean;
  deck_id: string;
  remaining: string;
  shuffled: boolean;
}


