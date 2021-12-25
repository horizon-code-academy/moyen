const moy = document.querySelector("#r-moy");
const result = document.querySelector("#result");

const add = document.querySelector("button[type='button']");
const submit = document.querySelector("button[type='submit']");
const reset = document.querySelector("button[type='reset']");

// list of notes inputs
let notes = [];

function removeNote(i) {
  const div = document.querySelector(`#note-div-${i}`);
  div.remove();
  notes = notes.filter((e, index) => i !== index);
  saveNotes();
}

function addNote(i, value) {
  // add div container
  const fieldset = document.querySelector("fieldset");
  let div = document.createElement("div");
  div.className = "form-floating mb-3";
  div.id = `note-div-${i}`;
  // add input
  let input = document.createElement("input");
  input.className = "form-control";
  input.id = `note-input-${i}`;
  input.type = "number";
  input.value = value || 0;
  // add label for input
  let label = document.createElement("label");
  label.for = `note-${i}`;
  label.innerHTML = `Note ${i + 1}`;
  // add delete button
  let button = document.createElement("button");
  button.className = "btn btn-danger";
  button.id = `note-btn-${i}`;
  button.innerHTML = `-`;
  button.type = `button`;
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.right = "10px";
  button.addEventListener("click", () => removeNote(i));
  // put elements in DOM
  div.appendChild(input);
  div.appendChild(button);
  div.appendChild(label);
  fieldset.appendChild(div);
  // handle data
  notes.push(input);
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes.map((x) => x.value)));
}

function readNotes() {
  return JSON.parse(localStorage.getItem("notes"));
}

function calcMoyen(listTests) {
  return (
    listTests.reduce((t, x) => parseFloat(x.value) + t, 0) / listTests.length
  );
}

function initNotes() {
  const ns = readNotes();
  if (ns && ns.length > 0) {
    for (let i = 0; i < ns.length; i += 1) {
      addNote(i, ns[i]);
      showResult(calcMoyen(notes));
    }
  } else {
    addNote(0);
  }
}

function showResult(m) {
  result.innerHTML = m >= 10 ? "Admis" : "Refusé";
  result.style.color = m >= 10 ? "green" : "red";
  moy.innerHTML = m.toFixed(2);
  saveNotes();
}

add.addEventListener("click", () => addNote(notes.length));
submit.addEventListener("click", (e) => {
  e.preventDefault();
  showResult(calcMoyen(notes));
});

initNotes();
