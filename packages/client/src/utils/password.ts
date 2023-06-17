export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  let error = '';
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      error = 'Пароли не совпадают';
    }
  }
  return error;
};
