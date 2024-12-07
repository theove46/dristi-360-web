document.addEventListener("DOMContentLoaded", () => {
    const termsContainer = document.getElementById("terms-container");
  
    // Fetch the terms JSON
    fetch("terms.json")
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const term = data[key];
  
            // Create a section for each term
            const section = document.createElement("section");
            
            // Add title
            const title = document.createElement("h2");
            title.textContent = term.title;
            section.appendChild(title);
  
            // Add subtitle only if it exists
            if (term.subtitle && term.subtitle.trim() !== "") {
              const subtitle = document.createElement("h3");
              subtitle.textContent = term.subtitle;
              section.appendChild(subtitle);
            }
  
            // Check if content is an array (e.g., list items)
            if (Array.isArray(term.content)) {
              const list = document.createElement("ul");
              term.content.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                list.appendChild(listItem);
              });
              section.appendChild(list);
            } else {
              // Standard paragraph content
              const content = document.createElement("p");
              content.textContent = term.content;
              section.appendChild(content);
            }
  
            // Add the section to the container
            termsContainer.appendChild(section);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching terms:", error);
        termsContainer.innerHTML = "<p>Unable to load terms at this time.</p>";
      });
  });
  