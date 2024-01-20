const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const urlDatabase = {}; // Store short URLs and corresponding long URLs

function generateRandomCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomCode;
}

app.post('/shorten', (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = generateRandomCode();
  const shortUrl = `http://localhost:${PORT}/${shortCode}`;

  urlDatabase[shortCode] = longUrl;
  
      console.log(urlDatabase);
  res.json({ shortUrl });
});

// app.get('/:shortCode', (req, res) => {
//   const shortCode = req.params.shortCode;
//   const longUrl = urlDatabase[shortCode];

//   if (longUrl) {
//     res.redirect(longUrl);
//   } else {
//     res.status(404).send('Not Found');
//   }
// });

app.post('/resolve/', (req, res) => {
    const {shortUrl} = req.body ;
    const shortCode = shortUrl.split('/').pop();
    const longUrl = urlDatabase[shortCode];
    console.log(longUrl);
    if (longUrl) {
      res.json({ longUrl });
    } else {
      res.status(404).send('Not Found');
    }
  });
// setTimeout(() => {
// }, 2000);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
