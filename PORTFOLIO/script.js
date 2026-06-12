const API_URL = "https://fearless-angel-194a9aaa96.strapiapp.com"; 

async function loadStrapiProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; 

    try {
        const response = await fetch(`${config.SPACE_ID}/api/projects?populate=*`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": config.ACCESS_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Request error! Status: ${response.status}`);
        }

        const jsonResult = await response.json();
        const projects = jsonResult.data;

        if (!projects || projects.length === 0) {
            container.innerHTML = "<p class='status-msg'>No projects found.</p>";
            return;
        }

        container.innerHTML = "";

        projects.forEach(project => {
            // 1. Беремо назву з поля title
            const title = project.title || (project.attributes ? project.attributes.title : "Untitled Project");
            
            // 2. Беремо посилання на сам проєкт з поля link
            const projectLink = project.link || (project.attributes ? project.attributes.link : "#");
            
            // 3. Беремо категорію з поля description (наприклад: GRAPHIC DESIGN)
            const category = project.description || (project.attributes ? project.attributes.description : "DESIGN");

            // 4. Картинку підставляємо автоматично (або міняємо в коді нижче)
            let imgUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"; 

            // ЛАЙФХАК: якщо хочеш свою картинку для FRANSUA, ми можемо прописати її прямо сюди за назвою:
            if (title.toLowerCase().includes("fransua")) {
                imgUrl = "https://images.unsplash.com/photo-1541462608141-ad4979e408c9?w=600"; // Тут буде фото дизайну
            }

            const projectRow = document.createElement('a');
            projectRow.href = projectLink;
            projectRow.target = "_blank";
            projectRow.className = 'project-row';

            projectRow.innerHTML = `
                <div class="project-img-box">
                    <img src="${imgUrl}" alt="${title}">
                </div>
                <div class="project-info-box">
                    <div class="project-tag">${category}</div>
                    <h2 class="project-name">${title}</h2>
                </div>
            `;

            container.appendChild(projectRow);
        });

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = "<p class='status-msg'>Failed to connect to CMS.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadStrapiProjects);