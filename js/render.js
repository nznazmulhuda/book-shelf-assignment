import { getWishlist } from "./storage.js";

export function renderBooks(books) {
	const bookList = document.getElementById("bookList");
	bookList.innerHTML = ""; // Clear the list

	books.forEach((book) => {
		const bookItem = document.createElement("div");
		bookItem.classList.add("book");

		const wishlist = getWishlist();
		let isWishlist = false;

		if (wishlist.length) {
			isWishlist = wishlist.includes(book.id.toString());
		}

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
	});
}
