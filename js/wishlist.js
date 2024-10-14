import { saveToWishlist, removeFromWishlist } from "./storage.js";

// Add listeners to wishlist buttons
export function addWishlistListeners() {
	const buttons = document.querySelectorAll(".wishlist-btn");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const bookId = button.getAttribute("data-id");
			if (button.classList.contains("added")) {
				removeFromWishlist(bookId);
				button.textContent = "♡";
				button.classList.remove("added");
			} else {
				saveToWishlist(bookId);
				button.textContent = "❤︎";
				button.classList.add("added");
			}
		});
	});
}
