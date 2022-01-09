/* Description: Custom JS file */
// let arr = ['polygon1', 'polygon2', 'polygon3']
// for (let i = 0; i < arr.length; i++) {
//     document.querySelector(`.polygons`).onmousemove = function(e) {

//         let moveNum = (e.pageX / innerWidth) * 180;
//         let moveNum2 = (e.pageY / innerHeight) * 180;

//         let newNum = ((e.pageX - innerWidth / 2) / (innerWidth / 2));
//         let newNum2 = ((e.pageY - innerHeight / 2) / (innerHeight / 2));

//         console.log(newNum)
//         document.querySelector(`.polygon1`).style.transform = `translate(${-0 - (newNum*10)}%,${10 - (newNum2*(i/5))}%)`
//         document.querySelector(`.polygon2`).style.transform = `translate(${-15 - (newNum*10)}%,${-7 - (newNum2*(i/5))}%)`
//         document.querySelector(`.polygon3`).style.transform = `translate(${-15 - (newNum*10)}%,${-7 - (newNum2*(i/5))}%)`
//     }
// }


/* Navigation*/


window.onload = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 30) {
        document.getElementById("navbarExample").classList.add("top-nav-collapse");
    } else if (document.documentElement.scrollTop < 30) {
        document.getElementById("navbarExample").classList.remove("top-nav-collapse");
    }
}

// Navbar on mobile
let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", () => {
        document.querySelector(".offcanvas-collapse").classList.toggle("open");
    });
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
    document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
    const _d = e.target.closest(".dropdown");
    let _m = document.querySelector(".dropdown-menu", _d);

    setTimeout(
        function() {
            const shouldOpen = _d.matches(":hover");
            _m.classList.toggle("show", shouldOpen);
            _d.classList.toggle("show", shouldOpen);

            _d.setAttribute("aria-expanded", shouldOpen);
        },
        e.type === "mouseleave" ? 300 : 0
    );
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) {
    document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
    document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

    // On click
    document.querySelector(".dropdown").addEventListener("click", (e) => {
        const _d = e.target.closest(".dropdown");
        let _m = document.querySelector(".dropdown-menu", _d);
        if (_d.classList.contains("show")) {
            _m.classList.remove("show");
            _d.classList.remove("show");
        } else {
            _m.classList.add("show");
            _d.classList.add("show");
        }
    });
}