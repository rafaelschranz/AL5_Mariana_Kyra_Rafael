const fetchProductsWithImages = async () => {
  const sqlQuery = `
    SELECT size, color, name, weight, product_image, price 
    FROM product
    WHERE product_image IS NOT NULL AND product_image <> ''
  `;

  try {
    const result = await databaseClient.executeSqlQuery(sqlQuery);
    const products = result[1]; // Get the array of products from the response
    if (products && products.length > 0) {
      console.log("Fetched products with images:", products);
      displayProducts(products);
    } else {
      console.log("No products with images found.");
    }
  } catch (error) {
    console.error("Error fetching products with images:", error);
  }
};

const displayProducts = (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";

    const productImage = document.createElement("img");
    productImage.className = "product-image";
    productImage.src = product.product_image; // Original image URL
    productImage.alt = product.name;

    const productInfo = document.createElement("div");
    productInfo.className = "product-info"; // New div for product name and price

    const productName = document.createElement("h2");
    productName.textContent = product.name;
    productName.className = "product-name"; // Class for product name styling

    const productPrice = document.createElement("p");
    productPrice.textContent = `$${product.price}`;
    productPrice.className = "product-price"; // Class for product price styling

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    // Create a separate div for product color
    const productColor = document.createElement("div");
    productColor.textContent = product.color;
    productColor.className = "product-color"; // Class for product color styling

    // Create an "Order Now" button
    const orderButton = document.createElement("button");
    orderButton.textContent = "Order Now";
    orderButton.className = "order-button"; // Class for button styling

    productItem.appendChild(productImage);
    productItem.appendChild(productInfo);
    productItem.appendChild(productColor); // Append the color information outside product-info div
    productItem.appendChild(orderButton); // Append the "Order Now" button

    productList.appendChild(productItem);
  });
};

// Call the function to fetch and display the products with images
fetchProductsWithImages();
