"use strict";

// Globals: Captured DOM Elements

// Messages
const $alertContainer = document.querySelector("#alert");

// Cant connect
const $cantConnectContainer = document.querySelector("#cant-connect");
const $cantConnectBtn = document.querySelector("#cant-connect-btn");

// Loading 
const $loadingContainer = document.querySelector("#loading");
const $loadingMessage = document.querySelector("#loading p");

// Form Elements
const $mealFormContainer = document.querySelector("#meal-form-container");
const $mealForm = document.querySelector("#meal-form");
const $mealId = document.querySelector("#meal-id");
const $mealName = document.querySelector("#meal-name");
const $mealCalories = document.querySelector("#meal-calories");
const $addBtn = document.querySelector("#add-btn");
const $updateBtn = document.querySelector("#update-btn");
const $deleteBtn = document.querySelector("#delete-btn");
const $backBtn = document.querySelector("#back-btn");

// Total Calories Header
const $totalCaloriesContainer = document.querySelector(".total-calories-header");
const $totalCalories = document.querySelector("#total-calories");

// Meals List
const $mealsList = document.querySelector("#meals-list");