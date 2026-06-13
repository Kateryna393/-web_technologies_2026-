// api strapi cloud
const API_URL = "https://jubilant-presence-4658e9cc82.strapiapp.com"; 

async function loadStrapiProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; 

    try {
        // fetch media from strapi
        const response = await fetch(`${API_URL}/api/projects?populate=*`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }

        const jsonResult = await response.json();
        const projects = jsonResult.data;

        if (!projects || projects.length === 0) {
            container.innerHTML = "<p class='status-msg'>No projects found.</p>";
            return;
        }

        container.innerHTML = "";

        projects.forEach(project => {
            const title = project.title || "Untitled Project";
            const link = project.link || "#";
            const category = project.category || "DESIGN";

            // if image not found, use placeholder
            let imgUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"; 
            
            // strapi media path syntax
            if (project.image && project.image.url) {
                imgUrl = project.image.url.startsWith('http') ? project.image.url : `${API_URL}${project.image.url}`;
            }

            const projectRow = document.createElement('a');
            projectRow.href = link;
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
        console.error("Content loading error:", error);
        container.innerHTML = `<p class='status-msg'>Oops! Failed to load projects. Please try refreshing the page later.: ${error.message}</p>`;
 }
}

document.addEventListener('DOMContentLoaded', loadStrapiProjects);
