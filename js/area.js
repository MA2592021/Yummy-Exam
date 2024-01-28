async function fetchAreas() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const dataResponse = await response.json();
  displayAreas(dataResponse.meals);
}

function displayAreas(areas) {
  const cartoona = areas
    .map(
      (area) => `
    <div class="col-md-3" onclick="AreaMeals('${area.strArea}')">
      <div class="content">
        <i class="fa-solid fa-house-laptop fa-4x" style="color:#ffffff"></i>
        <h3 class="text-white">${area.strArea}</h3>
      </div>
    </div>`
    )
    .join("");

  document.querySelector("#area-result").innerHTML = cartoona;
}

async function AreaMeals(area) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const dataResponse = await response.json();
  displayAreasFilters(dataResponse.meals);
}

function displayAreasFilters(areas) {
  const cartoona = areas
    .map(
      (area) => `
    <div class="col-md-3" onclick="showAreaDetails('${area.idMeal}')">
      <div class="image">
        <img src="${area.strMealThumb}" class="w-100" alt="">
        <div class="food-title w-100 h-100 d-flex align-items-center">
          <h3 class="ps-2">${area.strMeal}</h3>
        </div>
      </div>
    </div>`
    )
    .join("");

  document.querySelector("#area-result").innerHTML = cartoona;
}

// Initialize area data
fetchAreas();

// Hide loader when areas are ready
$(".area-result").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-area").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
