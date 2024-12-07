document.addEventListener("DOMContentLoaded", () => {
    const privacyContainer = document.getElementById("privacy-container");
  
    // Fetch the privacy JSON
    fetch("privacy.json")
      .then((response) => response.json())
      .then((data) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const policy = data[key];
  
            // Create a section for each policy
            const section = document.createElement("section");
  
            // Add title
            const title = document.createElement("h2");
            title.textContent = policy.title;
            section.appendChild(title);
  
            // Add subtitle only if it exists
            if (policy.subtitle && policy.subtitle.trim() !== "") {
              const subtitle = document.createElement("h3");
              subtitle.textContent = policy.subtitle;
              section.appendChild(subtitle);
            }
  
            // Check if content is an array (e.g., list items)
            if (Array.isArray(policy.content)) {
              const list = document.createElement("ul");
              policy.content.forEach((item) => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                list.appendChild(listItem);
              });
              section.appendChild(list);
            } else {
              // Standard paragraph content
              const content = document.createElement("p");
              content.textContent = policy.content;
              section.appendChild(content);
            }
  
            // Add the section to the container
            privacyContainer.appendChild(section);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching privacy policies:", error);
        privacyContainer.innerHTML = "<p>Unable to load privacy policies at this time.</p>";
      });
  });
  