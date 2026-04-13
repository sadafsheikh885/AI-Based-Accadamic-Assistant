import "./StartPage.css";

export default function StartPage({ onLogin, onRegister }) {
  return (
    <div className="start-container">
      <div className="start-card">
        <h1>Student Assistant</h1>

        <button className="primary-btn" onClick={onLogin}>
          Login
        </button>

        <button className="secondary-btn" onClick={onRegister}>
          Register
        </button>
      </div>
    </div>
  );
}