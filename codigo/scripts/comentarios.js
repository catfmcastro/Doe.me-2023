// Get references to HTML elements
const commentForm = document.getElementById('commentForm');
const emailInput = document.getElementById('email');
const commentInput = document.getElementById('comment');
const commentList = document.getElementById('commentList');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// Load existing comments from local storage
const comments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];

// Render existing comments
comments.forEach(renderComment);

// Add event listener to the form
commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the values from the input fields
    const email = emailInput.value;
    const comment = commentInput.value;

    // Create a new comment object
    const newComment = {
        email: email,
        comment: comment
    };

    // Add the new comment to the comments array
    comments.push(newComment);

    // Save the comments to local storage
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));

    // Render the new comment
    renderComment(newComment);

    // Reset the form
    commentForm.reset();
});

// Function to render a comment
function renderComment(comment) {
    const li = document.createElement('li');
    const email = document.createElement('strong');
    const commentText = document.createElement('p');
    const commentList = document.getElementById("commentList");

    email.textContent = comment.email;
    commentText.textContent = comment.comment;

    li.appendChild(email);
    li.appendChild(document.createElement('br'));
    li.appendChild(commentText);

    commentList.style.marginTop = "20px";
    commentList.style.background = "#fff";
    commentList.style.width = "40%";
    commentList.style.borderRadius = "10px";
    commentList.style.border = "1px solid black";
    commentList.style.padding = "10px";
    commentList.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, .212)";

    commentList.appendChild(li);
}