const WISHLIST_KEY = "wishlist";

// Save book ID to wishlist in local storage
export function saveToWishlist(bookId) {
	let wishlist = getWishlist();
	if (!wishlist.includes(bookId)) {
		wishlist.push(bookId);
		localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
	}
}

// Remove book ID from wishlist in local storage
export function removeFromWishlist(bookId) {
	let wishlist = getWishlist();
	wishlist = wishlist.filter((id) => id !== bookId);
	localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// Retrieve wishlist from local storage
export function getWishlist() {
	return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}
