// start my cars
// open add cars

let addCar = document.querySelector(".new-cars");
let popadding = document.querySelector(".pop-add-car");
let boxNav_addCar = document.querySelector(".box-nav .add-car ");
addCar.addEventListener("click", (e) => {
    popadding.style.transform = "translateX(0%) scaleX(1)";
});
boxNav_addCar.addEventListener("click", (e) => {
    popadding.style.transform = "translateX(-100%) scaleX(0)";
});


// -----------------------------------------------------------------------------------

// add cars
let buttonAdd = document.querySelector(".form-add-cars button");
let boxTypeCar = document.querySelector(".box-type-car");
let allSelect = document.querySelectorAll(".select select");
let brand = document.querySelector(".select .brand");
let model = document.querySelector(".select .model");
let year = document.querySelector(".select .year");
let mistake = document.querySelector(".mistake");
let addTrue = false;

let mood = 'Create'
let tmp;

//local storge
let dataCars;
if (localStorage.addCars != null) {
    dataCars = JSON.parse(localStorage.addCars)
} else {
    dataCars = [];
}

let yes_add = false;
buttonAdd.onclick = function () {
    allSelect.forEach((e) => {
        if (e.value == "الماركة" || e.value == "الموديل" || e.value == "السنة" || e.value == "اسطوانات") {
            mistake.style.opacity = "1"
        } else {
            popadding.style.transform = "translateX(-100%) scaleX(0)";
            mistake.style.opacity = "0"
            yes_add = true
        }
    });
    if (yes_add == true) {
        let newCars = {
            brand: brand.value,
            model: model.value,
            year: year.value,
        }

        if (mood == 'Create') {
            if (newCars.count > 1) {
                for (let i = 0; i < newCars.count; i++) {
                    dataCars.push(newCars)
                }
            } else {
                dataCars.push(newCars)
            }
        } else {
            dataCars[tmp] = newCars;
            mood = 'Create'
            buttonAdd.innerHTML = 'Create'
        }
        localStorage.setItem('addCars', JSON.stringify(dataCars));
    }
    showCars();
}

function showCars() {
    let table = '';
    for (let i = 0; i < dataCars.length; i++) {
        table += `
        <div class="type-car d-flex justify-content-space-between align-items-center">
        <a href="/order-details/orderDetails.html" class="name-car d-flex align-items-center justify-content-center pointer">
            <i class="fa-solid fa-car"></i>
            <div class="title-car">
            <h3> <span>${dataCars[i].brand}</span> <span>${dataCars[i].model}</span> <span>${dataCars[i].year}</span> </h3>
            <p>موعد تغيير الزيت التالي</p>
            </div>
        </a>
        <a class="change-oils pointer">
            <i class="fa-solid fa-oil-can"></i>
            <h4>احجز تغيير زيت</h4>
        </a>
        <div class="delete">
            <i class="fa-sharp fa-solid fa-trash pointer" onclick="deleteData(${i})"></i>
            <i class="fa-sharp fa-solid fa-circle-exclamation pointer"></i>
        </div>
    </div>
    `
    }
    boxTypeCar.innerHTML = table;
}
showCars();


// ----------------------------------
let popDeleted = document.querySelector(".pop-deleted");
let deleteCars = document.querySelector(".yes-delete");
let noDeleteCars = document.querySelector(".no-delete");
let trueDelete = false;

function deleteData(i) {
    // console.log(i);
    popDeleted.style.transform = "translate(-50%,-50%) scale(1)"
    deleteCars.onclick = function () {
        dataCars.splice(i, 1);
        localStorage.addCars = JSON.stringify(dataCars);
        showCars();
        popDeleted.style.transform = "translate(-50%,-50%) scale(0)"
    }
    noDeleteCars.onclick = function () {
        popDeleted.style.transform = "translate(-50%,-50%) scale(0)"
    }
}


// start add cars name and module...
let cars = [];
function createSelect(){
    fetch("/typeCars.json")
    .then(res => res.json())
    .then(data =>
        data.forEach(e => {
            brand.innerHTML += `
                    <option value=${e.name}>${e.name}</option>
                `
            brand.addEventListener("change", (ee) => {
                if (brand.value == e.name) {
                    model.innerHTML = '<option selected disabled>الموديل</option>'
                    e.model.forEach(models => {
                        model.innerHTML += `
                            <option value=${models}>${models}</option>
                            `
                    })
                }
            })
        })
    )
    for (let index = 2000; index < 2022; index++) {
        year.innerHTML += `
        <option value=${index}>${index}</option>
        `
    }
}
createSelect();