require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const { v4: uuidv4 } = require("uuid");
const MongoStore = require("connect-mongo");
const nocache = require("nocache");
const methodOverride = require("method-override");
const passport = require("./src/config/passport-config");

// Database connection
const connectDB = require("./src/config/db");

// Route files import
const authRouter = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");
const adminRouter = require("./src/routes/adminRoute");

/**
 * Auth - user - login, register
 * Auth - admin - login, register
 *
 * UserRoute - homepage
 * AdminRoute - dashboard, edit, view, delete and search (create user)* : Work in Progress
 *
 * User verification ?? email otp ??
 * User SSO login ?? Google Strategy ? should i add it ??
 */

// Express App
const app = express();
<<<<<<< HEAD
const helmet = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "cdn.jsdelivr.net"],
        fontSrc: ["'self'", "fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:"]
      }
    }
  })
);

app.use((req, res, next) => {
  console.log("CSP header:", res.getHeader('Content-Security-Policy'));
  next();
});




// Allow only specific domains (e.g., http://yourfrontend.com)
const cors = require('cors');

// Allow CORS from your frontend
app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true // if you use cookies/session
}));



=======

const helmet = require('helmet');
app.use(helmet());
>>>>>>> 3b4aa5cdae276595da8907889ecc433635ccc98d

// Connect Database
connectDB();

// view engine setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "./layouts/userLayout");

/**
 * Middlewares
 * - Morgan
 * - body parser
 * - cookie parser
 * - method override
 * - static files
 */
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
const csurf = require('csurf');

// Add CSRF protection (cookie-based)
app.use(csurf({ cookie: true }));

// CSRF error handling
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Invalid CSRF token.');
  } else {
    next(err);
  }
});


=======
>>>>>>> 3b4aa5cdae276595da8907889ecc433635ccc98d
// nocache for disabling browser caching
app.use(nocache());

// Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60},
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60,
    }),
  })
);

// passport js
app.use(flash());

// passport js
app.use(passport.initialize());
app.use(passport.session());

<<<<<<< HEAD
// Pass CSRF token to all views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});


=======
>>>>>>> 3b4aa5cdae276595da8907889ecc433635ccc98d
// Routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error pagesw
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
