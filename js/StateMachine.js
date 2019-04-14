"use strict";

const EDIT_STATE = "EDIT_STATE";
const ADD_STATE = "ADD_STATE";

const StateMachine = (function() {
  let _currentState = null;

  const displayAddState = function() {
    MealDao.getAllMeals().then(meals => {
      UI.updateMealsList(meals, $mealsList);
      UI.updateTotalCalories(meals, $totalCalories);
    });
    UI.clearForm($mealForm);
    UI.setFocusOn($mealName);

    UI.displayElement($addBtn, "inline-block");
    UI.displayElement($updateBtn, "none");
    UI.displayElement($deleteBtn, "none");
    UI.displayElement($backBtn, "none");

    _currentState = ADD_STATE;
  };

  const displayEditState = function() {
    MealDao.getAllMeals().then(meals => {
      UI.updateMealsList(meals, $mealsList);
      UI.updateTotalCalories(meals, $totalCalories);
    });
    UI.clearForm($mealForm);
    UI.setFocusOn($mealName);

    UI.displayElement($addBtn, "none");
    UI.displayElement($updateBtn, "inline-block");
    UI.displayElement($deleteBtn, "inline-block");
    UI.displayElement($backBtn, "inline-block");

    _currentState = EDIT_STATE;
  };

  const getCurrentState = function() {
    return _currentState;
  };

  return {
    displayAddState: displayAddState,
    displayEditState: displayEditState,
    getCurrentState: getCurrentState
  };
})();
