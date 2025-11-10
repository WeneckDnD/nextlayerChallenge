import './WhoWeSeek.css';

export default function WhoWeSeek() {
  const talents = [
    '#Hudba',
    '#Video',
    '#Edit',
    '#Programovanie',
    '#Marketing',
    '#Podnikanie',
    '#Dizajn',
  ];

  return (
    <section className="who-we-seek">
      <div className="who-we-seek-container">
        <h2 className="who-we-seek-title">Koho hľadáme</h2>
        <p className="who-we-seek-description">
          Hľadáme mladých, ambicióznych ľudí, ktorí majú nápady a chuť začať podnikať.
          Nezáleží na tom, či už máš skúsenosti alebo len začínaš – dôležité je, že máš
          vášeň a ochotu učiť sa.
        </p>
        <div className="talents-section">
          <h3 className="talents-title">Hľadáme talenty v týchto oblastiach:</h3>
          <div className="talents-grid">
            {talents.map((talent, index) => (
              <span key={index} className="talent-tag">
                {talent}
              </span>
            ))}
          </div>
        </div>
        <div className="ideal-participant">
          <h3 className="ideal-participant-title">Ideálny účastník:</h3>
          <ul className="ideal-participant-list">
            <li>Máš kreatívne nápady a chuť ich realizovať?</li>
            <li>Si ochotný učiť sa nové veci a rozvíjať svoje schopnosti?</li>
            <li>Máš základné znalosti v jednej alebo viacerých oblastiach?</li>
            <li>Si tímový hráč a vieš spolupracovať?</li>
            <li>Máš motiváciu a odhodlanie dosiahnuť svoje ciele?</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

