import "./BaseLayout.scss";

export default function BaseLayout({ description, children }) {
  return (
    <div className="app-container">
      <p className="game-description">{description}</p>
      {children}
    </div>
  );
}
