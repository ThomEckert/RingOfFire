import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/games';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent]
})

export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game) {
    this.currentCard = this.game.stack.pop() || '';
    this.pickCardAnimation = true;
    console.log('New Card: ' + this.currentCard);
    console.log('Game is ', this.game);
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCard.push(this.currentCard!);
    }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        // console.log('Der Spieler', name, 'wurde hinzugefügt.');
      }
    });
  }

}
