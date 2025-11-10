import './Hero.css';

export default function Hero() {
  return (
    <section id="domov" className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Nextlayer Challenge</h1>
        <p className="hero-subtitle">
          Pomáhame ti premeniť nápady na skutočnosť
        </p>
        <div className="hero-video">
          <video
            controls
            width="100%"
            height="auto"
            className="hero-video-element"
          >
            <source src="/videos/video.mp4" type="video/mp4" />
            <source src="/videos/video.webm" type="video/webm" />
            Váš prehliadač nepodporuje video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

