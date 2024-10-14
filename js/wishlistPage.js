import { getWishlist, removeFromWishlist } from "./storage.js";

let wishlist;

document.addEventListener("DOMContentLoaded", () => {
	wishlist = getWishlist();
	loadWishlist();
});

async function loadWishlist() {
	wishlist = getWishlist();
	const bookList = document.getElementById("wishlistItems");
	if (!wishlist.length) {
		bookList.innerHTML = "<p>No books in wishlist.</p>";
		console.log(wishlist.length);
		return;
	}

	bookList.innerHTML = ""; // Clear the list

	for (let bookId of wishlist) {
		const book = await fetchBooksById(bookId);
		const bookItem = document.createElement("div");

		let isWishlist = false;

		isWishlist = wishlist.includes(book.id.toString());

		bookItem.classList.add("book");
		bookItem.innerHTML = `
      <div class="book-item">
        <div class="book-cover" style="background-image: url('${
					book.formats["image/jpeg"]
				}');"></div>

        <button class="wishlist-btn" data-id="${book.id}">${
			isWishlist ? "❤︎" : "♡"
		}</button>

        <div class="book-details">
          <h3>${book.title}</h3>
          <p>Author: ${
						book.authors.length ? book.authors[0].name : "Unknown"
					}</p>
          <p>Genre: ${book.subjects.length ? book.subjects[0] : "N/A"}</p>
        </div>
      </div>
    `;
		bookList.appendChild(bookItem);
	}

	addRemoveListeners();
}

// Add listeners to remove buttons
function addRemoveListeners() {
	const buttons = document.querySelectorAll(".wishlist-btn");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const bookId = button.getAttribute("data-id");
			removeFromWishlist(bookId);
			loadWishlist(); // Reload the wishlist after removal
		});
	});
}

// Fetch book by ID (can be part of your API or a new API function)
async function fetchBooksById(bookId) {
	try {
		const response = await fetch(`https://gutendex.com/books/${bookId}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching book:", error);
	}
}
