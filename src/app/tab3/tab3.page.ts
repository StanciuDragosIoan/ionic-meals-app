import { Component, ChangeDetectorRef } from '@angular/core';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private cd: ChangeDetectorRef) {
    const isStored = localStorage.getItem('recipes');
    if (isStored) {
      this.recipes = JSON.parse(isStored);
    } else {
      this.recipes = [];
    }
  }

  tab1: Tab1Page = new Tab1Page();
  recipe_name: string = '';
  recipe_ingredients: string = '';
  recipe_instructions: string = '';
  alert: string = '';
  confirm = '';
  recipes: Array<{
    name: string;
    ingredients: string;
    instructions: string;
  }> = [];

  handleChange() {
    console.log(this.recipes);
    if (
      this.recipe_name === '' ||
      this.recipe_ingredients === '' ||
      this.recipe_instructions === ''
    ) {
      this.alert = 'Please input something';
    } else {
      this.alert = '';
      const recipe = {
        name: this.recipe_name,
        ingredients: this.recipe_ingredients,
        instructions: this.recipe_instructions,
      };

      this.recipe_ingredients = '';
      this.recipe_name = '';
      this.recipe_instructions = '';

      this.recipes = [...this.recipes, recipe];

      this.cd.detectChanges();

      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      this.tab1.renderRecipes();
      this.confirm = 'Thanks for your recipe! Check it in the Home page!';
      setTimeout(() => {
        this.confirm = '';
      }, 1000);
    }
  }

  clearRecipes() {
    localStorage.setItem('recipes', JSON.stringify([]));
    console.log('removed');
  }
}
