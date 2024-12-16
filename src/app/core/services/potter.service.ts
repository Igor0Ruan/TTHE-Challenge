import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterModel } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class PotterService {
  private baseUrl = 'https://potterapi-fedeperin.vercel.app';
  private language = 'en';

  private characterURL = `${this.baseUrl}/${this.language}/characters`;

  constructor(private httpClient: HttpClient) { }

  listCharacters() {
    return this.httpClient.get<CharacterModel[]>(this.characterURL);
  }

  filterCharacter(search: string) {
    return this.httpClient.get<CharacterModel[]>(this.characterURL, {params: { search }});
  }
}
