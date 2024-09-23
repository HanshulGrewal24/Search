document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearHistoryButton = document.getElementById('clear-history');
    const searchHistoryTable = document.getElementById('search-history');

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    displaySearchHistory();

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            // Save the query in search history
            searchHistory.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
            displaySearchHistory();
            searchInput.value = ''; // Clear input field
        }
    });

    function displaySearchHistory() {
        searchHistoryTable.innerHTML = ''; // Clear existing table rows
        searchHistory.forEach((term, index) => {
            const row = document.createElement('tr');
            const termCell = document.createElement('td');
            termCell.textContent = term;

            // Create a cell for the remove button
            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => {
                // Remove the specific search term from history
                searchHistory.splice(index, 1); // Remove the term from the array
                localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Update localStorage
                displaySearchHistory(); // Refresh the displayed history
            });

            removeCell.appendChild(removeButton);
            row.appendChild(termCell);
            row.appendChild(removeCell); // Append the remove button cell
            searchHistoryTable.appendChild(row);
        });
    }

    clearHistoryButton.addEventListener('click', () => {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        displaySearchHistory();
    });
});

    