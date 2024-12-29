let blogs = []; // length nya adalah 0

function addBlog(e) {
  e.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let imageInput = document.getElementById("input-blog-image");

  if (title == "" || content == "" || imageInput.files.length === 0) {
    return alert("All input fields cannot be empty");
  }

  let image = URL.createObjectURL(imageInput.files[0]);

  let blog = {
    author: "Karunia Leo G",
    title: title,
    content: content,
    image: image,
    postedAt: new Date(),
  };

  blogs.push(blog);

  renderBlog();
}

function renderBlog() {
  console.log(blogs);

  let blogListElement = document.getElementById("blogList");

  blogListElement.innerHTML = firstBlogContent();

  for (let i = 0; i < blogs.length; i++) {
    const formattedTime = dateToWIB(blogs[i].postedAt);
    // menampilkan blogs yang sudah kita buat dengan mengisi form
    console.log(blogs[i]);

    blogListElement.innerHTML += `
        <div id="${i}" class="blog-list-item">
            <div class="blog-image">
              <img src="${blogs[i].image}" alt="blog-image" />
            </div>
            <div class="blog-content">
              <div class="btn-group">
                <button class="btn-edit">Edit Post</button>
                <button class="btn-post">Post Blog</button>
              </div>
              <h1>
                <a href="blog-detail.html" class="blog-item-title">
                  ${blogs[i].title}
                </a>
              </h1>
              <div class="detail-blog-content">
                ${formattedTime} | ${blogs[i].author}
              </div>
              <p class="blog-text">
                ${blogs[i].content}
              </p>
              <p class="relative-time">
              ${getRelativeTime(blogs[i].postedAt)}
              </p>
            </div>
          </div>
    `;
  }
}

function firstBlogContent() {
  return `
        <div class="blog-list-item">
            <div class="blog-image">
              <img src="assets/blog-img.png" alt="blog-image" />
            </div>
            <div class="blog-content">
              <div class="btn-group">
                <button class="btn-edit">Edit Post</button>
                <button class="btn-post">Post Blog</button>
              </div>
              <h1>
                <a href="blog-detail.html" class="blog-item-title">
                  Blog Title with Javascript
                </a>
              </h1>
              <div class="detail-blog-content">
                12 Jul 2024 22:30 WIB | Karunia Leo G
              </div>
              <p class="blog-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                explicabo totam labore sit tempore, voluptate vitae nesciunt in
                maiores rerum, vero veritatis numquam iure aut sunt nemo.
              </p>
            </div>
          </div>
    `;
}

function dateToWIB(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mey",
    "Jun",
    "Jul",
    "Aug",
    "Okt",
    "Nov",
    "Des",
  ];

  let day = date.getDate().toString();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  // console.log(`Sekarang tanggal ${day} bulan ${month} tahun ${year}`);

  return `${day} ${month} ${year} ${hour}:${minutes}`;
}

function getRelativeTime(targetDate) {
  let now = new Date();
  let diffInSeconds = Math.floor((now - targetDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second` + diffInSeconds > 1 ? "s" : "" + ` ago`;
  }

  let diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInSeconds < 60) {
    return `${diffInSeconds} minute` + diffInMinutes > 1 ? "s" : "" + ` ago`;
  }
}
