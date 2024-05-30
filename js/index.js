// Function to fetch three random products
const fetchRandomProducts = async () => {
    const sqlQuery = `
        SELECT size, color, name, weight, product_image, price, collection_ID
        FROM product
        WHERE product_image IS NOT NULL AND product_image <> ''
        ORDER BY RAND()
        LIMIT 3
    `;

    try {
        const result = await databaseClient.executeSqlQuery(sqlQuery);
        const products = result[1]; // Get the array of products from the response
        if (products && products.length > 0) {
            console.log("Fetched random products:", products);
            displayRandomProducts(products); // Display random products
        } else {
            console.log("No random products found.");
        }
    } catch (error) {
        console.error("Error fetching random products:", error);
    }
};

// Call the function to fetch and display three random products
fetchRandomProducts();

// Function to display three random products
const displayRandomProducts = (randomProducts) => {
    const randomProductContainer = document.getElementById("random-product-container");
    randomProductContainer.innerHTML = ""; // Clear existing random products

    randomProducts.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "random-product-item";
    
        const productImage = document.createElement("img");
        productImage.className = "random-product-image";
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
    
        randomProductContainer.appendChild(productItem);
    });
};
