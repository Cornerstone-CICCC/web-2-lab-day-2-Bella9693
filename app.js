$(function () {
  // your code here

  $(function () {
    let currentId = 1;
    const maxUsers = 30;

    function loadUser(id) {
      $.ajax({
        url: `https://dummyjson.com/users/${id}`,
        method: "GET",
        success: function (user) {
          $(".info__image img").attr("src", user.image);
          $(".info__content").html(`
          <p><strong>${user.firstName} ${user.lastName}</strong></p>
          <p>Age: ${user.age}</p>
          <p>Email: ${user.email}</p>
        `);
        },
      });

      $.ajax({
        url: `https://dummyjson.com/users/${id}/posts`,
        method: "GET",
        success: function (data) {
          $(".posts h3").text("Posts");
          const ul = $(".posts ul").empty();
          data.posts.forEach((post) => {
            ul.append(`<li data-id="${post.id}">${post.title}</li>`);
          });
        },
      });

      $.ajax({
        url: `https://dummyjson.com/users/${id}/todos`,
        method: "GET",
        success: function (data) {
          $(".todos h3").text("Todos");
          const ul = $(".todos ul").empty();
          data.todos.forEach((todo) => {
            const checked = todo.completed ? "✅" : "❌";
            ul.append(`<li>${checked} ${todo.todo}</li>`);
          });
        },
      });
    }

    loadUser(currentId);

    $("header button:first").click(function () {
      currentId = currentId - 1 < 1 ? maxUsers : currentId - 1;
      loadUser(currentId);
    });

    $("header button:last").click(function () {
      currentId = currentId + 1 > maxUsers ? 1 : currentId + 1;
      loadUser(currentId);
    });

    $(".posts h3").click(function () {
      $(".posts ul").slideToggle();
    });

    $(".todos h3").click(function () {
      $(".todos ul").slideToggle();
    });

    $(".posts ul").on("click", "li", function () {
      const postId = $(this).data("id");
      $.ajax({
        url: `https://dummyjson.com/posts/${postId}`,
        method: "GET",
        success: function (post) {
          const modal = $(`
          <div class="modal" style="
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex; align-items: center; justify-content: center;
          ">
            <div style="
              background: white; padding: 20px; border-radius: 8px;
              max-width: 400px; width: 100%;
            ">
              <h2>${post.title}</h2>
              <p>${post.body}</p>
              <p><strong>Views:</strong> ${post.views}</p>
              <button class="close-modal">Close Modal</button>
            </div>
          </div>
        `);
          $("body").append(modal);
        },
      });
    });

    $("body").on("click", ".close-modal", function () {
      $(".modal").remove();
    });
  });
});
