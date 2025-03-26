async function fetchRecommendations() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function searchRecommendations() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = "";

    const data = await fetchRecommendations();
    if (!data) return;

    let results = [];

    data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchInput)) {
            results.push(...country.cities);
        } else {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchInput)) {
                    results.push(city);
                }
            });
        }
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchInput)) {
            results.push(temple);
        }
    });

    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchInput)) {
            results.push(beach);
        }
    });

    if (results.length === 0) {
        recommendationsContainer.innerHTML = "<div class='place-card'><p>No recommendations found.</p></div>";
    } else {
        results.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("place-card");
            card.innerHTML = `
                <h2>${item.name}</h2>
                <img src="${item.imageUrl}" alt="${item.name}" width="300">
                <p>${item.description}</p>
            `;
            recommendationsContainer.appendChild(card);
        });
    }
}

function resetSearch() {
    document.getElementById("search-input").value = "";
    document.getElementById("recommendations").innerHTML = "";
}
