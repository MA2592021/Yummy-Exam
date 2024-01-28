async function fetchIngredients() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const dataResponse = await response.json();
  displayingredients(dataResponse.meals.slice(0, 20));
}

function displayingredients(meals) {
  const maxDescriptionLength = 20;
  const cartoona = meals
    .map((meal) => {
      const truncatedDescription = meal.strDescription
        .split(" ")
        .splice(0, maxDescriptionLength)
        .join(" ");
      return `
      <div class="col-md-3 text-center text-white" onclick="IngredientMeals('${meal.strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${meal.strIngredient}</h3>
        <p>${truncatedDescription}</p>
      </div>`;
    })
    .join("");

  document.querySelector("#ingredients-result").innerHTML = cartoona;
}

async function IngredientMeals(ing) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );
  const dataResponse = await response.json();
  displayIngredientsFilters(dataResponse.meals);
}

function displayIngredientsFilters(meals) {
  const cartoona = meals
    .map(
      (meal) => `
    <div class="col-md-3" onclick="showIngDetails('${meal.idMeal}')">
      <div class="image">
        <img src="${meal.strMealThumb}" class="w-100" alt="">
        <div class="food-title w-100 h-100 d-flex align-items-center">
          <h3 class="ps-2">${meal.strMeal}</h3>
        </div>
      </div>
    </div>`
    )
    .join("");

  document.querySelector("#ingredients-result").innerHTML = cartoona;
}

// Initialize ingredient data
fetchIngredients();

// Hide loader when ingredients are ready
$(".ingredients-result").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-ing").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
