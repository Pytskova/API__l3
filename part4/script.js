const usersContainer = document.getElementById("users-container");
const commentsContainer = document.getElementById("comments-container");

async function fetchUsers() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        displayUsers(response.data);
    } catch (error) {
        console.error("Ошибка при загрузке пользователей", error);
    }
}

function displayUsers(users) {
    usersContainer.innerHTML = "<h2>Пользователи</h2>";
    users.forEach(user => {
        const userLink = document.createElement("a");
        userLink.href = "#";
        userLink.textContent = user.name;
        userLink.style.display = "block";
        userLink.onclick = () => fetchComments(user.id);
        usersContainer.appendChild(userLink);
    });
}

async function fetchComments(userId) {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
        const userComments = response.data.filter(comment => comment.postId === userId);
        displayComments(userComments);
    } catch (error) {
        console.error("Ошибка при загрузке комментариев", error);
    }
}

function displayComments(comments) {
    commentsContainer.innerHTML = "<h2>Комментарии</h2>";
    comments.slice(0, 15).forEach(comment => {
        const commentElement = document.createElement("p");
        commentElement.textContent = `👤 ${comment.name}: ${comment.body}`;
        commentsContainer.appendChild(commentElement);
    });
}

fetchUsers();
