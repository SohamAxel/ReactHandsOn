const validateEmail = (value) => {
  let errors = [];
  if (value === "") {
    errors.push("Required (Cannot be blank)");
  }
  if (!/\@webdevsimplified.com$/.test(value)) {
    errors.push("Must end in @webdevsimplified.com");
  }
  return errors;
};

const validatePassword = (value) => {
  let errors = [];
  if (value === "") {
    errors.push("Required (Cannot be blank)");
  }

  if (value.length < 10) {
    errors.push("Must Be 10 characters or longer");
  }

  if (!/[a-z]/.test(value)) {
    errors.push("Must include a lowercase letter");
  }
  if (!/[A-Z]/.test(value)) {
    errors.push("Must include an uppercase letter");
  }
  if (!/[0-9]/.test(value)) {
    errors.push("Must include a number");
  }

  return errors;
};

export { validateEmail, validatePassword };
