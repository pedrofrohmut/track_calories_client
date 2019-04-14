"use strict";

const App = (function() {
  const _initializeAppState = function() {
    MealDao.getAllMeals().then(meals => {
      UI.updateMealsList(meals, $mealsList);
      UI.updateTotalCalories(meals, $totalCalories);
    });
    StateMachine.displayAddState();
    EventHandler.loadEventListeners();
  };

  return {
    init: _initializeAppState
  };
})();
