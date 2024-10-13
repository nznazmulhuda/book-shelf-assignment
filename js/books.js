const API_URL = "https://gutendex.com/books";
// const API_URL = "demo.json";
let nextPageUrl = null;
let prevPageUrl = null;

// fetch books from the API
function fetchBooks(url = API_URL) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			nextPageUrl = data.next; // store the next page URL
			prevPageUrl = data.previous; // store the previous page URL

			renderBooks(data.results); // display books
			updatePagination(); // update pagination buttons
		})
		.catch((error) => console.log("Error:", error));
}

// display books on the page
function renderBooks(books) {
	const bookList = document.getElementById("bookList");
	bookList.innerHTML = ""; // clear existing books

	books.forEach((book) => {
		const bookItem = `
      <div class="book-item">
        <div class="book-cover" style="background-image: url('${
					book.formats["image/jpeg"] || "default-image.jpg"
				}');"></div>

        <button class="wishlist-btn" data-id="${book.id}">&#10084;</button>

        <div class="book-details">
          <h3>${book.title}</h3>
          <p>Author: ${
						book.authors.length ? book.authors[0].name : "Unknown"
					}</p>
          <p>Genre: ${book.subjects.length ? book.subjects[0] : "N/A"}</p>
        </div>
      </div>
    `;
		bookList.innerHTML += bookItem;
	});
}

// update pagination buttons
function updatePagination() {
	const pagination = document.getElementById("pagination");
	pagination.innerHTML = ""; // Clear previous buttons

	// create Previous button
	const prevButton = document.createElement("button");
	prevButton.textContent = "Previous";
	prevButton.disabled = !prevPageUrl; // Disable if no previous page
	prevButton.onclick = () => prevPageUrl && fetchBooks(prevPageUrl);
	pagination.appendChild(prevButton);

	// create Next button
	const nextButton = document.createElement("button");
	nextButton.textContent = "Next";
	nextButton.disabled = !nextPageUrl; // Disable if no next page
	nextButton.onclick = () => nextPageUrl && fetchBooks(nextPageUrl);
	pagination.appendChild(nextButton);
}

// load books on page load
document.addEventListener("DOMContentLoaded", () => {
	fetchBooks(); // fetch the first page of books
});
