let googleUser;
let userName;
let googleUserId

window.onload = (event) => {
    //retain user state between html pages 

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            googleUser = user;
            googleUserId = user.uid;
            console.log(googleUser)
            userName = googleUser.displayName;
            document.querySelector("#personalization").innerHTML="Journal Entries by " + userName; 
            getNotes(googleUserId);
        } else {
            window.location = 'index.html';
        }
    })
};

const getNotes = (userId) => {
    console.log("logged in as user:" + userId);
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    });
};

const renderData = (data) => {
    console.log(data);
    const destination = document.querySelector("#app");
    destination.innerHTML = "";

    for(let key in data) {
        const entry = data[key];
        destination.innerHTML += createCard(entry, key);
    };
};

const createCard = (entry, entryId) => {

    return `<div class = "column is-one-quarter">
                <div class = "card ">
                    <header class = "card-header ${entry.mood}">
                        <p class = "card-header-title id=entryTitle"> ${entry.title} </p>

                    </header>
                    <div class = "card-content ${entry.mood}">
                        <div class = "content" id="entryText"> 
                            ${entry.text} 
                        </div>
                    </div>
                    
                    <footer class="card-footer ${entry.mood}">
                        <a
                            href="#"
                            class="card-footer-item"
                            onclick="editNote('${entryId}')">
                            Edit
                        </a>
                   
                    
                        <a
                            href="#"
                            class="card-footer-item"
                            onclick="deleteNote('${entryId}')">
                            Delete
                        </a>
                    </footer>
                </div>
            </div>
    `;
};

const deleteNote = (entryId) => {
    console.log("delete");
    console.log(entryId);
    alert("Confirm that you want to delete a note.");
    const noteToDeleteRef = firebase.database().ref(`users/${googleUserId}/${entryId}`);
    entryToDeleteRef.remove();
};


const editNote = (entryId) => {
    
    console.log(entryId);
    const noteToEditRef = firebase.database().ref(`users/${googleUser.uid}/${entryId}`);
    noteToEditRef.on("value", (snapshot) => {
        console.log(snapshot.val());        
        const entry = (snapshot.val());
        console.log(entry)
    
        const editNoteModal=document.querySelector("#editNoteModal");
        
        const entryTitle = document.querySelector("#editTitleInput");
        console.log(entryTitle.value);
        entryTitle.value = entry.title;
        console.log(entryTitle.value);

        const entryText = document.querySelector("#editTextInput");
        console.log(entryText.value);
        entryText.value = entry.text;
        console.log(entryText.value);
        
        const editEntryInput = document.querySelector("#editNoteId");
        console.log(editEntryInput)
        editEntryInput.value = entryId;
        console.log(editEntryInput)
        
    });
    editNoteModal.classList.add("is-active");
};

const closeModal =()=> {
    const editeNoteModal = document.querySelector("#editNoteModal");
    editeNoteModal.classList.remove("is-active");
};

const saveChanges = () => {
    console.log("save changes");

    const editNoteTitleInput = document.querySelector("#editTitleInput");
    const editNoteTextInput = document.querySelector("#editTextInput");
    const editNoteIdInput = document.querySelector("#editNoteId");

    const title = editNoteTitleInput.value;
    const text = editNoteTextInput.value;
    const noteId = editNoteIdInput.value;
    console.log(title);
    console.log(text);
    console.log(noteId);

    const noteToEditRef = firebase.database().ref(`users/${googleUser.uid}/${noteId}`);
    console.log(noteToEditRef)  
    console.log(googleUser.uid);
    console.log(noteId);
     noteToEditRef.on("value", (snapshot) => {
        console.log(snapshot.val());
    });  
    noteToEditRef.update({
        title: title,
        text: text,
    }).then(() => {
        closeModal();
    }).catch();
   

    

    
            
};