import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  newReleases = Array(6).fill('assets/cpp-logo.png');
  recommended = Array(6).fill('assets/cpp-logo.png');
}
