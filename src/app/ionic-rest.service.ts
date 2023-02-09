import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export class Recipe {
  name: string = '';
  ingredients: string = '';
  instructions: string = '';
}

@Injectable({
  providedIn: 'root',
})
@NgModule()
export class IonicRestService {
  recipes: any = {};

  constructor(private http: HttpClient) {
    const data = this.getRecipes();
    data.subscribe((res) => {
      this.recipes = res;
    });
  }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addARecipe(recipe: Recipe): Observable<any> {
    return this.http
      .post<Recipe>(
        'https://ionic-app-recipes-default-rtdb.firebaseio.com/Recipes.json',
        recipe,
        this.httpHeader
      )
      .pipe(catchError(this.handleError<Recipe>('Add Recipe')));
  }

  getRecipes(): Observable<Recipe[]> {
    const data = this.http
      .get<Recipe[]>(
        'https://ionic-app-recipes-default-rtdb.firebaseio.com/Recipes.json'
      )
      .pipe(
        tap((Recipe) => Recipe),
        catchError(this.handleError<Recipe[]>('Get Recipes', []))
      );

    return data;
  }

  clearRecipes(): Observable<Recipe[]> {
    console.log('delete all');
    const data = this.http
      .delete<Recipe[]>(
        'https://ionic-app-recipes-default-rtdb.firebaseio.com/Recipes.json',
        this.httpHeader
      )
      .pipe(
        tap((_) => console.log('recipes deleted')),
        catchError(this.handleError<Recipe[]>('Delete Recipes'))
      );
    data.subscribe();
    return data;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
