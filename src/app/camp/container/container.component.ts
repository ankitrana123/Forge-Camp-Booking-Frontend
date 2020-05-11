import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../Service/Service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  isAdminFlag: boolean;

  constructor(private router: Router, private service: Service) {}

  ngOnInit(): void {
    this.service.sharedMessage.subscribe((message) => (this.isAdminFlag = message));
  }

  logOut() {
    this.service.isAdmin(false);
    localStorage.removeItem('userToken');
    this.router.navigate(['/AdminLogin']);
  }
  
}
