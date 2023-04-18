let box_filter_button = document.querySelectorAll(".box-filter button")

function addActive_button(ee) {
    box_filter_button.forEach(e => {
        e.addEventListener("click", () => {
            box_filter_button.forEach(e => {
                e.classList.remove("button")
            })
            e.classList.add("button")
        })
    })
}
addActive_button()



// --------------------------------------------------------

// start scroll type oils 


let wrapper = document.querySelectorAll(".box-oils");

const dragging = (e) => {
    e.scrollLeft = e.pageX
    console.log(e.clientX);
    // e.style.transform = `translateX(${e.pageX})`
}

wrapper.forEach(e => {
    e.addEventListener("mousedown", dragging)
    e.addEventListener("mouseup", dragging)
})


// start featch type oile and filter

let swiperWrapper = document.querySelector(".oils-available .swiper .swiper-wrapper")
let typeOile = [];
fetch("/data.json")
    .then(res => res.json())
    .then(data => {
        
        data.forEach(e => {
            swiperWrapper.innerHTML += `
                <div class="swiper-slide ">
                    <div class="small-box">
                        <input type="checkbox" value=${e.price}  class="pointer notFree">
                        <img src="${e.img}" alt="">
                        <h4>${e.name}</h4>
                        <p class=${e.price}>SAR ${e.price}</p>
                    </div>
                </div>
                `
        })
        typeOile = data
    })


const filter = (value) => {
    const updatFilter = typeOile.filter((e) => e.walkway === value)
    updatFilter.forEach(e => {
        swiperWrapper.innerHTML += `
            <div class="swiper-slide ">
                <div class="small-box">
                    <input type="checkbox" value=${e.price}  class="pointer notFree">
                    <img src="${e.img}" alt="">
                    <h4>${e.name}</h4>
                    <p class=${e.price}>SAR ${e.price}</p>
                </div>
            </div>
            `
    })
}

box_filter_button.forEach(e => {
    e.addEventListener("click", () => {
        swiperWrapper.innerHTML = ''
        filter(e.value)
    })
})

// --------------------------------------------------------------------

// start servies 

let servies_swiperWrapper = document.querySelector(".servies .swiper-wrapper")
function createFlater() {
    fetch("/flater.json")
        .then(res => res.json())
        .then(data =>
            data.forEach(e => {
                servies_swiperWrapper.innerHTML += `
                <div class="swiper-slide ">
                    <div class="small-box">
                        <input type="checkbox" value=${e.price} class="pointer notFree">
                        <h4>${e.name}</h4>
                        <i class="fa-solid fa-car"></i>
                        <p class=${e.price} >sar ${e.price}</p>
                    </div>
                </div>
                `
            })
        )
}
createFlater()

// start calc price 
let totalPrice = 0;
let total = document.querySelector(".box-total h3")
setTimeout(() => {
    let checkbox = document.querySelectorAll(".notFree")
        checkbox.forEach(e => {
            e.addEventListener("change", () => {
                if(e.checked == true){
                    totalPrice += +e.value
                    console.log(totalPrice);
                }else{
                    totalPrice -= +e.value
                    console.log(totalPrice);
                }
            })
        })
}, 100);
setInterval(() => {
    total.innerHTML = `SAR ${totalPrice}`
}, 100);