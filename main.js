///////////////////////////////////////-------------Promise/Axios(npm)-------------////////////////////////////////////////
// start get elements from DOM
let theposts = document.getElementsByClassName("posts")[0];
let theUsers = document.getElementsByClassName("users")[0];
// end get elements from DOM

// start getAllPosts request
function getAllPosts() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      let posts = response.data;
      for (post of posts) {
        // console.log("the post is : ", post);
        showOnScreen(post, "post", theposts);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
// getAllPosts();
// end getAllPosts request

// start getAllUsers request
function getAllUsers() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let users = response.data;
        for (user of users) {
          //   console.log("the user is : ", user);
          showOnScreen(user, "user", theUsers);
        }
        resolve();
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        reject("error in getAllUsers function");
      });
  });
}
getAllUsers()
  .then(function () {
    getAllPosts();
  })
  .catch(function (error) {
    console.log(error);
  });
// end getAllUsers request

// start getAllPostsForSpecificUser request
function getAllPostsForSpecificUser(userId) {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      let allPosts = response.data;
      for (post of allPosts) {
        // console.log("the post is : ", post);
        showOnScreen(post, "post", theposts);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
// getAllPostsForSpecificUser(userId);
// end getAllPostsForSpacificUser request

// start global functions
// show posts and users On Screen function
function showOnScreen(item, parentClass, containerList) {
  let childOneClass = "",
    childTwoClass = "";

  if (parentClass === "post") {
    childOneClass = "title";
    childTwoClass = "body";
  } else if (parentClass === "user") {
    childOneClass = "name";
    childTwoClass = "email";
  }

  // create parent for post / user
  let parentItem = createElement("div", parentClass, null, containerList);

  let textChildOne, textChildTwo;

  if (parentClass === "post") {
    textChildOne = item.title;
    textChildTwo = item.body;
  } else {
    textChildOne = item.name;
    textChildTwo = item.email;

    let userId = item.id;
    // console.log(userId);
    handleUserSelected(parentItem, userId);
  }

  // create first child of parent for post / user
  let childOneparentItem = createElement(
    "div",
    childOneClass,
    textChildOne,
    parentItem
  );

  // create second child of parent for post / user
  let childTwoparentItem = createElement(
    "div",
    childTwoClass,
    textChildTwo,
    parentItem
  );
}

// handleUserSelected element/user
function handleUserSelected(parentItem, userId) {
  parentItem.addEventListener("click", function () {
    // console.log(parentItem);
    // console.log(userId);

    // Remove previous selection
    let selectedUsers = document.getElementsByClassName("selected");
    for (let user of selectedUsers) {
      user.classList.remove("selected");
    }

    // Highlight the selected user
    parentItem.classList.add("selected");

    // Clear previous/existing posts
    theposts.innerHTML = "";

    // call function
    getAllPostsForSpecificUser(userId);
  });
}

// createElement function
function createElement(tag, className, textcontent, parent) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  if (textcontent) element.textContent = textcontent;
  if (parent) parent.appendChild(element);
  return element;
}
// end global functions
