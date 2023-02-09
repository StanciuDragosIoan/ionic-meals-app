import { Component } from '@angular/core';
import { IonicRestService } from '../ionic-rest.service';

export class Recipe {
  name: string = '';
  ingredients: string = '';
  instructions: string = '';
}
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  rawRecipes: any = [];
  recipes: Recipe[] = [];

  constructor(private restService: IonicRestService) {
    const data = this.restService.getRecipes();
    data.subscribe((res) => {
      this.rawRecipes = res;

      const { r1, r2, r3 } = this.rawRecipes;

      for (const item in this.rawRecipes) {
        this.recipes.push(this.rawRecipes[item]);
      }
    });
  }
}
