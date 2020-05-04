import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampServices } from '../Service/CampServices';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  message: boolean;

  constructor(private router: Router, private service: CampServices) {}

  ngOnInit(): void {
    this.service.sharedMessage.subscribe((message) => (this.message = message));
  }

  logOut() {
    this.service.nextMessage(false);
    localStorage.removeItem('userToken');
    this.router.navigate(['/AdminLogin']);
  }
}
