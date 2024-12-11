const addBox = document.querySelector(".add-box");
const popupTitle = document.querySelector("header p");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes")) || [];
let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span
          >
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
            <ul class="menu">
              <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pencil"></i>Edit</li>
              <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
            </ul>
          </div>
        </div>
      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(element) {
  element.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != element) {
      element.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  addBtn.innerText = "Update";
  popupTitle.innerText = "Update a Note";
  titleTag.value = title;
  descTag.value = desc;
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault;
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
