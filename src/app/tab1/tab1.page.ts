import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {
    this.renderRecipes();
  }

  recipes: Array<{ name: string; ingredients: string; instructions: string }> =
    [];

  public rerenderProps: Array<number> = [1];

  ngDoCheck() {
    this.renderRecipes();
  }

  renderRecipes() {
    const isStored = localStorage.getItem('recipes');
    if (isStored) {
      this.recipes = JSON.parse(isStored);
    } else {
      this.recipes = [];
    }
  }
}
