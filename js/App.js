"use strict";

const App = (function() {
  const _initializeAppState = function() {
    StateMachine.displayLoadingState("Initializing App...");
    MealDao
      .getAllMeals()
      .then(meals => {
        UI.updateMealsList(meals, $mealsList);
        UI.updateTotalCalories(meals, $totalCalories);
        StateMachine.displayAddState();
      })
      .catch(err => {
        // TODO: err handling for no server response
      });    
    EventHandler.loadEventListeners();
  };

  return {
    init: _initializeAppState
  };
})();
