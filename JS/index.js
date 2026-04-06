/*        */

// https://www.themealdb.com/api.php

let iconOpenNavbar = document.querySelector("#iconOpenNavbar");
let iconCloseNavbar = document.querySelector("#iconCloseNavbar");

let navbar_black = document.querySelector(".navbar-black");
let linksNavs = document.querySelectorAll(".linksNavs");

// let bigContainer = document.getElementById("bigContainer");


let categoriePart = document.querySelector("#categoriePart");
let contactUsPart = document.querySelector("#contactUsPart");
let divContactUs = document.querySelector("#divContactUs");
let areaPart = document.querySelector("#areaPart");
let ingredientsPart = document.querySelector("#ingredientsPart");
let searchPart = document.querySelector("#searchPart");

// Search 
let myRowSearch = document.querySelector("#myRowSearch");


let resCategorie = [];

let resMainMeal = [];


let regex = {
    inputNmae: /^[a-z A-Z]{1,30}$/,
    inputEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    inputPhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    inputAge: /^[1-9][0-9]?$/,
    inputPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{8,}$/,
    // inputRepassword
}


// open nav
iconOpenNavbar.addEventListener("click", function () {
    navbar_black.classList.remove("d-none");
    iconOpenNavbar.classList.add("d-none");
    iconCloseNavbar.classList.remove("d-none");
})

// close nav
iconCloseNavbar.addEventListener("click", function () {
    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");

    linksNavs.classList.add("animate__fadeOutDown");
})

// search click
searchPart.addEventListener("click", function (e) {
    e.preventDefault();
    displaySearchPart();

    let cartona = null;
    if (searchByNameInpu.value == "" || searchByFirstLetterInpu.value == "") {
        document.getElementById("myRow").innerHTML = cartona;
        console.log("trueee");
    }

    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");
})

// categorie click
categoriePart.addEventListener("click", function (e) {
    e.preventDefault();
    getDataCategorie();
    myRowSearch.innerHTML = null;
    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");
})

// Area click
areaPart.addEventListener("click", function (e) {
    e.preventDefault();
    getArea();
    myRowSearch.innerHTML = null;
    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");
})

// Ingredients click
ingredientsPart.addEventListener("click", function (e) {
    e.preventDefault();
    getIngredients();
    myRowSearch.innerHTML = null;
    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");
})


// contact us click
contactUsPart.addEventListener("click", function (e) {
    e.preventDefault();
    myRowSearch.innerHTML = null;

    let cartona = `
    <div class="vh-100 d-flex flex-column justify-content-center" id="divContactUs">
        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center pb-3 gap-3">
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="text" class="w-100 rounded p-2 test " id="inputNmae" placeholder="Enter Your Name" required>
                <div class="mt-3 pt-3 pb-3 rounded text-center bg-danger d-none">Special characters and numbers not allowed</div>
            </div>
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="email" class=" w-100 rounded p-2 test bg-light" id="inputEmail" placeholder="Enter Your Email"
                    required>
                <div class="mt-3 pt-3 pb-3 rounded text-center d-none">Email not valid *exemple@yyy.zzz</div>
            </div>
        </div>

        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center pb-3 gap-3 ">
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="phone" class="w-100 rounded p-2 test" id="inputPhone" placeholder="Enter Your Phone"
                    required>
                <div class="mt-3 pt-3 pb-3 rounded text-center d-none">Enter valid Phone Number</div>
            </div>
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="number" class=" w-100 rounded p-2 test" id="inputAge" placeholder="Enter Your Age"
                    required>
                <div class="mt-3 pt-3 pb-3 rounded text-center d-none">Enter valid age</div>
            </div>
        </div>
        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center pb-3 gap-3 ">
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="password" class="w-100 rounded p-2 test" id="inputPassword"
                    placeholder="Enter Your Password" required>
                <div class="mt-3 pt-3 pb-3 rounded text-center d-none">Enter valid password *Minimum eight characters,
                    at least one letter and one number:*</div>
            </div>
            <div class="mb-3 overflow-hidden w-100 w-sm-75 w-md-50">
                <input type="password" class=" w-100 rounded p-2 test" id="inputRepassword" placeholder="Repassword"
                    required>
                <div class="mt-3 pt-3 pb-3 rounded text-center d-none">EEnter valid repassword</div>
            </div>
        </div>
        <div class="btnSubmit text-center">
            <button type="submit" class="rounded p-2" id="btnSubmit" disabled>
                submit
            </button>
        </div>

    </div>
    `

    document.getElementById("myRow").innerHTML = cartona;

    // let btnSubmit = document.querySelector("#btnSubmit");

    // btnSubmit.disabled=true;

    function inputTest() {
        return document.querySelectorAll(".test")
    }

    inputTest().forEach(element => {
        element.addEventListener("input", function (e) {
            let element = e.target;
            validationFormContact(element);
        })
    });

    navbar_black.classList.add("d-none");
    iconOpenNavbar.classList.remove("d-none");
    iconCloseNavbar.classList.add("d-none");
})


async function mainDataMeal() {
    let mainMeal = await (await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")).json();
    resMainMeal = mainMeal.meals;
    // console.log(resMainMeal);
    displayMainMeal(resMainMeal);
}

function displayMainMeal(array) {
    let cartona = "";

    for (let i = 0; i < array.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${i}">
                    <img src="${array[i].strMealThumb}" alt="${array[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${array[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;


    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            let indexForMeal = element.id;
            displayMealInformation(array, indexForMeal);
        })
    });
}
mainDataMeal()


function displayMealInformation(array, index) {

    let ingredientsList = "";

    for (let i = 1; i <= 20; i++) {
        let ingredient = array[index][`strIngredient${i}`];
        let ingredientAmou = array[index][`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "" && ingredientAmou !== "") {
            ingredientsList += `
            <li class="rounded p-2 liForRecipes">${ingredientAmou + " " + ingredient}</li>
        `;
        }
    }

    let cartona = `
            <div class="col-md-4">
                <img src="${array[index].strMealThumb}" alt="" class="w-100">
                <h2 class="text-light">${array[index].strMeal} </h2>
            </div>
            <div class="col-md-8">
                <div class="mealInformationInner text-light">
                    <h2>Instructions</h2>
                    <p>${array[index].strInstructions} </p>
                    <h3>Area : ${array[index].strArea} </h3>
                    <h3>Category : ${array[index].strCategory} </h3>
                    <h3>Recipes : </h3>
                    <ul class="list-unstyled d-flex gap-3 flex-wrap">
                        ${ingredientsList}
                    </ul>
                    <h3 class="mb-4">Tags :</h3>
                    <div class="divButtonsLinks">
                        <a href="https://www.bbcgoodfoodme.com/" class="bg-success p-2 text-light text-decoration-none rounded">Source</a>
                        <a href="${array[index].strYoutube}" class="bg-danger p-2 text-light text-decoration-none rounded">Youtube</a>
                    </div>
                </div>
            </div>
`
    document.getElementById("myRow").innerHTML = cartona;
}



function displaySearchPart() {
    let cartona = `
                <div class="col-md-9 ">
                <div class="divSearch d-flex gap-4 w-100">
                    <input type="text" placeholder="Search By Name"
                        class="bg-transparent border-1 border-light rounded p-2 w-100 text-light" id="searchByNameInpu">
                    <input type="text" placeholder="Search By First Letter" maxlength="1"
                        class="bg-transparent border-1 border-light rounded p-2 w-100 text-light" id="searchByFirstLetterInpu">
                </div>
            </div>
    `
    myRowSearch.innerHTML = cartona;

    let searchByNameInpu = document.querySelector("#searchByNameInpu");
    let searchByFirstLetterInpu = document.querySelector("#searchByFirstLetterInpu");

    searchByNameInpu.addEventListener("input", function () {
        let searchByNameValue = searchByNameInpu.value;
        console.log(searchByNameInpu.value);
        searchByName(searchByNameValue);
    });

    searchByFirstLetterInpu.addEventListener("input", function () {
        let searchByFirstLetterValue = searchByFirstLetterInpu.value;
        console.log(searchByFirstLetterInpu.value);
        searchByFirstLetter(searchByFirstLetterValue);
    });
}

async function searchByName(name) {
    let searchByNameVar = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)).json()
    let resSearchByNameVar = searchByNameVar.meals
    console.log(resSearchByNameVar);
    displaySearchByName(resSearchByNameVar)
}

function displaySearchByName(nameArray) {
    let cartona = "";
    for (let i = 0; i < nameArray.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${nameArray[i].idMeal}">
                    <img src="${nameArray[i].strMealThumb}" alt="${nameArray[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${nameArray[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            myRowSearch.innerHTML = null;
            let MealId = element.id;
            console.log(MealId);
            fetchMealById(MealId);
        })
    });
}

async function searchByFirstLetter(name) {
    let searchByFirstLetterVar = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)).json();
    let resSearchByFirstLetterVar = searchByFirstLetterVar.meals;
    console.log(resSearchByFirstLetterVar);
    displaySearchByName(resSearchByFirstLetterVar);
}

function displaySearchByFirstLetter(nameArray) {
    let cartona = "";
    for (let i = 0; i < nameArray.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${nameArray[i].idMeal}">
                    <img src="${nameArray[i].strMealThumb}" alt="${nameArray[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${nameArray[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            myRowSearch.innerHTML = null;
            let MealId = element.id;
            console.log(MealId);
            fetchMealById(MealId);
        })
    });
}



async function getDataCategorie() {
    let dataCategorie = await (await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
    resCategorie = dataCategorie.categories;
    displayCategorie();
}

function displayCategorie() {
    let cartona = "";

    for (let i = 0; i < resCategorie.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divImage position-relative overflow-hidden rounded classCategorieFilter" id="${resCategorie[i].strCategory}">
                    <img src="${resCategorie[i].strCategoryThumb}" alt="${resCategorie[i].strCategory}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute  start-0 end-0 text-center p-3">
                        <h1 class="fs-4 pb-0 ">${resCategorie[i].strCategory}</h1>
                        <p class="pt-0 ">${resCategorie[i].strCategoryDescription?.trim().split(/\s+/).slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let classCategorieFilter = document.querySelectorAll(".classCategorieFilter");

    classCategorieFilter.forEach(element => {
        element.addEventListener("click", function () {
            let elementID = element.id;
            filterCategorie(elementID);
        })
    });
}

async function filterCategorie(categorie) {
    let varFilterCategorie = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)).json();
    let resVarFilterCategorie = varFilterCategorie.meals;
    displayFilterCategorie(resVarFilterCategorie);
}

function displayFilterCategorie(catego) {
    let cartona = "";
    for (let i = 0; i < catego.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${catego[i].idMeal}">
                    <img src="${catego[i].strMealThumb}" alt="${catego[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${catego[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            let MealId = element.id;
            console.log(MealId);
            fetchMealById(MealId);
        })
    });
}



async function fetchMealById(id) {
    let idMealForFetch = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
    let resIdMealForFetch = idMealForFetch.meals
    console.log(resIdMealForFetch);
    displayFetchMealById(resIdMealForFetch);
}

function displayFetchMealById(array) {

    let ingredientsList = "";

    for (let i = 1; i <= 20; i++) {
        let ingredient = array[0][`strIngredient${i}`];
        let ingredientAmou = array[0][`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "" && ingredientAmou !== "") {
            ingredientsList += `
                <li class="rounded p-2 liForRecipes">${ingredientAmou + " " + ingredient}</li>
            `;
        }
    }

    let cartona = `
                <div class="col-md-4">
                    <img src="${array[0].strMealThumb}" alt="" class="w-100">
                    <h2 class="text-light">${array[0].strMeal} </h2>
                </div>
                <div class="col-md-8">
                    <div class="mealInformationInner text-light">
                        <h2>Instructions</h2>
                        <p>${array[0].strInstructions} </p>
                        <h3>Area : ${array[0].strArea} </h3>
                        <h3>Category : ${array[0].strCategory} </h3>
                        <h3>Recipes : </h3>
                        <ul class="list-unstyled d-flex gap-3 flex-wrap">
                            ${ingredientsList}
                        </ul>
                        <h3 class="mb-4">Tags :</h3>
                        <div class="divButtonsLinks">
                            <a href="https://www.bbcgoodfoodme.com/" class="bg-success p-2 text-light text-decoration-none rounded">Source</a>
                            <a href="${array[0].strYoutube}" class="bg-danger p-2 text-light text-decoration-none rounded">Youtube</a>
                        </div>
                    </div>
                </div>
    `
    document.getElementById("myRow").innerHTML = cartona;

}



async function getArea() {
    let areasName = await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")).json();
    let resAreasName = areasName.meals;
    displayAreas(resAreasName)
}

function displayAreas(resAreasName) {
    let cartona = ""
    for (let i = 0; i < resAreasName.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divAreaContent text-center classAreaFilter" id="${resAreasName[i].strArea}">
                    <i class="fa-solid fa-house-laptop" id="iconArea"></i>
                    <h3 id="nameAreaH">${resAreasName[i].strArea}</h3>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let classAreaFilter = document.querySelectorAll(".classAreaFilter");

    classAreaFilter.forEach(element => {
        element.addEventListener("click", function () {
            let elementID = element.id;
            filterArea(elementID)
        })
    });
}

async function filterArea(area) {
    let varFilterArea = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json();
    let resVarFilterArea = varFilterArea.meals;
    displayFilterArea(resVarFilterArea);
}

function displayFilterArea(area) {
    let cartona = "";
    for (let i = 0; i < area.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${area[i].idMeal}">
                    <img src="${area[i].strMealThumb}" alt="${area[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${area[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            let MealId = element.id;
            console.log(MealId);
            fetchMealById(MealId);
        })
    });
}



async function getIngredients() {
    let ingredientsName = await (await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")).json();
    let resIngredientsName = ingredientsName.meals;
    displayIngredients(resIngredientsName)
}

function displayIngredients(resIngredientsName) {
    let cartona = ""
    for (let i = 0; i < 20; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="ingredientsContent text-center classIngredientsFilter" id="${resIngredientsName[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3>${resIngredientsName[i].strIngredient}</h3>
                    <p>${resIngredientsName[i].strDescription?.slice(0, 109)}</p>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let classIngredientsFilter = document.querySelectorAll(".classIngredientsFilter");

    classIngredientsFilter.forEach(element => {
        element.addEventListener("click", function () {
            let elementID = element.id;
            filterIngredients(elementID);
        })
    });
}

async function filterIngredients(ingredient) {
    let varFilterIngredients = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)).json()
    let resvarFilterIngredients = varFilterIngredients.meals;
    displayFilterArea(resvarFilterIngredients);
}

function resvarFilterIngredients(area) {
    let cartona = "";
    for (let i = 0; i < area.length; i++) {
        cartona += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="divImage position-relative overflow-hidden rounded mealInformation" id="${catego[i].idMeal}">
                    <img src="${area[i].strMealThumb}" alt="${area[i].strMeal}" class="w-100 d-inline-block">
                    <div class="divLayOut position-absolute start-0 end-0 d-flex align-items-center">
                        <h1>${area[i].strMeal}</h1>
                    </div>
                </div>
            </div>
`
    }
    document.getElementById("myRow").innerHTML = cartona;

    let mealInformation = document.querySelectorAll(".mealInformation");
    mealInformation.forEach(element => {
        element.addEventListener("click", function () {
            let MealId = element.id;
            console.log(MealId);
            fetchMealById(MealId);
        })
    });
}

//  element.value == pass &&  pass != "" ||  element.value !== ""
//1234567m

// function validationFormContact(element) {

//     if (element.id === "inputRepassword") {
//         let pass = document.querySelector("#inputPassword").value;
//         if (element.value !== "" && element.value === pass) {
//             element.nextElementSibling.classList.add("d-none");
//                 element.classList.add("true");
//                 console.log(element);

//         } else {
//             element.nextElementSibling.classList.remove("d-none");
//             element.classList.remove("true");
//         }
//         return;
//     }

//     if (element.id !== "inputRepassword") {
//     if (regex[element.id].test(element.value)) {
//         element.nextElementSibling.classList.add("d-none");
// element.classList.add("true");

//     } else {
//         element.nextElementSibling.classList.remove("d-none");
//         // element.classList.remove("true");
//     }
//     }else{
//         return;
//     }
//     // if (element.value == "") {
//     //     element.nextElementSibling.classList.add("d-none");
//     //     element.classList.remove("true");
//     // }
// // if (element) {
// //     console.log(element);
// // }

//     toggleButton();
// }

function validationFormContact(element) {

    if (element.id === "inputRepassword") {
        let pass = document.querySelector("#inputPassword").value;

        if (element.value !== "" && element.value === pass) {
            element.nextElementSibling.classList.add("d-none");
            element.classList.add("true");
        } else {
            element.nextElementSibling.classList.remove("d-none");
            element.nextElementSibling.classList.add("d-block");
            element.classList.remove("true");
        }
        if (element.value == "") {
            element.nextElementSibling.classList.add("d-none");
        }
        toggleButton();
        return;
    }

    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.add("d-none");
        element.classList.add("true");
    } else {
        element.nextElementSibling.classList.remove("d-none");
        element.classList.remove("true");
    }

    if (element.value === "") {
        element.nextElementSibling.classList.add("d-none");
        element.classList.remove("true");
    }

    toggleButton();
}


function toggleButton() {

    let btnSubmit = document.querySelector("#btnSubmit");
    let inputNmae = document.querySelector("#inputNmae");
    let inputEmail = document.querySelector("#inputEmail");
    let inputPhone = document.querySelector("#inputPhone");
    let inputAge = document.querySelector("#inputAge");
    let inputPassword = document.querySelector("#inputPassword");
    let inputRepassword = document.querySelector("#inputRepassword");

    if (inputNmae.classList.contains("true") && inputEmail.classList.contains("true") && inputPhone.classList.contains("true") && inputAge.classList.contains("true") && inputPassword.classList.contains("true") && inputRepassword.classList.contains("true")) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }

}


// let shortDesc = item.strDescription?.slice(0, 100) + "...";
