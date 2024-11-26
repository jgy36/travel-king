fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    window.travelData = data;
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Function to handle search and display results
function searchData() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const data = window.travelData;

  let results = "";

  // First, check for keyword-based category search (beach, temple, country)
  if (
    searchQuery === "beach" ||
    searchQuery === "temple" ||
    searchQuery === "country"
  ) {
    // Handle search for countries
    if (searchQuery === "country") {
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          results += `
            <div>
              <h3>${city.name}</h3>
              <img src="${city.imageUrl}" alt="${city.name}" style="width: 300px; height: auto;"/>
              <p>${city.description}</p>
            </div>
          `;
        });
      });
    }

    // Handle search for temples
    if (searchQuery === "temple") {
      data.temples.forEach((temple) => {
        results += `
          <div>
            <h3>${temple.name}</h3>
            <img src="${temple.imageUrl}" alt="${temple.name}" style="width: 300px; height: auto;"/>
            <p>${temple.description}</p>
          </div>
        `;
      });
    }

    // Handle search for beaches
    if (searchQuery === "beach") {
      data.beaches.forEach((beach) => {
        results += `
          <div>
            <h3>${beach.name}</h3>
            <img src="${beach.imageUrl}" alt="${beach.name}" style="width: 300px; height: auto;"/>
            <p>${beach.description}</p>
          </div>
        `;
      });
    }
  } else {
    // General search within all categories
    // Search in countries
    data.countries.forEach((country) => {
      country.cities.forEach((city) => {
        if (
          city.name.toLowerCase().includes(searchQuery) ||
          city.description.toLowerCase().includes(searchQuery)
        ) {
          results += `
            <div>
              <h3>${city.name}</h3>
              <img src="${city.imageUrl}" alt="${city.name}" style="width: 300px; height: auto;"/>
              <p>${city.description}</p>
            </div>
          `;
        }
      });
    });

    // Search in temples
    data.temples.forEach((temple) => {
      if (
        temple.name.toLowerCase().includes(searchQuery) ||
        temple.description.toLowerCase().includes(searchQuery)
      ) {
        results += `
          <div>
            <h3>${temple.name}</h3>
            <img src="${temple.imageUrl}" alt="${temple.name}" style="width: 300px; height: auto;"/>
            <p>${temple.description}</p>
          </div>
        `;
      }
    });

    // Search in beaches
    data.beaches.forEach((beach) => {
      if (
        beach.name.toLowerCase().includes(searchQuery) ||
        beach.description.toLowerCase().includes(searchQuery)
      ) {
        results += `
          <div>
            <h3>${beach.name}</h3>
            <img src="${beach.imageUrl}" alt="${beach.name}" style="width: 300px; height: auto;"/>
            <p>${beach.description}</p>
          </div>
        `;
      }
    });
  }

  // If no results found, display a message
  if (results === "") {
    document.getElementById("results").innerHTML =
      "<p>No results found. Please try another search term.</p>";
  } else {
    document.getElementById("results").innerHTML = results;
  }
}

// Function to reset the search results and clear the input field
function clearSearchResults() {
  document.getElementById("search").value = ""; // Reset the search input field
  document.getElementById("results").innerHTML = ""; // Clear the displayed results
}

// Add event listener to clear button
document
  .getElementById("clearButton")
  .addEventListener("click", clearSearchResults);

// Function to reset the search results
function resetSearch() {
  document.getElementById("search").value = "";
  document.getElementById("results").innerHTML = "";
  alert("Search cleared.");
}

// Function to handle the search button click event
function executeSearch() {
  const query = document.getElementById("search").value;
  alert(`Searching for: ${query}`);
}
