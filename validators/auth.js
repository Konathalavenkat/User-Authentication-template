const { check } = require("express-validator");
const validateEmail = require("./validateEmail");

const SignUpValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const SignInValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

const EmailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
];

const EmailCodeValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),
];

const RecoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("code").notEmpty().withMessage("Code is required"),

  check("password")
    .notEmpty()
    .withMessage("Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const changePasswordValidator = [
  check("oldPassword")
    .notEmpty()
    .withMessage("Old Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("Old Password must be at least 6 characters"),

    check("newPassword")
    .notEmpty()
    .withMessage("New Password must be at least 6 characters")
    .isLength({ min: 6 })
    .withMessage("New Password must be at least 6 characters"),
]

const updateProfileValidator = [
  check("email").custom(async (email) => {
    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        throw "Invalid email";
      }
    }
  }),
]

module.exports = {
  SignUpValidator,
  SignInValidator,
  EmailValidator,
  EmailCodeValidator,
  RecoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator
};
