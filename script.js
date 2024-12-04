// NASA APOD API
const APIKey = "MEXwV56G5zETZFb2qQLyhMd3Wouk82TtbEAmEVgF";

//DOM Elements - Forms
const dateForm = document.getElementById("date-input");
const searchBtn = document.getElementById("search-btn");

//DOM Elements - APOD Data
const result = document.getElementById("apod_result");
const mainIMG = document.getElementById("APOD_IMG");
const h1Title = document.getElementById("apod_title");
const attribute = document.getElementById("apod_attr");
const description = document.getElementById("apod_details");

//DOM Elements - Favorites
const favBtn = document.getElementById("fav_btn");
const favContainer = document.getElementById("APOD_FAV");

//Empty array
let favorites = [];

//Show default message when there are no favorites
const defaultFav = document.createElement("p");
defaultFav.textContent = "Your current APOD favorites is currently empty!";
favContainer.appendChild(defaultFav);

// Set default date to current day
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const defaultDate = `${yyyy}-${mm}-${dd}`;

dateForm.querySelector("input").value = defaultDate;

// Function to show full image on click
function showHDImage(hdurl) {
    const overlay = document.createElement("div");
    overlay.classList.add('overlay');

    const hdContainer = document.createElement("div");
    hdContainer.classList.add('hd-container');

    const hdIMG = document.createElement("img");
    hdIMG.src = hdurl;

    // Append image to overlay
    hdContainer.appendChild(hdIMG);
    overlay.appendChild(hdContainer);

    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<i class="fa-solid fa-square-xmark"></i>';
    closeButton.classList.add('close-button');
    closeButton.addEventListener("click", function () {
        overlay.remove();
    });

    // Append close button to overlay
    overlay.appendChild(closeButton);

    // Append overlay to body
    document.body.appendChild(overlay);
}

// Fetch and display APOD data
async function fetchAPOD(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${date}`;
    console.log(`Fetching APOD data for date: ${date}`); // Logging

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('APOD data fetched:', data); // Logging

        if (data.media_type === "image") {
            mainIMG.src = data.url;
            mainIMG.alt = data.title;
            mainIMG.dataset.hdurl = data.hdurl;
            mainIMG.classList.remove('nasa-logo'); // Remove the class if it was previously added

            // Make the image clickable to view HD version
            mainIMG.style.cursor = 'pointer';
            mainIMG.onclick = () => {
                showHDImage(data.hdurl);
            };
        } else {
            // If media type is not an image, display NASA logo
            mainIMG.src = "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg";
            mainIMG.alt = "NASA Logo";
            mainIMG.classList.add('nasa-logo'); // Add the class to the NASA logo

            // Remove the click event if it's not an image
            mainIMG.style.cursor = 'default';
            mainIMG.onclick = null;
        }
        h1Title.textContent = data.title;
        attribute.textContent = data.copyright || "Public Domain";
        description.textContent = data.explanation;
    } catch (error) {
        console.error("Error fetching APOD data:", error);
    }
}

// Fetch APOD data for today
fetchAPOD(defaultDate);

// Prevent page from refreshing and handle search
dateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const date = dateForm.querySelector("input").value;

    // Check if date is valid
    if (date) {
        fetchAPOD(date);
        console.log(`Date entered: ${date}`);
    } else {
        console.log("Please enter a valid date!");
    }
});

// Function to save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites saved to localStorage:', favorites); // Logging
}

// Function to load favorites from localStorage
function loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
        console.log('Favorites loaded from localStorage:', favorites); // Logging
        renderFavorites();
    }
}

//Delete item from the array
favContainer.addEventListener("click", function (e) {
    if (e.target.closest("button") && e.target.closest("button").id === "del_btn") {
        const favTitle = e.target.closest("div").querySelector("h3").textContent;
        const favIndex = favorites.findIndex(fav => fav.title === favTitle);
        if (favIndex !== -1) {
            favorites.splice(favIndex, 1);
            renderFavorites();
            saveFavorites(); // Save to localStorage
            console.log("Item deleted from favorites!");
            console.log(favorites);
        }
    }
});

// Render favorites in the UL container
function renderFavorites() {
    favContainer.innerHTML = "";
    if (favorites.length === 0) {
        favContainer.appendChild(defaultFav);
    } else {
        favorites.forEach(fav => {

            const listItem = document.createElement("li");
            listItem.classList.add("card");

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const favIMG = document.createElement("img");
            favIMG.src = fav.img;
            favIMG.alt = fav.title;
            favIMG.classList.add("card-img");

            const favTitle = document.createElement("h3");
            favTitle.textContent = fav.title;
            favTitle.classList.add("card-title");

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.id = "del_btn";

            //Wrap the delete button and card header in a div
            const titleDeleteWrap = document.createElement("div");
            titleDeleteWrap.classList.add("card_textwrap");
            titleDeleteWrap.appendChild(favTitle);
            titleDeleteWrap.appendChild(deleteBtn);

            // Append elements to cardContent
            cardContent.appendChild(favIMG);
            cardContent.appendChild(titleDeleteWrap);

            // Append cardContent to listItem
            listItem.appendChild(cardContent);

            // Append listItem to favContainer
            favContainer.appendChild(listItem);
        });
    }
}

//Add to favorites
favBtn.addEventListener("click", function () {
    const favDate = dateForm.querySelector("input").value;
    const favTitle = h1Title.textContent;
    const favIMG = mainIMG.src;
    const favHDURL = mainIMG.dataset.hdurl;

    // Check if the APOD is already in favorites
    const isFavorite = favorites.find(fav => fav.date === favDate);
    if (isFavorite) {
        alert("This picture of the day is already in your favorites!");
    } else {
        favorites.push({
            date: favDate,
            title: favTitle,
            attribute: attribute.textContent,
            img: favIMG,
            hdurl: favHDURL,
            explanation: description.textContent
        });
        console.log(favorites);
        renderFavorites();
        saveFavorites(); // Save to localStorage
    }
});

// Show list item to main container when clicked
favContainer.addEventListener("click", function (e) {
    if (e.target.closest("li")) {
        const favTitle = e.target.closest("li").querySelector("h3").textContent;
        const favIndex = favorites.findIndex(fav => fav.title === favTitle);
        if (favIndex !== -1) {
            const fav = favorites[favIndex];
            h1Title.textContent = fav.title;
            mainIMG.src = fav.img;
            mainIMG.alt = fav.title;
            mainIMG.dataset.hdurl = fav.hdurl; // Ensure the HD URL is set
            attribute.textContent = fav.attribute || "Public Domain"; // Ensure the property exists
            description.textContent = fav.explanation || "No description available."; // Ensure the property exists

            //Adding a condition to maintain image size for NASA LOGO
            if (fav.img === "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg") {
                mainIMG.classList.add('nasa-logo'); // Add the class to the logo and apply the styling set in CSS
                mainIMG.style.cursor = 'default'; // Remove the cursor pointer
                mainIMG.onclick = null; // Remove the click event
            } else {
                mainIMG.classList.remove('nasa-logo'); // Remove the class if it was previously added - ensure the image is displayed in desired aspect ratio
                // Make the image clickable to view HD version
                mainIMG.style.cursor = 'pointer';
                mainIMG.onclick = () => {
                    showHDImage(fav.hdurl)
                }
            }
        }
    }
});

// Load favorites from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
    loadFavorites();
    fetchAPOD(defaultDate); // Ensure APOD data is fetched after loading favorites
});