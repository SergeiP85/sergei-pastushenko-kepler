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
