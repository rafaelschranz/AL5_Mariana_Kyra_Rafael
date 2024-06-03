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
  // Get the current pathname considering the base URL of GitHub Pages
  const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
  const currentLocation = new URL(window.location.pathname, window.location.origin).pathname;
  const normalizedCurrentLocation = currentLocation.replace(/\/$/, "");

  const menuItems = document.querySelectorAll(".nav-link");

  menuItems.forEach(menuItem => {
    const menuItemHref = new URL(menuItem.getAttribute("href"), window.location.origin).pathname;
    const normalizedMenuItemHref = menuItemHref.replace(/\/$/, "");

    // If the base path exists, prepend it to the hrefs being compared
    const finalMenuItemHref = basePath ? basePath + normalizedMenuItemHref : normalizedMenuItemHref;

    if (finalMenuItemHref === normalizedCurrentLocation) {
      menuItem.classList.add("active");
    }
  });
}




// Call the functions to include the navbar and footer when the page loads
window.onload = function () {
  includeNavbar();
  includeFooter();
};
