import { Component } from '@angular/core';
import { FootballInformationService } from './core/services/football-information.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FootballInformationService],
})

export class AppComponent {

  title = 'football-world-cup-fantasy';

  constructor() {}

  ngOnInit() {
  }


}
