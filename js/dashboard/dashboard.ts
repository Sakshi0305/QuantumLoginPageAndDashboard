import { Course, Footer } from './interfaces';




function createcardfooter(footer: Footer) {

    let footerhtml = document.createElement('div')
    footerhtml.classList.add('card-footer')
    let footerelements: string = ""
    if (footer.iswatch) {
        footerelements += '<img src="icons/preview.svg" onclick="togglemuted(this)" />'
    } else {
        footerelements += '<img src="icons/preview.svg" onclick="togglemuted(this)" class="image-muted"/>'
    }

    if (footer.iscalender) {
        footerelements += '<img src="icons/manage course.svg" onclick="togglemuted(this)" />'
    } else {
        footerelements += '<img src="icons/manage course.svg" onclick="togglemuted(this)" class="image-muted"/>'
    }

    if (footer.isgraded) {
        footerelements += '<img src="icons/grade submissions.svg" onclick="togglemuted(this)" />'
    } else {
        footerelements += '<img src="icons/grade submissions.svg" onclick="togglemuted(this)" class="image-muted"/>'
    }

    if (footer.isreported) {
        footerelements += '<img src="icons/reports.svg" onclick="togglemuted(this)" />'
    } else {
        footerelements += '<img src="icons/reports.svg" onclick="togglemuted(this)" class="image-muted"/>'
    }
    footerhtml.innerHTML = footerelements
    return footerhtml
}
function createcard(course: Course) {
    let card = ""
    if (course.isfavourite) {

        card += '<span class="favourite" onclick="togglefavourite(this)"></span>'
    } else {
        card += '<span class="unfavourite" onclick="togglefavourite(this)"></span>'
    }

    if (course.isexpired) {
        card += '<span class="expired">EXPIRED</span>'
    }
    let cardcontent = `  
  
      <div class="card-contents">
        <div class="col-4">
          <img src="${course.image}" class="img-fluid" alt="..." />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">${course.title}</h5>
            <div class="content">
              <p class="subject">${course.subject}</p>
              <p class="grade">
                Grade ${course.grade}
                <span class="additional">+${course.additional_grade}</span>
              </p>
            </div>
            <div class="info-set">
            ${course.units ? '<div class="info"><p class="text"><span>' + course.units + '</span> units</p></div>' : " "}
            ${course.lessons ? '<div class="info"><p class="text"><span>' + course.lessons + '</span> Lessons</p></div>' : " "}
            ${course.topics ? '<div class="info"><p class="text"><span>' + course.topics + '</span> topics</p></div>' : " "}
  
  
            </div>`
    card += cardcontent
    let dropdown = `
            <div class="dropdown">
              `
    if (course.classes.length == 0) {
        dropdown += `<select value="classes" name="classes" class="noclasses">`
        dropdown += `<option value="s1">No Classes</option>`
    } else {
        dropdown += `<select value="classes" name="classes">`
        for (let index = 0; index < course.classes.length; index++) {
            dropdown += `<option value="${course.classes[index]}">${course.classes[index]}</option>`
        }
    }
    dropdown += `
  </select>
  </div>
  `
    card += dropdown
    let contents = `
            <div class="content">
            ${course.students ? '<p class="students">' + course.students + ' students</p>' : " "}
  
              <p class="dates">${course.start_date ? course.start_date : " "}  ${course.end_date ? "-" + course.end_date : " "}</p>
            </div>
          </div>
        </div>
      </div>
  `
    card += contents

    return card
}

function show_course_cards(Courses: Course[]) {
    const propertyContainer = document.getElementsByClassName('inner-container')[0]

    for (let index = 0; index < Courses.length; index++) {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = createcard(Courses[index])
        let footerhtml = createcardfooter(Courses[index].footer)
        card.appendChild(footerhtml)
        propertyContainer.appendChild(card)
    }
}

async function getdata(url: string) {
    const response = await fetch(url)
    let data: Course[] = await response.json()
    show_course_cards(data);

}

getdata("../Courses.json")



// Interaction in dashboard


// alerts onhover interaction

const alert = document.querySelector<HTMLElement>(".alert");
const alerts = document.getElementsByClassName("alerts")[0];

let onalert: boolean = false
alert.addEventListener("mouseenter", () => {
    alerts.classList.remove("hide");
    document.querySelector<HTMLElement>(".alert a img").style.filter = "brightness(0) invert(1)"
    document.querySelector<HTMLElement>(".alert a span").style.display = "none"

    onalert = true
});
alerts.addEventListener("mouseenter", () => {
    onalert = true
    alerts.classList.remove("hide");
    document.querySelector<HTMLElement>(".alert a img").style.filter = "brightness(0) invert(1)"
    document.querySelector<HTMLElement>(".alert a span").style.display = "none"


})
alerts.addEventListener("mouseleave", () => {
    onalert = false
    alerts.classList.add("hide");
    document.querySelector<HTMLElement>(".alert a img").style.filter = "none"
    document.querySelector<HTMLElement>(".alert a span").style.display = "flex"

})
alert.addEventListener("mouseleave", () => {
    onalert = false
    setTimeout(() => {
        if (!onalert) {
            alerts.classList.add("hide");
            document.querySelector<HTMLElement>(".alert a img").style.filter = "none"
            document.querySelector<HTMLElement>(".alert a span").style.display = "flex"

        }



    }, 100);
});


// Notifications hover effects


const announcement = document.querySelector<HTMLElement>(".announcement");
const announcements = document.getElementsByClassName("announcements")[0];

let onannouncement: boolean = false
announcement.addEventListener("mouseenter", () => {
    announcements.classList.remove("hide");
    document.querySelector<HTMLElement>(".announcement a img").style.filter = "brightness(0) invert(1)"
    document.querySelector<HTMLElement>(".announcement a span").style.display = "none"

    onannouncement = true
});
announcements.addEventListener("mouseenter", () => {
    onannouncement = true
    announcements.classList.remove("hide");
    document.querySelector<HTMLElement>(".announcement a img").style.filter = "brightness(0) invert(1)"
    document.querySelector<HTMLElement>(".announcement a span").style.display = "none"


})
announcements.addEventListener("mouseleave", () => {
    onannouncement = false
    announcements.classList.add("hide");
    document.querySelector<HTMLElement>(".announcement a img").style.filter = "none"
    document.querySelector<HTMLElement>(".announcement a span").style.display = "flex"

})
announcement.addEventListener("mouseleave", () => {
    console.log("card-title");
    onannouncement = false
    setTimeout(() => {
        if (!onannouncement) {
            announcements.classList.add("hide");
            document.querySelector<HTMLElement>(".announcement a img").style.filter = "none"
            document.querySelector<HTMLElement>(".announcement a span").style.display = "flex"

        }



    }, 100);
});


function togglemuted(x: any) {
    x.classList.toggle("image-muted");
}

function togglefavourite(x: any) {
    x.classList.toggle("unfavourite");
}

function tooglecheckmark(x: any) {
    x.classList.toggle("abort");
}


const navdropdown = document.querySelectorAll(".nav-item.dropdown ")

for (let index = 0; index < navdropdown.length; index++) {
    const element = navdropdown[index];
    element.addEventListener("click", () => {
        for (let it = 0; it < navdropdown.length; it++) {
            navdropdown[it].classList.remove("select")

        }
        element.classList.add("select")

    })
}



// Navbar interaction onhover display menu and onmouseout hide the menu
const toggle = document.getElementsByClassName("navbar-toggler")[0];

const navbar = document.getElementsByClassName("navbar-nav")[0];

let onnav: boolean = false
toggle.addEventListener("mouseenter", () => {
    navbar.classList.remove("hide");
    onnav = true
});
navbar.addEventListener("mouseenter", () => {
    onnav = true
    navbar.classList.remove("hide");

})
navbar.addEventListener("mouseleave", () => {
    onnav = false
    navbar.classList.add("hide");
    for (let it = 0; it < navdropdown.length; it++) {
        navdropdown[it].classList.remove("select")

    }
})
toggle.addEventListener("mouseleave", () => {
    onnav = false
    setTimeout(() => {
        if (!onnav) {
            navbar.classList.add("hide");
            for (let it = 0; it < navdropdown.length; it++) {
                navdropdown[it].classList.remove("select")

            }
        }



    }, 100);
});

