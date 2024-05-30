
const fetchCollections = async () => {
  const sqlQuery = `
    SELECT collection_ID, name, image
    FROM collection
  `;

  try {
    const result = await databaseClient.executeSqlQuery(sqlQuery);
    const collections = result[1]; // Get the array of collections from the response
    if (collections && collections.length > 0) {
      console.log("Fetched collections:", collections);
      displayCollections(collections);
    } else {
      console.log("No collections found.");
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
// Define a global variable to hold all products
let allProducts = [];

// Function to fetch all products
const fetchAllProducts = async () => {
    const sqlQuery = `
        SELECT size, color, name, weight, product_image, price, collection_ID
        FROM product
        WHERE product_image IS NOT NULL AND product_image <> ''
    `;

    try {
        const result = await databaseClient.executeSqlQuery(sqlQuery);
        const products = result[1]; // Get the array of products from the response
        if (products && products.length > 0) {
            console.log("Fetched all products:", products);
            allProducts = products; // Store all products in the global variable
            displayProducts(allProducts); // Display all products
        } else {
            console.log("No products found.");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Call the function to fetch all products initially
fetchAllProducts();

// Function to filter and display products based on the selected collection
const filterAndDisplayProducts = (collectionId) => {
    if (collectionId) {
        const selectedProducts = allProducts.filter(product => product.collection_ID === collectionId);
        if (selectedProducts.length > 0) {
            console.log("Filtered products:", selectedProducts);
            displayProducts(selectedProducts); // Display filtered products
        } else {
            console.log("No products found for the selected collection.");
            // You may choose to display a message or handle this case differently
        }
    } else {
        console.log("No collection selected.");
        // You may choose to display all products again or handle this case differently
    }
};

// Update the click event handler for collection items
const displayCollections = (collections) => {
    const collectionList = document.getElementById("collection-list");
    collectionList.innerHTML = ""; // Clear existing collections

    collections.forEach((collection) => {
        const collectionItem = document.createElement("div");
        collectionItem.className = "collection-item";

        const collectionImage = document.createElement("img");
        collectionImage.className = "collection-image";
        collectionImage.src = collection.image; // Assuming you have image URLs for collections
        collectionImage.alt = collection.name;
        collectionImage.onclick = () => {
            const collectionItems = document.querySelectorAll(".collection-item");
            collectionItems.forEach((item) => {
                item.classList.remove("selected");
            });
            collectionItem.classList.add("selected");
            filterAndDisplayProducts(collection.collection_ID);
        };

        const collectionName = document.createElement("p");
        collectionName.textContent = collection.name;
        collectionName.className = "collection-name";

        collectionItem.appendChild(collectionImage);
        collectionItem.appendChild(collectionName);
        collectionList.appendChild(collectionItem);
    });
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

// Call the function to fetch and display the collections
fetchCollections();

