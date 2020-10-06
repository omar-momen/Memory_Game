let getReposButt = document.querySelector(".get_butt"),
  input = document.querySelector(".name_input"),
  show_repos = document.querySelector(".show_repos");

getReposButt.onclick = getRepos;

function getRepos() {
  if (input.value == "") {
    show_repos.innerHTML =
      "<span class='error'>Please write valid username...</span>";
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        show_repos.innerHTML = "";
        // loop Over Data
        data.forEach((repo) => {
          let new_repo = document.createElement("div"),
            name = document.createElement("span"),
            ancor = document.createElement("a");

          name.appendChild(document.createTextNode(repo.name));
          ancor.appendChild(document.createTextNode("visit"));

          new_repo.appendChild(name);
          new_repo.appendChild(ancor);

          new_repo.classList.add("repo");
          ancor.href = repo.html_url;
          ancor.setAttribute("target", "_blank");

          // new_repo.class = "repo";

          // Append To source
          show_repos.appendChild(new_repo);
        });
      })
      .catch((err) => {
        show_repos.innerHTML = "<span class='error'>no such User</span>";
      });
  }
}
