// ============================================================
// EXERCISE: Fetching data from an API
// ============================================================
//
// GOAL
// ----
// Build a book search using the Open Library API.
// When the user searches for a title, display the results
// (book title + author) as a list on the page.
//
// API endpoint:
// https://openlibrary.org/search.json?q=YOUR_SEARCH_TERM
// e.g.: https://openlibrary.org/search.json?q=the+lord+of+the+rings
//
// Try it in your browser first to see what the response looks like.
// The data you need is inside: response.docs[]
// Each book has: .title and .author_name[]
//
//
// ============================================================

console.log("script loaded");

const input = document.getElementById("search-input");
const button = document.getElementById("search-btn");
const results = document.getElementById("results");

button.addEventListener("click", async () => {
  const query = input.value.trim();
  if (!query) return;

  results.innerHTML = "<li>Loading...</li>"; 

  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  results.innerHTML = ""; 
  
  data.docs.forEach(book => {
    const li = document.createElement("li");
    
    
    const author = book.author_name ? book.author_name.join(", ") : "Unknown author";
    
    li.textContent = `${book.title} - ${author}`;
    results.appendChild(li);
  });
});