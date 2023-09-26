const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// Show moal
function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

// Add event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

window.addEventListener("click", (e) =>
  e.target === modal ? modal.classList.remove("show-modal") : false
);

// validate form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Pleace submit values for both fields.");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("Pleace provide a valid web adress");
    return false;
  }

  return true;
}

// Fetch
function fetchLocalBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Rasuljon Adhamov",
        url: "https://github.com/rasuljonadhamov",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
}

// Store bookmark
function storeBookmark(ev) {
  ev.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchLocalBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

bookmarkForm.addEventListener("submit", storeBookmark);

fetchLocalBookmarks();
