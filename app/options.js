"use strict";

// Function to display the whitelist from storage
const displayWhitelist = () => {
  chrome.storage.sync.get("whitelist", (data) => {
    const whitelist = data.whitelist || [];
    const whitelistTableBody = document.querySelector("#whitelist tbody");
    whitelistTableBody.innerHTML = ""; // Clear previous entries
    whitelist.forEach((url) => {
      const row = document.createElement("tr");

      // Create cell for URL
      const urlCell = document.createElement("td");
      const urlText = document.createElement("span");
      urlText.textContent = url;
      urlCell.appendChild(urlText);

      // Create cell for action buttons
      const actionCell = document.createElement("td");

      // Create edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        // Convert the URL cell to an editable textbox
        const editableTextbox = document.createElement("input");
        editableTextbox.type = "text";
        editableTextbox.value = url;
        editableTextbox.className = "editable-textbox";
        urlCell.textContent = "";
        urlCell.appendChild(editableTextbox);
        // Set focus on the textbox
        editableTextbox.focus();
        // Hide edit button
        editButton.style.display = "none";
        // Show save button
        saveButton.style.display = "inline";
      });
      actionCell.appendChild(editButton);

      // Create save button
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.style.display = "none"; // Initially hidden
      saveButton.addEventListener("click", () => {
        const updatedUrl = urlCell.querySelector(".editable-textbox").value;
        whitelist[whitelist.indexOf(url)] = updatedUrl;
        // Save the updated whitelist
        chrome.storage.sync.set({ whitelist }, () => {
          // Refresh whitelist display
          showStatus("Entry edited and saved to the whitelist.");
          displayWhitelist();
        });
      });
      actionCell.appendChild(saveButton);
      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        // Remove the item from the whitelist
        whitelist.splice(whitelist.indexOf(url), 1);
        // Save the updated whitelist
        chrome.storage.sync.set({ whitelist }, () => {
          // Refresh whitelist display
          showStatus("Entry deleted from the whitelist.");
          displayWhitelist();
        });
      });
      actionCell.appendChild(deleteButton);

      row.appendChild(urlCell);
      row.appendChild(actionCell);

      // Append row to table body
      whitelistTableBody.appendChild(row);
    });
  });
};

// Function to add a new entry to the whitelist
const addEntry = () => {
  const newEntry = document.getElementById("newEntry").value.trim();
  if (newEntry) {
    chrome.storage.sync.get("whitelist", (data) => {
      const whitelist = data.whitelist || [];
      whitelist.push(newEntry);
      chrome.storage.sync.set({ whitelist }, () => {
        // Update status to let user know the entry was added
        showStatus("Entry added to the whitelist.");
        // Clear text box
        document.getElementById("newEntry").value = "";
        // Refresh whitelist display
        displayWhitelist();
      });
    });
  }
};

// Event listener for adding entry
document.getElementById("addEntry").addEventListener("click", addEntry);

// Initial display of the whitelist
document.addEventListener("DOMContentLoaded", displayWhitelist);
function showStatus(msg) {
  const status = document.getElementById("status");
  status.textContent = msg;
  setTimeout(() => {
    status.textContent = "";
  }, 1500);
}
