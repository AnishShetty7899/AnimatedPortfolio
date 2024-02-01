//toggle icon nav bar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
// scroll section
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      //active nav bar links

      navlinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      //active section for animation on scroll
      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });
  //sticky headder
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation fotter on scroll
  let fotter = document.querySelector("footer");
  fotter.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
  );
};

// to make work contact me section
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect form data
    let formData = new FormData(this);
    // AJAX code to send the form data

    fetch("https://formspree.io/f/xnqepqzn", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Message sent successfully!");
          contactForm.reset();
        } else {
          alert(
            "Failed to send message. Please check the console for details."
          );
          console.error(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// read more
document.getElementById("read-more-btn").addEventListener("click", function () {
  var hiddenContent = document.querySelector("#about .hidden-content");

  // Toggle the visibility of the hidden content
  if (
    hiddenContent.style.display === "none" ||
    hiddenContent.style.display === ""
  ) {
    hiddenContent.style.display = "block";
    this.textContent = "Read Less";
  } else {
    hiddenContent.style.display = "none";
    this.textContent = "Read More";
  }
});
// animation after 40% scroll

function handleScroll() {
  let viewportHeight = window.innerHeight;

  sections.forEach((section, index) => {
    let rect = section.getBoundingClientRect();
    let offset = viewportHeight * 0.4; // Adjust this percentage

    if (rect.top < viewportHeight - offset && rect.bottom >= 0) {
      // Section is scrolled more than 60% visible
      section.classList.add("show-animate");

      // Trigger animation for the next section
      if (index < sections.length - 1) {
        let nextSection = sections[index + 1];
        let nextRect = nextSection.getBoundingClientRect();

        if (nextRect.top < viewportHeight - offset && nextRect.bottom >= 0) {
          nextSection.classList.add("show-animate");
        }
      }
    } else {
      section.classList.remove("show-animate");
    }
  });
}
