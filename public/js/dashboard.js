
function calculateTotalWeight(data) {
    const totals = [];
  
    data.forEach((workout) => {
      const workoutTotal = workout.exercises.reduce((total, { type, weight,reps }) => {
        if (type === 'Resistance') {
          return total + (reps * weight);
        }
        return total;
      }, 0);
  
      totals.push(workoutTotal);
    });
  
    return totals;
  }
  
  function populateChart(data) {
    const durations = data.map(({ totalDuration }) => totalDuration);
    const pounds = calculateTotalWeight(data);
  
    const line = document.querySelector('#canvas').getContext('2d');
    const bar = document.querySelector('#canvas2').getContext('2d');
  
    const labels = data.map(({ day }) => {
      const date = new Date(day);
  
      // Use JavaScript's `Intl` object to help format dates
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(date);
    });
  
    let lineChart = new Chart(line, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Workout Duration In Minutes',
            backgroundColor: 'red',
            borderColor: 'red',
            data: durations,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Time Spent Working Out (Last 7 days)',
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  
    let barChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Pounds',
            data: pounds,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Pounds Lifted (Last 7 days)',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  
  // get all workout data from back-end
  API.getWorkoutsInRange().then(populateChart);
  

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

