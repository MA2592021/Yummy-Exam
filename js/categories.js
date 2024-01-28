async function fetchCategories() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const dataResponse = await response.json();
  displayCategories(dataResponse.categories);
}

function displayCategories(categories) {
  const maxDescriptionLength = 20;
  const cartoona = categories
    .map((category) => {
      const truncatedDescription = category.strCategoryDescription
        .split(" ")
        .splice(0, maxDescriptionLength)
        .join(" ");
      return `
      <div class="col-md-3" onclick="CategoryMeals('${category.strCategory}')">
        <div class="image">
          <img src="${category.strCategoryThumb}" class="w-100" alt="">
          <div class="food-title w-100 h-100 d-flex flex-column text-center align-items-center">
            <h3 class="ps-2">${category.strCategory}</h3>
            <p>${truncatedDescription}</p>
          </div>
        </div>
      </div>`;
    })
    .join("");

  document.querySelector("#categories-result").innerHTML = cartoona;
}

async function CategoryMeals(Categ) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categ}`
  );
  const dataResponse = await response.json();
  displayCategoriesFilters(dataResponse.meals);
}

function displayCategoriesFilters(categories) {
  const cartoona = categories
    .map(
      (category) => `
    <div class="col-md-3" onclick="showCategoryDetails('${category.idMeal}')">
      <div class="image">
        <img src="${category.strMealThumb}" class="w-100" alt="">
        <div class="food-title w-100 h-100 d-flex align-items-center">
          <h3 class="ps-2">${category.strMeal}</h3>
        </div>
      </div>
    </div>`
    )
    .join("");

  document.querySelector("#categories-result").innerHTML = cartoona;
}

// Initialize category data
fetchCategories();

// Hide loader when categories are ready
$(".categories-result").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-category").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
