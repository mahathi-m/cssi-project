let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const entryTitle = document.querySelector('#entryTitle');
  const entryText = document.querySelector('#entryText');
  const entryDate = document.querySelector('#entryDate');
  const entryMood = document.querySelector('#entryMood');
  console.log(entryDate.value);
  console.log(entryMood.value);
  //console.log(entryText);
  //console.log(entryTitle);
  if(entryTitle.value == "") {
      alert("Please include a title for your journal entry.")
  } else if(entryDate.value == "") {
      alert("Please include a date for your journal entry.")
  } else if(entryMood.value == "") {
      alert("Please include a mood for your journal entry.")
  } else if(entryText.value == "") {
      alert("Please include some text in your journal entry.")
  } else {
      alert("Your entry has been submitted!")  
        // 2. Format the data and write it to our database
        firebase.database().ref(`users/${googleUser.uid}`).push({
            title: entryTitle.value,
            text: entryText.value,
            date: entryDate.value,
            mood: entryMood.value
            
        })
        // 3. Clear the form so that we can write a new note
        .then(() => {
            entryTitle.value = "";
            entryText.value = "";
            entryDate.value = "";
            entryMood.value = "";
        });

  };
};
 