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
      StateMachine.displayLoadingState("Adding Meal To Server Database...");
      MealDao
        .addMeal(new Meal(0, mealName, mealCalories))
        .then(() => MealDao.getAllMeals())
        .then(meals => {
            UI.updateMealsList(meals, $mealsList);
            UI.updateTotalCalories(meals, $totalCalories);
            StateMachine.displayAddState()
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
      StateMachine.displayLoadingState("Updating the Server Database...");
      MealDao
        .updateMeal(new Meal(mealId, mealName, mealCalories))
        .then(() => MealDao.getAllMeals())
        .then(meals => {
          UI.updateMealsList(meals, $mealsList);
          UI.updateTotalCalories(meals, $totalCalories);
          StateMachine.displayAddState()
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
      StateMachine.displayLoadingState("Removing Meal from Server Database...");
      MealDao
        .removeMeal(mealId)
        .then(() => MealDao.getAllMeals())
        .then(meals => {
          UI.updateMealsList(meals, $mealsList);
          UI.updateTotalCalories(meals, $totalCalories);
          StateMachine.displayAddState();
        });        
    }
  };

  const _setEditState = function(event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains("edit-meal-link")) {
      StateMachine.displayLoadingState();
      const mealId = event.target.parentElement.dataset.mealId;
      MealDao
        .getMeal(mealId)
        .then(meal => {
          StateMachine.displayEditState();
          UI.setValueOf($mealId, meal.id);
          UI.setValueOf($mealName, meal.name);
          UI.setValueOf($mealCalories, meal.calories);
        });
    }
  };

  const _cancelEditState = function(event) {
    event.preventDefault();
    StateMachine.displayAddState();
  };

  const loadEventListeners = function() {
    // Form Buttons - Meals CRUD
    $mealForm.addEventListener("keypress", _submitForm);
    $addBtn.addEventListener("click", _addMeal);
    $updateBtn.addEventListener("click", _updateMeal);
    $deleteBtn.addEventListener("click", _deleteMeal);    

    // State Changes
    $mealsList.addEventListener("click", _setEditState);
    $backBtn.addEventListener("click", _cancelEditState);

    // Form Validation
    $mealName.addEventListener("keyup", _validateMealName);
    $mealCalories.addEventListener("keyup", _validateMealCalories);
    $mealName.addEventListener("blur", _validateMealName);
    $mealCalories.addEventListener("blur", _validateMealCalories);
  };

  return {
    loadEventListeners: loadEventListeners
  };
})();
