const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

/**routes */
const userRouter = require('./routes/api/userRouter');
const postRouter = require('./routes/api/postRouter');
const profileRouter = require('./routes/api/profileRouter');

const app = express();
/** body-parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** Connected mongoose */
const db = require('./config/keys').mongoURI;
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDb Connected..'))
    .catch(err => console.log(err));

    
app.get('/', (req, res) => { res.send('Hello world')} );

// passport middlewears
app.use(passport.initialize()); // passport 초기화

// passport config
require('./config/passport')(passport);


/**user routes */
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/profile', profileRouter);

/**port */
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));