import { sitePath } from "../lib/site";

export default function NotFound() {
  return (
    <main className="practice-section">
      <div className="wrap">
        <h1>Página no encontrada</h1>
        <p><a href={sitePath("/")}>Volver a Inicio</a></p>
      </div>
    </main>
  );
}
