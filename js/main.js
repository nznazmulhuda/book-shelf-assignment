import { fetchBooks } from "./api.js";
import { renderBooks } from "./render.js";
import { addWishlistListeners } from "./wishlist.js";

let nextPage = null; // For storing the next page URL
let prevPage = null; // For storing the previous page URL

document.addEventListener("DOMContentLoaded", () => {
	loadBooks(); // Load books initially
	setupSearch();
	setupFilter();
	setupPagination(); // Initialize pagination
});

// Load books, and update pagination URLs
async function loadBooks(searchQuery = "", genre = "", pageUrl = null) {
	const data = await fetchBooks(searchQuery, genre, pageUrl);
	renderBooks(data.results);
	addWishlistListeners();

	nextPage = data.next;
	prevPage = data.previous;
	updatePaginationButtons();
}

// Setup search functionality
function setupSearch() {
	const searchInput = document.getElementById("searchInput");
	searchInput.addEventListener("input", () => {
		const searchQuery = searchInput.value.trim().toLowerCase();
		loadBooks(searchQuery);
	});
}

// Setup filter functionality
function setupFilter() {
	const genreFilter = document.getElementById("genreFilter");
	genreFilter.addEventListener("change", () => {
		const selectedGenre = genreFilter.value;
		loadBooks("", selectedGenre);
	});
}

// Setup pagination functionality
function setupPagination() {
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");

	nextBtn.addEventListener("click", () => {
		if (nextPage) {
			loadBooks("", "", nextPage);
		}
	});

	prevBtn.addEventListener("click", () => {
		if (prevPage) {
			loadBooks("", "", prevPage);
		}
	});
}

// Update pagination buttons visibility based on next/prev pages
function updatePaginationButtons() {
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");

	nextBtn.style.display = nextPage ? "block" : "none";
	prevBtn.style.display = prevPage ? "block" : "none";
}
