var contactForm = document.getElementById("contactForm");

let projects = [];

function checkNumber(n) {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let number = n.split("").map((e) => Number(e));

  for (let n of number) {
    if (!numbers.includes(n)) {
      return false;
    }
  }

  return true;
}

function submitForm(e) {
  var form = e.target;
  var formData = new FormData(form);

  var data = Object.fromEntries(formData.entries());
  var link = document.createElement("a");

  if (checkNumber(data.phoneNumber)) {
    link.href = `mailto:hadrizal7@gmail.com?subject=${data.subject}&body=Selamat siang, Nama saya ${data.name}.`;
    link.href += `%0D%0ASilahkan hubungi saya`;
    const pesan = `\n\n${data.message}`;
    link.href += `di ${data.email} atau ${
      data.phoneNumber
    } ${encodeURIComponent(pesan)}`;

    link.click();
  } else {
    alert("Mohon masukkan angka pada nomer handphone");
  }
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  submitForm(e);
});

function addProject(e) {
  e.preventDefault();

  let title = document.getElementById("project_name").value;
  let startDate = document.getElementById("start_date").value;
  let endDate = document.getElementById("end_date").value;
  let description = document.getElementById("description").value;
  let technologies = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  let imageInput = document.getElementById("upload-image");

  if (
    title == "" ||
    startDate == "" ||
    imageInput.files.length === 0 ||
    endDate == "" ||
    description == ""
  ) {
    return alert("All input fields cannot be empty");
  }

  const technologyList = Array.from(technologies).map((item) => item.value);
  console.log(technologyList);

  let image = URL.createObjectURL(imageInput.files[0]);

  let post = {
    author: "M Rizal",
    title: title,
    content: description,
    image: image,
    technologies: technologyList,
    startDate: startDate,
    endDate: endDate,
    postedAt: new Date(),
  };
  console.log(post);
  projects.push(post);

  renderBlog();

  document.getElementById("postForm").reset();
}

function renderBlog() {
  console.group(projects);

  let postProject = document.getElementById("post-main");
  postProject.innerHTML = firstProjectContent();

  for (let i = 0; i < projects.length; i++) {
    console.log(projects[i].technologies);
    let categories = projects[i].technologies;
    categories = categories.map((item) => (item = `<span>${item}</span>`));

    // categories = categories.join("");
    postProject.innerHTML += `
        <div class="post-item">
            <div class="post-thumbnail">
              <a href="#">
                <img src="${projects[i].image}" alt="title" />
              </a>
            </div>
            <div class="post-title">
              <a href="#">
                <h2>${projects[i].title}</h2>
              </a>
            </div>
            <div class="post-time">
                Posted at <span>${timePost(projects[i].postedAt)}</span> ||
                <span>${getRelativeTime(
                  projects[i].startDate,
                  projects[i].endDate
                )}</span>
            </div>
            <div class="post-summary">
              <p>
                ${projects[i].content}
              </p>
            </div>
            <div class="post-category">
              ${categories}
            </div>
            <div class="post-button">
              <a href="#" class="button-edit" target="_blank">edit</a>
              <a href="#">detail</a>
              <a href="#" class="button-delete" target="_blank">delete</a>
            </div>
          </div>
    `;
  }
}

function firstProjectContent() {
  return `
        <div class="post-item">
            <div class="post-thumbnail">
              <a href="#">
                <img src="../assets/blog-img.png" alt="title" />
              </a>
            </div>
            <div class="post-title">
              <a href="#">
                <h2>Some amazing project title here</h2>
              </a>
            </div>
            <div class="post-time">
              <span>Posted at 7/12/2024</span> ||
              <span>Durasi : 1 bulan</span>
            </div>
            <div class="post-summary">
              <p>
                Here what've done, you looking good, but actually it's not
                enough. Do more!
              </p>
            </div>
            <div class="post-category">
              <span>js</span>
              <span>nextjs</span>
              <span>nodejs</span>
            </div>
            <div class="post-button">
              <a href="#" class="button-edit" target="_blank">edit</a>
              <a href="#">detail</a>
              <a href="#" class="button-delete" target="_blank">delete</a>
            </div>
          </div>
    `;
}
