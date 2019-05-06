const express = require('express');

/**routes */
const userRouter = require('./routes/api/userRouter');
const postRouter = require('./routes/api/postRouter');
const profileRouter = require('./routes/api/profileRouter');

const app = express();

app.get('/', (req, res) => { res.send('Hello world')} );


/**user routes */
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/profile', profileRouter);

/**port */
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));