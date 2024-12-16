import { Pipe, PipeTransform } from '@angular/core';
import { CharacterModel } from 'src/app/core/models/character.model';

@Pipe({
  name: 'userEmail',
  standalone: true
})
export class UserEmailPipe implements PipeTransform {

  transform(user: CharacterModel): string {
    const { fullName, nickname, hogwartsHouse } = user;
    const splittedName = fullName.split(' ');

    return `${nickname}.${splittedName[splittedName.length - 1]}@${hogwartsHouse}.com`.toLowerCase();
  }
}
