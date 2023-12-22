import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public enterMenu() {
    this.router.navigate([]).then(() => {
      window.open('https://corporate.valepresente.com.br/login', '_blank');
    });
  }

}
