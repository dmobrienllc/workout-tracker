


// const createPostHandler = async (event) => {
//     event.preventDefault();

//     console.log("in dashboard.js, createPostHandler");
//     if (event.target.hasAttribute('data-post-user-id')) {

//         console.log("event target has data-post-user-id");
//         const post_title = document.querySelector('#post-title').value.trim();
//         const post_body = document.querySelector('#post-body').value.trim();
//         const user_id = event.target.getAttribute('data-post-user-id');

//         console.log(JSON.stringify({ post_title, post_body, user_id }));

//         try{
//             if (post_title && post_body && user_id) {
//                 const response = await fetch('/api/posts', {
//                     method: 'POST',
//                     body: JSON.stringify({ post_title, post_body, user_id }),
//                     headers: { 'Content-Type': 'application/json' },
//                 });
    
//                 document.location.replace('/dashboard');
//             }
//         }
//         catch(err){
//             //whats the best way to handle this error if it occurs?
//             console.log(err);
//         }
//     }
// };

// const deletePostHandler = async (event) => {
//     event.preventDefault();

//     if (event.target.hasAttribute('data-post-id')) {
//         const id = event.target.getAttribute('data-post-id');

//         if (id) {
//             const response = await fetch(`/api/posts/${id}`, {
//                 method: 'DELETE',
//                 headers: { 'Content-Type': 'application/json' },
//             });

//             if (response.ok) {
//                 document.location.replace('/dashboard');
//             } else {
//                 console.log(response.statusText);
//             }
//         }
//     }
// };

// //just don't want this to be unhandled as it crashes the app
// try{
//     document
//     .querySelector('.delete-post')
//     .addEventListener('click', deletePostHandler);
// }
// catch(err){
//     console.log("Handled missing .delete-post");
// };

// // if(document.querySelector('.delete-comment')){
// //     document
// //     .querySelector('.delete-comment')
// //     .addEventListener('click', deleteCommentHandler);
// // }

// document
//     .querySelector('.new-post-form')
//     .addEventListener('click', createPostHandler);

