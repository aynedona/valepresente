import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vp-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() label!: string;
  @Input() sizeTitle!: string;
  @Input() colorTitle!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
