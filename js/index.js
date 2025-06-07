// Add footer element and copyright
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Sergei Pastushenko ${thisYear}`;
footer.appendChild(copyright);

// Add skills dynamically
const skills = ["JavaScript", "HTML", "CSS", "Git", "Photoshop"];
const skillsSection = document.querySelector("#Skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

// Handle Message Form Submit
const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log("Name:", usersName);
  console.log("Email:", usersEmail);
  console.log("Message:", usersMessage);

  const messageSection = document.querySelector("#messages");
  const messageList = messageSection.querySelector("ul");

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span>: ${usersMessage}</span>
  `;

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();

    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  // Edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  editButton.addEventListener("click", function () {
    const currentSpan = newMessage.querySelector("span");
    const currentText = currentSpan.innerText.slice(2); // remove ": "
    const newText = prompt("Edit your message:", currentText);
    if (newText !== null && newText.trim() !== "") {
      currentSpan.innerText = `: ${newText}`;
    }
  });

  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  messageList.appendChild(newMessage);

  messageSection.style.display = "block";
  messageForm.reset();
});

// Hide message section initially if no messages
const messageSection = document.querySelector("#messages");
const messageList = messageSection.querySelector("ul");
if (messageList.children.length === 0) {
  messageSection.style.display = "none";
}

// Utility: Load projects from GitHub API
function loadProjects(url) {
  const projectList = document.querySelector("#Projects ul");
  projectList.innerHTML = ""; // очистить предыдущий вывод

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(repositories => {
      if (repositories.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.innerText = "No repositories found.";
        projectList.appendChild(emptyItem);
        return;
      }

      for (let repo of repositories) {
        const item = document.createElement("li");
        item.innerHTML = `
          <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong><br>
          ${repo.description ? `<em>${repo.description}</em><br>` : ""}
          ⭐ Stars: ${repo.stargazers_count ?? 0} &nbsp;&nbsp; 🛠️ Language: ${repo.language || "N/A"}
        `;
        projectList.appendChild(item);
      }
    })
    .catch(error => {
      const errorItem = document.createElement("li");
      errorItem.innerText = "Error loading data: " + error.message;
      projectList.appendChild(errorItem);
    });
}

//  Repositories - Starred
const showRepos = document.getElementById("show-repos");
const showStarred = document.getElementById("show-starred");

showRepos.addEventListener("click", function (e) {
  e.preventDefault();
  setActiveNav(this);
  loadProjects("https://api.github.com/users/SergeiP85/repos");
});

showStarred.addEventListener("click", function (e) {
  e.preventDefault();
  setActiveNav(this);
  loadProjects("https://api.github.com/users/SergeiP85/starred");
});

function setActiveNav(activeLink) {
  document.querySelectorAll("#project-nav a").forEach(link => {
    link.classList.remove("active");
  });
  activeLink.classList.add("active");
}

// Default load on page
loadProjects("https://api.github.com/users/SergeiP85/repos");
