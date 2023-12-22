import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vp-app-instructions',
  templateUrl: './app-instructions.component.html',
  styleUrls: ['./app-instructions.component.scss']
})
export class AppInstructionsComponent implements OnInit {

  @Input() label!: string;
  @Input() urlImage!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
