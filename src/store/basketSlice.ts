import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import type { RootState } from './index';
import { Recipes, Recipe } from '../types';

interface BasketState {
  value: Recipes
}

const initialState: BasketState = {
  value: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Recipe>) => {
      const inBasket = state.value.find(recepe => recepe.idMeal === action.payload.idMeal);
      if (!inBasket) state.value.push(action.payload);
    },
  },
});

export const selectBasketValue = (state: RootState) => state.basket.value;

export const selectBasketIngridients = createSelector(
  selectBasketValue,
  (basketRecipes: Recipes) => {
    const total: Record<string, string> = {};

    basketRecipes.forEach(recipe => {
      Array.from({ length: 20 }).map((_, index) => {
        const ingredient = recipe[`strIngredient${index + 1}` as keyof Recipe];
        const measure = recipe[`strMeasure${index + 1}` as keyof Recipe];
        if (ingredient && measure) {
          if (!(ingredient in total)) {
            total[ingredient] = measure;
          } else {
            total[ingredient] += `, ${measure}`;
          }
          
        }
      })
    })
    return total;
  }
);

export const { addToBasket } = basketSlice.actions

export default basketSlice.reducer