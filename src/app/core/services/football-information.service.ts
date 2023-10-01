import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})

export class FootballInformationService {

  constructor(private httpClient: HttpClient) {}

  getTeamsInformations(): Observable<any> {
    return this.httpClient.get('https://api-football-v1.p.rapidapi.com/v3/teams?country=Argentina', {
      context: withCache({
        version: 'v1',
        key: 'teams'
      }),
      headers: {'X-RapidAPI-Key' : '2c48c3f749mshd3b93a3d54403d1p1ed89fjsn376179bbb867', 'X-RapidAPI-Host' : 'api-football-v1.p.rapidapi.com'}
    });
  }

  getPlayers(idTeam: number): Observable<any> {
    return this.httpClient.get('https://api-football-v1.p.rapidapi.com/v3/players?team=' + `${idTeam}` + '&season=2023', {
      context: withCache({
        version: 'v1',
        key: 'players'
      }),
      headers: {'X-RapidAPI-Key' : '2c48c3f749mshd3b93a3d54403d1p1ed89fjsn376179bbb867', 'X-RapidAPI-Host' : 'api-football-v1.p.rapidapi.com'}
    });
  }

}
