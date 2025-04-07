document.addEventListener("DOMContentLoaded", () => {
  const savedEvents = JSON.parse(localStorage.getItem("events") || "[]");
  const defaultEvents = [
    {
      id: 1,
      title: "Concert: The Weekend",
      image: "https://via.placeholder.com/600x300",
      date: "May 5, 2025",
      location: "Los Angeles, CA",
      description: "A live concert featuring The Weekend in LA."
    },
    {
      id: 2,
      title: "NBA Finals Game",
      image: "https://via.placeholder.com/600x300",
      date: "June 10, 2025",
      location: "Chicago, IL",
      description: "Watch the NBA Finals live!"
    },
    {
      id: 3,
      title: "Comedy Night",
      image: "https://via.placeholder.com/600x300",
      date: "April 20, 2025",
      location: "New York, NY",
      description: "A night full of laughs with top comedians."
    }
  ];
  const events = [...defaultEvents, ...savedEvents];

  const eventsContainer = document.querySelector(".events-container");
  const searchInput = document.getElementById("searchInput");

  function displayEvents(filteredEvents) {
    eventsContainer.innerHTML = "";
    filteredEvents.forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" />
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <p>${event.location}</p>
      `;
      card.addEventListener("click", () => {
        localStorage.setItem("selectedEvent", JSON.stringify(event));
        window.location.href = "event-details.html";
      });
      eventsContainer.appendChild(card);
    });
  }

  if (eventsContainer) {
    displayEvents(events);
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = events.filter((event) =>
          event.title.toLowerCase().includes(keyword) ||
          event.location.toLowerCase().includes(keyword)
        );
        displayEvents(filtered);
      });
    }
  }

  const detailContainer = document.querySelector(".event-detail .container");
  if (detailContainer) {
    const event = JSON.parse(localStorage.getItem("selectedEvent"));
    if (event) {
      detailContainer.innerHTML = `
        <h1>${event.title}</h1>
        <img src="${event.image}" alt="${event.title}" />
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <button class="buy-button">Buy Ticket</button>
      `;
    } else {
      detailContainer.innerHTML = "<p>No event selected.</p>";
    }
  }

  const buyButton = document.querySelector(".buy-button");
  if (buyButton) {
    buyButton.addEventListener("click", () => {
      document.getElementById("checkoutModal").style.display = "flex";
    });
  }

  window.closeModal = function () {
    document.getElementById("checkoutModal").style.display = "none";
  };

  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    const user = localStorage.getItem("user");
    if (user) {
      loginLink.textContent = "Logout";
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.reload();
      });
    }
  }
});
