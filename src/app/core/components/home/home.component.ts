import { Component, OnDestroy, OnInit } from '@angular/core';
import { PotterService } from '../../services/potter.service';
import { debounceTime, filter, Observable, switchMap, takeWhile, tap } from 'rxjs';
import { CharacterModel } from '../../models/character.model';
import { CommonModule } from '@angular/common';
import { UserEmailPipe } from 'src/app/shared/pipes/user-email.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, UserEmailPipe, FormsModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  isComponentActive = true;
  usersList$: Observable<CharacterModel[]> = new Observable();

  searchControl: FormControl = new FormControl();

  constructor(private potterService: PotterService) {}

  ngOnInit(): void {
    this.listCharacters();
    this.watchSearchInput();
  }

  listCharacters() {
    this.usersList$ = this.potterService.listCharacters();
  }

  watchSearchInput() {
    this.searchControl.valueChanges.pipe(
      takeWhile(() => this.isComponentActive),
      debounceTime(500),
      filter(() => this.searchControl.dirty),
      tap(data => console.log(`Yup: ${data}`))
    ).subscribe(search => {
      this.filterCharacter(search);
    });
  }

  filterCharacter(search: string) {
    this.usersList$ = this.potterService.filterCharacter(search);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }
}
