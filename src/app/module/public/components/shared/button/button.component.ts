import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() classButton!: string;
  @Input() label!: string;
  @Input() valid?: boolean = true;
  @Output() functionSubmit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public sendButton() {
    this.functionSubmit.emit();
  }

}
