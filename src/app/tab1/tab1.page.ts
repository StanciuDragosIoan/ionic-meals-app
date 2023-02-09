import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicRestService } from '../ionic-rest.service';
import { Recipe } from '../ionic-rest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  rawRecipes: any = [];
  recipes: Recipe[] = [];
  fetched: boolean = false;

  constructor(private restService: IonicRestService, private router: Router) {
    this.renderRecipes();
  }

  public rerenderProps: Array<number> = [1];

  // TODO: improve rendering cycle
  ngAfterContentChecked() {
    this.renderRecipes();
  }

  renderRecipes() {
    const data = this.restService.getRecipes();
    data.subscribe((res) => {
      this.rawRecipes = res;
      this.recipes = [];
      for (const item in this.rawRecipes) {
        this.recipes.push(this.rawRecipes[item]);
      }
    });
  }
}
