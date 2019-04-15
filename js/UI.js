"use strict";

const UI = (function() {
  const _createListItemForMeal = function(meal) {
    const listItem = document.createElement("li");
    // listItem.id = "item-" + meal.id;

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
    elem.classList.remove("invalid-input");
    elem.classList.remove("valid-input");
    elem.classList.add("valid-input");
  };
  
  const setInputAsInvalid = function(elem) {
    elem.classList.remove("valid-input");
    elem.classList.remove("invalid-input");
    elem.classList.add("invalid-input");    
  };

  const removeValidationClassesInput = function(elem) {
    elem.classList.remove("valid-input");
    elem.classList.remove("invalid-input");
  };

  return {
    updateTotalCalories: updateTotalCalories,
    updateMealsList: updateMealsList,
    displayElement: displayElement,
    clearForm: clearForm,
    setFocusOn: setFocusOn,
    setValueOf: setValueOf,
    setInputAsValid: setInputAsValid,
    setInputAsInvalid: setInputAsInvalid,
    removeValidationClassesInput: removeValidationClassesInput
  };
})();
