export function validateEmail(email) {
  const regEx = /([\w\-\.])+@(stud\.)?noroff\.no/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

export function validatePassword(password) {
  const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  const patternMatches = regEx.test(password);
  return patternMatches;
}