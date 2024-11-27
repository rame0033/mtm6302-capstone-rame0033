// NASA APOD API
const APIKey = "MEXwV56G5zETZFb2qQLyhMd3Wouk82TtbEAmEVgF";

const dateForm = document.getElementById("date-input");
const searchBtn = document.getElementById("search-btn");

const result = document.getElementById("apod_result");
const mainIMG = document.getElementById("APOD_IMG");
const h1Title = document.getElementById("apod_title");
const attribute = document.getElementById("apod_attr");
const description = document.getElementById("apod_details");

// Set default date to current day
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();
const defaultDate = `${yyyy}-${mm}-${dd}`;

dateForm.querySelector("input").value = defaultDate;

// Fetch and display APOD data
function fetchAPOD(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${date}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.media_type === "image") {
                mainIMG.src = data.url;
                mainIMG.alt = data.title;
                mainIMG.classList.remove('nasa-logo'); // Remove the class if it was previously added

                // Remove any existing event listeners
                const newMainIMG = mainIMG.cloneNode(true);
                mainIMG.parentNode.replaceChild(newMainIMG, mainIMG);

                // Make the image clickable to view HD version
                newMainIMG.style.cursor = 'pointer';
                newMainIMG.addEventListener("click", function () {
                    const overlay = document.createElement("div");
                    overlay.classList.add('overlay');

                    const hdContainer = document.createElement("div");
                    hdContainer.classList.add('hd-container');

                    const hdIMG = document.createElement("img");
                    hdIMG.src = data.hdurl;

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
                });

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
        })
        
        .catch(error => {
            console.error("Error fetching APOD data:", error);
        });
}

// Fetch APOD data for today
fetchAPOD(defaultDate);

// Prevent page from refreshing and handle search
dateForm.addEventListener("submit", function(e) {
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