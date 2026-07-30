export default function ResetPasswordPage() {
  return (
    <form className="aga-auth-form">
      <span>Account recovery</span>
      <h2>RESET PASSWORD</h2>
      <p>Create a new password for your AGA account.</p>
      <label>New password<input autoComplete="new-password" placeholder="New password" type="password" /></label>
      <label>Confirm password<input autoComplete="new-password" placeholder="Confirm password" type="password" /></label>
      <button className="aga-auth-submit" type="button">RESET PASSWORD</button>
    </form>
  );
}
