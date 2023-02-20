const toggle = document.getElementsByClassName("navbar-toggler")[0];

const navbar = document.getElementsByClassName("navbar-nav")[0];

toggle.addEventListener("click", () => {
  navbar.classList.toggle("hide");
});

function togglemuted(x) {
  x.classList.toggle("image-muted");
}

function togglefavourite(x) {
  x.classList.toggle("unfavourite");
}



function createcardfooter(footer) {

  let footerhtml = document.createElement('div')
  footerhtml.classList.add('card-footer')
  footerelements = ""
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
function createcard(course) {
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

function show_course_cards(Courses) {
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

async function getdata(url) {
  const response = await fetch(url)
  let data = await response.json()
  show_course_cards(data);

}

getdata("../Courses.json")

