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

    const productName = document.createElement("h2");
    productName.textContent = product.name;

    const productDetails = document.createElement("p");
    productDetails.textContent = `
      Size: ${product.size}, Color: ${product.color}, 
      Weight: ${product.weight}, Price: $${product.price}
    `;

    productItem.appendChild(productImage);
    productItem.appendChild(productName);
    productItem.appendChild(productDetails);

    productList.appendChild(productItem);
  });
};

// Call the function to fetch and display the products with images
fetchProductsWithImages();
