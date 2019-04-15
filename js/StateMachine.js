"use strict";

const EDIT_STATE = "EDIT_STATE";
const ADD_STATE = "ADD_STATE";
const LOADING_STATE = "LOADING_STATE";

const StateMachine = (function() {
  let _currentState = null;

  const displayAddState = function() {
    // hide
    UI.displayElement($loading, "none");
    UI.displayElement($updateBtn, "none");
    UI.displayElement($deleteBtn, "none");
    UI.displayElement($backBtn, "none");

    // show
    UI.displayElement($mealFormContainer, "block");
    UI.displayElement($addBtn, "inline-block");
    UI.displayElement($totalCaloriesContainer, "block");
    UI.displayElement($mealsList, "block");

    UI.setFocusOn($mealName);
    UI.clearForm($mealForm);

    _currentState = ADD_STATE;
  };

  const displayEditState = function() {
    // hide
    UI.displayElement($loading, "none");
    UI.displayElement($addBtn, "none");
    UI.displayElement($totalCaloriesContainer, "none");
    UI.displayElement($mealsList, "none");
    
    // show
    UI.displayElement($mealFormContainer, "block");
    UI.displayElement($updateBtn, "inline-block");
    UI.displayElement($deleteBtn, "inline-block");
    UI.displayElement($backBtn, "inline-block");

    UI.clearForm($mealForm);
    UI.setFocusOn($mealName);

    _currentState = EDIT_STATE;
  };

  const displayLoadingState = function(loadingMessage) {
    // Show
    UI.displayElement($loading, "block");
    if (loadingMessage) {
      $loadingMessage.textContent = loadingMessage;
    } else {
      $loadingMessage.textContent = "Loading...";
    }

    // Hide
    UI.displayElement($mealFormContainer, "none");
    UI.displayElement($totalCaloriesContainer, "none");
    UI.displayElement($mealsList, "none");    

    _currentState = LOADING_STATE;
  };

  const getCurrentState = function() {
    return _currentState;
  };

  return {
    displayAddState: displayAddState,
    displayEditState: displayEditState,
    displayLoadingState: displayLoadingState,
    getCurrentState: getCurrentState
  };
})();
