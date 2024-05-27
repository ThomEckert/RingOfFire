import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/games';
import { PlayerComponent } from "../player/player.component";

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [CommonModule, PlayerComponent]
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game;
  currentCard: string | undefined  = '';
  
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    console.log('New Card: ' + this.currentCard);
    console.log('Game is ', this.game);

    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCard.push(this.currentCard!);
    }, 1000);
    }
  }
}
