import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  boolIndex:boolean;

  constructor(private router:Router) { }

  ngOnInit(): void {
    // this.boolIndex = true;
    this.boolIndex = true
  }

  gameStart(){
    // console.log("ok")
    // this.boolIndex = false
    this.router.navigate(['/game'])
  }

}
