const bcrypt = require("bcrypt");
const adminLayout = "./layouts/adminLayout.ejs";
const User = require("../model/userSchema");
const passport = require("../config/passport-config");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const logger = require('../../logger');

module.exports = {
  // User GET /
  // login register
  getUserLogin: (req, res) => {
    if (req.user) {
      res.redirect("/");
    }

    const locals = {
      title: "User Login",
    };

    res.render("user/login", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  },
  getUserRegister: (req, res) => {
    const locals = {
      title: "User Register",
    };

    res.render("user/register", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  },
  // User POST /
  // login register
  userRegister: async (req, res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists, Please login");
      console.log("User already exists, Please login");
      return res.redirect("/login");
    }

    if (pwd.length < 8 && pwdConf.length < 8) {
      req.flash("error", "Password is less than 8 character");
      console.log( "Password is less than 8 character" );
      res.redirect("/register");
    } else {
      if (pwd === pwdConf) {
        const hashpwd = await bcrypt.hash(pwd, 12);

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashpwd,
        });

        if (user) {
          req.flash("success", "User successfully created!!");
          res.redirect("/login");
        } else {
          req.flash("error", "User not created");
          res.redirect("/register");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/register");
      }
    }
  },
  
  userLogin: (req, res, next) => {
    // console.log(req.body);
    passport.authenticate("user-local", (err, user, info) => {
      if (err) {
        logger.error(`User login error: ${err.message}`);
        return next(err);
      }
      if (!user) {
        logger.warn(`Failed user login attempt: ${req.body.email}`);
        req.flash('error', info.message)
        return res.redirect("/login");
      }
      
      req.logIn(user, (err) => {
  	if (err) {
    	  logger.error(`Login error after passport success (user): ${err.message}`);
    	  return next(err);
  	}
	logger.info(`User logged in: ${user.email}`);
	
  	const token = jwt.sign(
    	  { id: user._id, isAdmin: user.isAdmin },
    	  jwtSecret,
    	  { expiresIn: "1h" }
  	);

  	res.cookie("token", token, { httpOnly: true });
  	return res.redirect("/");
	});

    })(req, res, next);
  },
  // Admin GET /
  // login register
  getAdminLogin: (req, res) => {
    const locals = {
      title: "Admin Login",
    };
    
    res.render("admin/login", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
      layout: adminLayout,
    });
  },
  getAdminRegister: (req, res) => {
    const locals = {
      title: "Admin Register",
    };

    res.render("admin/register", {
      locals,
      success: req.flash("success"),
      error: req.flash("error"),
      layout: adminLayout,
    });
  },

  // POST /
  adminRegister: async (req, res) => {
    const { firstName, lastName, email, pwd, pwdConf } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      req.flash("error", "User already exists, Please login");
      console.log("User already exists, Please login");
      res.redirect("/login");
    }

    if (pwd.length < 8 && pwdConf.length < 8) {
      req.flash("error", "Password is less than 8 character");
      res.redirect("/register");
    } else {
      if (pwd === pwdConf) {
        const hashpwd = await bcrypt.hash(pwd, 12);

        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashpwd,
          isAdmin: true,
        });

        if (user) {
          req.flash("success", "User successfully created!!");
          res.redirect("/admin/login");
        } else {
          req.flash("error", "User not created");
          res.redirect("/admin/register");
        }
      } else {
        req.flash("error", "Password does not match");
        console.log("Password does not match");
        res.redirect("/admin/register");
      }
    }
  },
  adminLogin: (req, res, next) => {
    passport.authenticate("admin-local", (err, user, info) => {
      if (err) {
        logger.error(`Admin login error: ${err.message}`);
        return next(err);
      }
      if (!user) {
        logger.warn(`Failed admin login attempt: ${req.body.email}`);
        req.flash('error','Invalid Credentials!!!')
        return res.redirect("/admin/login");
      }
      
      req.logIn(user, (err) => {
  	if (err) {
    	  logger.error(`Login error after passport success (admin): ${err.message}`);
    	  return next(err);
  	}
	logger.info(`Admin logged in: ${user.email}`);
	
  	const token = jwt.sign(
    	  { id: user._id, isAdmin: true },
    	  jwtSecret,
    	  { expiresIn: "1h" }
  	);

  	res.cookie("token", token, { httpOnly: true });
  	req.flash('success', 'Admin Logged In');
  	return res.redirect("/admin");
	});

    })(req, res, next);
  },

  logout: (req, res) => {
    req.logOut((err) => {
      if (err) {
        console.log(err);
      } else {
        req.flash("success", `Logged Out!!`);
        res.clearCookie("token");
        res.clearCookie("connect.sid");
        res.redirect("/login");
      }
    });
  },
  adminLogout: (req, res) => {
    req.logOut((err) => {
      if (err) {
        console.log(err);
      } else {
        req.flash("success", `Logged Out!!`);
        res.clearCookie("token");
        res.clearCookie("connect.sid");
        res.redirect("/admin/login");
      }
    });
  },
};
