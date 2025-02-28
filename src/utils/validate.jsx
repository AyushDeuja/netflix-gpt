export const checkValidData = (name, email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid = /^.*(?=.{7,50})(?=.*\d)(?=.*[A-Z]).*$/.test(password);

  // Only validate name if it's present (i.e., during Sign-Up)
  const isNameValid = name ? /^[A-Za-z]+([-' .][A-Za-z]+)*$/.test(name) : true;

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not Valid";
  if (name && !isNameValid) return "Name is not valid"; // Only validate name if provided

  return null;
};
