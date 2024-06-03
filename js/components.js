// Function to include the navbar component
function includeNavbar() {
  // Fetch the navbar HTML file
  fetch("./components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      // Insert the navbar HTML into the navbar-container div
      document.getElementById("navbar-container").innerHTML = data;
      setActiveLink();
      // Once the navbar is loaded, show the content
      document.getElementById("content").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching navbar:", error);
    });
}
// Function to include the footer component
function includeFooter() {
  // Fetch the footer HTML file
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      // Insert the footer HTML into the footer-container div
      document.getElementById("footer-container").innerHTML = data;
    })

    .catch((error) => {
      console.error("Error fetching footer:", error);
    });
}
function setActiveLink() {
  const currentLocation = new URL(location.pathname, location.origin).pathname;
  const menuItems = document.querySelectorAll(".nav-link");

  menuItems.forEach(menuItem => {
    const menuItemHref = new URL(menuItem.getAttribute("href"), location.origin).pathname;

    // Normalize both paths to ensure consistency
    const normalizedCurrentLocation = currentLocation.replace(/\/$/, "");
    const normalizedMenuItemHref = menuItemHref.replace(/\/$/, "");

    if (normalizedMenuItemHref === normalizedCurrentLocation) {
      menuItem.classList.add("active");
    }
  });
}



// Call the functions to include the navbar and footer when the page loads
window.onload = function () {
  includeNavbar();
  includeFooter();
};
