"use strict";

const EventHandler = (function() {
  const _submitForm = function(event) {
    if (event.key === "Enter") {
      switch ( StateMachine.getCurrentState() ) {
        case ADD_STATE :
          _addMeal(event);
          break;
        case EDIT_STATE : 
          _updateMeal(event);
          break;
      }
      event.preventDefault();
    }  
  };  

  const _isValidMealName = function(mealName) {
    const regex = /^[a-zA-Z\s]{2,20}$/;
    return regex.test(mealName);
  }

  const _isValidMealCalories = function(mealCalories) {
    return typeof mealCalories === "number" && mealCalories > 0;
  }

  const _addMeal = function(event) {
    event.preventDefault();

    const mealName = $mealName.value;
    const mealCalories = parseInt($mealCalories.value);

    if (_isValidMealName(mealName) && _isValidMealCalories(mealCalories)) {
      MealDao
        .addMeal(new Meal(0, mealName, mealCalories))
        .then(data => {
          StateMachine.displayAddState();
          console.log(data) // TODO: UI SHOW ALERT
        });
    } else {
      // TODO: UI SHOW ALERT
      console.log("ERR AT ADD MEAL");
    }
  };

  const _updateMeal = function(event) {
    event.preventDefault();

    const mealId = $mealId.value;
    const mealName = $mealName.value;
    const mealCalories = parseInt($mealCalories.value);

    if (_isValidMealName(mealName) && _isValidMealCalories(mealCalories)) {
      MealDao
        .updateMeal(new Meal(mealId, mealName, mealCalories))
        .then(data => {
          StateMachine.displayAddState();
          console.log(data) // TODO: UI SHOW ALERT
        });
    } else {
      // TODO: UI SHOW ALERT
      console.log("ERR AT ADD MEAL");
    }
  };

  const _deleteMeal = function(event) {
    event.preventDefault();

    const mealId = $mealId.value;

    if (confirm("Are you sure?")) {      
      MealDao
        .removeMeal(mealId)
        .then(data => {
          console.log(data);
          StateMachine.displayAddState();
        });
    }
  };

  const _setEditState = function(event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("edit-meal-link")) {
      StateMachine.displayEditState();
      const mealId = event.target.parentElement.dataset.mealId;
      MealDao
        .getMeal(mealId)
        .then(meal => {
          UI.setValueOf($mealId, meal.id);
          UI.setValueOf($mealName, meal.name);
          UI.setValueOf($mealCalories, meal.calories);
        });
    }
  };

  const _cancelEditState = function(event) {
    event.preventDefault();
    StateMachine.displayAddState();
    UI.clearForm($mealForm);
  };

  const loadEventListeners = function() {
    // Meal CRUD
    $mealForm.addEventListener("keypress", _submitForm);
    $addBtn.addEventListener("click", _addMeal);
    $updateBtn.addEventListener("click", _updateMeal);
    $deleteBtn.addEventListener("click", _deleteMeal);    

    // State Changes
    $mealsList.addEventListener("click", _setEditState);
    $backBtn.addEventListener("click", _cancelEditState);
  };

  return {
    loadEventListeners: loadEventListeners
  };
})();
