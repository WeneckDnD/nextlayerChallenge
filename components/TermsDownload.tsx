import './TermsDownload.css';

export default function TermsDownload() {
  return (
    <section className="terms-download">
      <div className="terms-download-container">
        <h2 className="terms-title">Podmienky spolupráce</h2>
        <div className="terms-summary">
          <h3 className="terms-summary-title">Stručné podmienky</h3>
          <ul className="terms-summary-list">
            <li>Účastníci musia byť vo veku 18-30 rokov</li>
            <li>Projekt musí byť originálny a vlastný nápad účastníka</li>
            <li>Účastníci sa zaväzujú aktívne sa zúčastňovať na workshoppoch a mentoringových stretnutiach</li>
            <li>Organizátori si vyhradzujú právo vybrať finálnych účastníkov na základe hodnotenia prihlášok</li>
            <li>Všetky projekty musia byť v súlade so zákonom a etickými normami</li>
            <li>Organizátori poskytujú podporu a zdroje, ale nezodpovedajú za komerčný úspech projektov</li>
          </ul>
        </div>
        <div className="terms-download-button-container">
          <a href="/terms/podmienky.pdf" className="terms-download-button" download>
            Stiahnuť podmienky spolupráce (.pdf)
          </a>
        </div>
      </div>
    </section>
  );
}

