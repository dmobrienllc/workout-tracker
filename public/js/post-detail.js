const newCommentHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-comment-post-id')) {
    const post_id = event.target.getAttribute('data-comment-post-id');
    const comment_body = document.querySelector('#comment-body').value.trim();

    console.log(JSON.stringify({ post_id, comment_body }));

    if (post_id && comment_body) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, comment_body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
      }
    }
  };
}

//Delete comment with passed in id
const delButtonHandler = async (event) => {
  var postDivEl = document.querySelector(".post");
  console.log(postDivEl);
  const post_id = postDivEl.getAttribute('data-post-id');
  console.log("Hit delButtonHandler on post-details.js with post id: " + post_id);

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
  }

  if (post_id) {
    let id = post_id;
    const updatedPost = await fetch(`/api/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (updatedPost) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
    }
  }
};

try{
  document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);
}
catch(err){
  console.log("In post-detail.js, handling missing .comment-list");
}

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newCommentHandler);

