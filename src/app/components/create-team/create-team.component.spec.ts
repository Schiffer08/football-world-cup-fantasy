import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateTeamComponent } from './create-team.component';
import { FootballInformationService } from 'src/app/core/services/football-information.service';
import { of } from 'rxjs';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;
  let footballService: FootballInformationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTeamComponent],
      imports: [FormsModule, HttpClientTestingModule], // Import FormsModule and HttpClientTestingModule
      providers: [FootballInformationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    footballService = TestBed.inject(FootballInformationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams information on ngOnInit', () => {
    const teamsInfo = {
      response: [{ team: { id: 1, national: true } }, { team: { id: 2, national: true } }],
    };
    spyOn(footballService, 'getTeamsInformations').and.returnValue(of(teamsInfo));

    component.ngOnInit();

    expect(footballService.getTeamsInformations).toHaveBeenCalled();
    expect(component.nationalTeams).toEqual(teamsInfo.response);
  });

  it('should set teamId and call playersTeam on setTeamId', () => {
    const teamId = 1;
    const playersInfo = {
      response: [{ player: { id: 101, name: 'Player 1' } }, { player: { id: 102, name: 'Player 2' } }],
    };
    spyOn(footballService, 'getPlayers').and.returnValue(of(playersInfo));

    component.setTeamId({ target: { value: teamId } }, 0);

    expect(component.teamId).toEqual(teamId);
    expect(footballService.getPlayers).toHaveBeenCalledWith(teamId);
  });

  it('should set player name on setPlayerId', () => {
    const playerName = 'Player 1';
    const playersInfo = {
      response: [{ player: { id: 101, name: playerName } }],
    };
    spyOn(footballService, 'getPlayers').and.returnValue(of(playersInfo));

    component.setPlayerId({ target: { value: playerName } }, 0);

    expect(component.playersSelected[0].player.name).toEqual(playerName);
  });

  // Add more test cases for other component methods and scenarios

});
