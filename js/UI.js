"use strict";

const ALERT_SUCCESS = "ALERT_SUCCESS";
const ALERT_FAILURE = "ALERT_FAILURE";

const CSS_INPUT_INVALID = "input-invalid";
const CSS_INPUT_VALID = "input-valid";
const CSS_ALERT_OK = "alert alert-ok";
const CSS_ALERT_FAIL = "alert alert-fail";

const UI = (function() {
  const _createListItemForMeal = function(meal) {
    const listItem = document.createElement("li");

    const strongTxt = document.createElement("strong");
    strongTxt.appendChild(document.createTextNode(meal.name + ": "));

    const emTxt = document.createElement("em");
    emTxt.appendChild(document.createTextNode(meal.calories + " calories "));

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.className = "edit-meal-link";
    link.setAttribute("data-meal-id", meal.id);
    const icon = document.createElement("i");
    icon.className = "fa fa-pencil";
    link.appendChild(icon);

    listItem.appendChild(strongTxt);
    listItem.appendChild(emTxt);
    listItem.appendChild(link);

    return listItem;
  };

  const _addAllMealstoList = function(meals, listElem) {
    meals.forEach(meal => listElem.appendChild(_createListItemForMeal(meal)));
  };

  const _clearMealsList = function(listElem) {
    while (listElem.firstElementChild) {
      listElem.removeChild(listElem.firstElementChild);
    }
  };

  const displayElement = function(elem, displayType) {
    elem.style.display = displayType;
  };

  const updateTotalCalories = function(meals, spanElem) {
    const totalCalories = meals
      .map(meal => meal.calories)
      .reduce((acc, curr) => acc + curr, 0);
    spanElem.textContent = totalCalories;
  };

  const updateMealsList = function(meals, listElem) {
    _clearMealsList(listElem);
    if (meals.length > 0) {
      displayElement(listElem, "block");
      _addAllMealstoList(meals, listElem);
    } else {
      displayElement(listElem, "none");
    }
  };

  const clearForm = function(formElem) {
    formElem.reset();
  };

  const setFocusOn = function(elem) {
    elem.focus();
  };

  const setValueOf = function(elem, value) {
    elem.value = value;
  };  

  const setInputAsValid = function(elem) {
    elem.classList.remove(CSS_INPUT_INVALID);
    elem.classList.remove(CSS_INPUT_VALID);
    elem.classList.add(CSS_INPUT_VALID);
  };
  
  const setInputAsInvalid = function(elem) {
    elem.classList.remove(CSS_INPUT_VALID);
    elem.classList.remove(CSS_INPUT_INVALID);
    elem.classList.add(CSS_INPUT_INVALID);    
  };

  const removeValidationClassesInput = function(elem) {
    elem.classList.remove(CSS_INPUT_VALID);
    elem.classList.remove(CSS_INPUT_INVALID);
  };

  const _clearAllAlerts = function() {
    while ($alertContainer.firstElementChild) {
      $alertContainer.removeChild($alertContainer.firstElementChild);
    }
  };  

  const _createNewAlert = function(message, alertType) {
    const alert = document.createElement("div");
    alert.appendChild(document.createTextNode(message));
    switch (alertType) {
      case ALERT_SUCCESS :
        alert.className = CSS_ALERT_OK;
        break;
      case ALERT_FAILURE :
        alert.className = CSS_ALERT_FAIL;
        break;
    }
    return alert;
  };

  const _hideAlert = function() {
    _clearAllAlerts();
    UI.displayElement($alertContainer, "none");    
  };

  const showAlert = function(message, alertType) {
    _clearAllAlerts();
    UI.displayElement($alertContainer, "block");
    $alertContainer.appendChild(_createNewAlert(message, alertType));
    setTimeout(() => _hideAlert(), 3000);
  };

  return {
    // HTML Element Setters
    displayElement: displayElement,
    setFocusOn: setFocusOn,
    setValueOf: setValueOf,

    // Messages
    showAlert: showAlert,

    // Meal Form
    clearForm: clearForm,

    // Total Calories
    updateTotalCalories: updateTotalCalories,

    // Meals List
    updateMealsList: updateMealsList,

    // Input Validation Classes
    setInputAsValid: setInputAsValid,
    setInputAsInvalid: setInputAsInvalid,
    removeValidationClassesInput: removeValidationClassesInput
  };
})();
