import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>
            Weather data by{' '}
            <a href="https://open-meteo.com/" target="_blank">
              Open-Meteo
            </a>
          </p>
        </div>

        <div className="footer-section">
          <p>© 2026 • Built by eliziq</p>
        </div>

        <div className="footer-links">
          <a href="https://github.com/eliziq/weather" target="_blank">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yelizavieta-parkhomets-288a8a166" target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
