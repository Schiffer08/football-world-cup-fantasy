import { Component, OnInit } from '@angular/core';
import { FootballInformationService } from 'src/app/core/services/football-information.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
  providers: [FootballInformationService],
})

export class CreateTeamComponent implements OnInit {

  teamQuantitySelected: Array<number> = [];
  teamsSelected: Array<string> = [];
  positionsSelected: Array<number> = [];
  playersSelected: Array<any> = [];
  countAttackers: number = 0;
  countDefenders: number = 0;
  countGoalkeepers: number = 0;
  countMidfielders: number = 0;
  countCoach: number = 0;
  total: number = 0;
  teamId: number = 0;
  positionId: number = 0;
  sizeTeam: any[] = new Array(13);
  namePlayer: any = '';
  nationalTeams: Array<any> = [];
  arrPlayers: any[][] = [];
  totalTeam: Array<any> = [];
  selectedPlayerNames: string[] = new Array(this.sizeTeam.length).fill('');
  arrPositions: Array<any> = [
    {
      value: 'Attackers',
      id: 1
    },
    {
      value: 'Coach',
      id: 2
    },
    {
      value: 'Defenders',
      id: 3
    },
    {
      value: 'Goalkeepers',
      id: 4
    },
    {
      value: 'Midfielders',
      id: 5
    }
  ];

  constructor(private footballservice: FootballInformationService) {}

  ngOnInit() {
    this.getTeamsNationals();
  }
  
  getTeamsNationals() {
    this.footballservice.getTeamsInformations().subscribe((res) => {
      this.nationalTeams = res.response.filter((team: { team: { national: any; id: number } }) => team.team.national);
      if (!this.teamQuantitySelected.length) {
        this.nationalTeams.forEach((nationalTeam: { team: { id: number } }) => {
          this.teamQuantitySelected[nationalTeam.team.id] = 0;
        });
      }
    });
  }

  setTeamId(event: any, i: number) {
    if (this.teamQuantitySelected[event.target.value] >= 4) {
      event.target.value = '';
      return alert('No puede seleccionar mas de 4 jugadores de un mismo equipo.')
    }
    this.teamId = event.target.value;
    this.teamQuantitySelected[event.target.value] += 1;
    this.teamsSelected[i] = event.target.value;
    this.playersTeam(this.teamId, i);
  }

  playersTeam(idTeam: number, i: number) {
    this.footballservice.getPlayers(idTeam).subscribe((res) => {
      this.arrPlayers[i] = res.response.filter((player: { player: any; }) => !this.playersSelected.some(playerSelected => playerSelected.player.id === player.player.id));
    })
  }

  getCurrentTeam(i: number) {
    return this.teamsSelected[i];
  }

  setPlayerId(event: any, i: number) {
    const player = this.arrPlayers[i].find(player => player.player.name === event.target.value);
    this.playersSelected[i] = player;
  }
  
  setPositionId(event: any, i: number) {
    this.positionId = +event.target.value;
    switch (+event.target.value) {
      case 1:
        if (this.countAttackers + 1 > 2) {
          event.target.value = '';
          return alert('Debe tener máximo 2 Atacantes.');
        }
        this.total += 1;
        this.countAttackers += 1;
        break;
      case 2:
        if (this.countCoach + 1 > 1) {
          event.target.value = '';
          return alert('Debe tener máximo 1 solo Coach.');
        }
        this.total += 1;
        this.countCoach += 1;
        break;
      case 3:
        if (this.countDefenders + 1 > 4) {
          event.target.value = '';
          return alert('Debe tener máximo 4 Defensas.');
        }
        this.total += 1;
        this.countDefenders += 1;
        break;
      case 4:
        if (this.countGoalkeepers + 1 > 2) {
          event.target.value = '';
          return alert('Debe tener máximo 2 porteros.');
        }
        this.total += 1;
        this.countGoalkeepers += 1;
        break;
      case 5:
        if (this.countMidfielders + 1 > 4) {
          event.target.value = '';
          return alert('Debe tener máximo 4 medio campista.');
        }
        this.total += 1;
        this.countMidfielders += 1;
        break;
      default:
        break;
    }
    const previewPosition = this.positionsSelected[i];
    this.restoredPreviewPosition(previewPosition);
    this.positionsSelected[i] = this.positionId;
    this.addPlayer();
  }

  restoredPreviewPosition(id: number) {
    if (id === 1) {
      this.countAttackers -= 1;
      this.total -= 1;
    } else if(id === 2) {
      this.countCoach -= 1;
      this.total -= 1;
    } else if(id === 3) {
      this.countDefenders -= 1;
      this.total -= 1;
    } else if(id === 4) {
      this.countGoalkeepers -= 1;
      this.total -= 1;
    } else if(id === 5) {
      this.countMidfielders -= 1;
      this.total -= 1;
    }
  }

  addPlayer() {
    const newItem = {
      teamId: this.teamId,
      playerName: this.namePlayer,
      positionId: this.positionId
    };
    this.totalTeam.push(newItem);
  }

  clearTeam() {
    this.countAttackers = 0;
    this.countDefenders = 0;
    this.countGoalkeepers = 0;
    this.countMidfielders = 0;
    this.countCoach = 0;
    this.total = 0;
    this.totalTeam = [];
  }
  
  saveTeam() {
    Swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: '¡Equipo creado exitosamente!',
    })
  }

}