import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedBtn;
  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedBtn = 'control/testbtn'
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
