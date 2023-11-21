document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");

  // Function to fetch and display toys
  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => {
          renderToy(toy);
        });
      })
      .catch(error => console.error('Error fetching toys:', error));
  }

  // Function to render each toy
  function renderToy(toy) {
    const card = document.createElement("div");
    card.classList.add("card");

    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;

    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.classList.add("toy-avatar");

    const likes = document.createElement("p");
    likes.textContent = `${toy.likes} Likes`;

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.id = toy.id;
    likeBtn.textContent = "Like ❤️";

    // Event listener for the like button
    likeBtn.addEventListener("click", () => {
      increaseLikes(toy.id);
    });

    card.appendChild(toyName);
    card.appendChild(toyImage);
    card.appendChild(likes);
    card.appendChild(likeBtn);

    toyCollection.appendChild(card);
  }

  // Function to increase likes for a specific toy
  function increaseLikes(toyId) {
    const toyLikes = document.getElementById(toyId).previousElementSibling;
    const currentLikes = parseInt(toyLikes.textContent);

    // Make a PATCH request to update likes
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: currentLikes + 1
      })
    })
      .then(response => response.json())
      .then(updatedToy => {
        toyLikes.textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error increasing likes:', error));
  }

  // Fetch toys on page load
  fetchToys();
});
