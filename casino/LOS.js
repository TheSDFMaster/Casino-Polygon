document.getElementById('losForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('losUsername').value.trim();
  const lsUsername = localStorage.getItem('losUsername');

  if (lsUsername) {
    console.log("Found in localStorage:", lsUsername);
  } else {
    localStorage.setItem('losUsername', username);
    console.log("Saved new LOSusername:", username);
  }
});


