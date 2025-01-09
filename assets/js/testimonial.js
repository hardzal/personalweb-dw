async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

function testimonialHTML(data) {
  return data
    .map(
      (testimonial) => `
      <div class="d-flex justify-content-center my-3">
          <div class="card p-3 col mx-0">
              <img src="assets/images/${testimonial.image}" class="card-img-top" alt="..." />
              <div class="card-body px-0">
                <div class="overflow-scroll" style="height: 50px">
                  <p class="card-text">${testimonial.description}</p>
                </div>
                <div class="text-end fw-bold mt-3">
                  <p>- ${testimonial.name}</p>
                  <p>${testimonial.rating}✯</p>
                </div>
              </div>
          </div>
      </div>`
    )
    .join("");
}

async function getTestimonial() {
  const testimonialList = await getData(
    "http://localhost:5000/api/testimonials"
  );

  if (testimonialList) {
    const testimonialsHTML = testimonialHTML(testimonialList);
    console.log(testimonialsHTML);
    return testimonialsHTML;
  } else {
    console.log("Tidak ada data");
    return [];
  }
}

const testimonialsContainer = document.getElementById("testimonialsContainer");

async function showAllTestimonials() {
  testimonialsContainer.innerHTML = await getTestimonial();
}

showAllTestimonials();

async function filterTestimonialByStar(rating) {
  const testimonialList = await getData(
    "http://localhost:5000/api/testimonials"
  );

  const filteredTestimonial = testimonialList.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<p>No testimonials.</p>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialHTML(filteredTestimonial);
  }, 500);
}
