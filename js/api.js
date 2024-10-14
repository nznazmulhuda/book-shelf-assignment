export async function fetchBooks(searchQuery = "", genre = "", pageUrl = null) {
	let url = pageUrl || `https://gutendex.com/books`;

	if (!pageUrl) {
		if (searchQuery) {
			url += `?search=${searchQuery}`;
		}
		if (genre) {
			url += searchQuery ? `&topic=${genre}` : `?topic=${genre}`;
		}
	}

	try {
		const response = await fetch(url);
		return await response.json();
	} catch (error) {
		console.error("Error fetching books:", error);
	}
}
