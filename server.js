const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Static fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Az alapértelmezett route, amely a Steam főoldal másolatát szolgálja ki
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Az MDM szerver a http://localhost:${port} címen fut`);
});
