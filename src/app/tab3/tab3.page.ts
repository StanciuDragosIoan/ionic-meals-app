import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicRestService } from '../ionic-rest.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    private cd: ChangeDetectorRef,
    private restService: IonicRestService
  ) {}

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

      this.restService.addARecipe(recipe).subscribe();

      this.confirm = 'Thanks for your recipe! Check it in the Home page!';
      setTimeout(() => {
        this.confirm = '';
      }, 1000);
    }
  }

  clearRecipes() {
    // localStorage.setItem('recipes', JSON.stringify([]));
    this.restService.clearRecipes();
  }
}
