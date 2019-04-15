"use strict";

const EDIT_STATE = "EDIT_STATE";
const ADD_STATE = "ADD_STATE";
const LOADING_STATE = "LOADING_STATE";
const CANT_CONNECT_STATE = "CANT_CONNECT_STATE";

const StateMachine = (function() {
  let _currentState = null;

  const _hideAll = function() {
    // TODO - MESSAGES

    // ERROR
    UI.displayElement($cantConnectContainer, "none");

    // Loading Container
    UI.displayElement($loadingContainer, "none");

    // Form Container & Content
    UI.displayElement($mealFormContainer, "none");
    UI.displayElement($addBtn, "none");
    UI.displayElement($updateBtn, "none");
    UI.displayElement($deleteBtn, "none");
    UI.displayElement($backBtn, "none");

    // Total Calories
    UI.displayElement($totalCaloriesContainer, "none");

    // Meals List
    UI.displayElement($mealsList, "none");  
  };

  const displayAddState = function() {
    _hideAll();
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
    _hideAll();    
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
    _hideAll();    
    // Show
    UI.displayElement($loadingContainer, "block");
    if (loadingMessage) {
      $loadingMessage.textContent = loadingMessage;
    } else {
      $loadingMessage.textContent = "Loading...";
    }

    _currentState = LOADING_STATE;
  };

  const displayCantConnectState = function() {
    _hideAll();
    // Show
    UI.displayElement($cantConnectContainer, "block");
    
    _currentState = CANT_CONNECT_STATE;
  };

  const getCurrentState = function() {
    return _currentState;
  };

  return {
    displayAddState: displayAddState,
    displayEditState: displayEditState,
    displayLoadingState: displayLoadingState,
    displayCantConnectState: displayCantConnectState,
    getCurrentState: getCurrentState
  };
})();
