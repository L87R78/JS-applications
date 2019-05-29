const express = require('express');

const app = express();

// some-origin request
app.use(express.static('./public'))

app.listen(3003, () => console.log('Listening...'))