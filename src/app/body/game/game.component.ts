import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import {mainMenu, playGame, gameOver, gameWin, gameStart} from "../../../assets/game.js";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let vid = document.getElementById("myVideo");
    vid.onended = function() {
      gameStart();
    }
  }

}
