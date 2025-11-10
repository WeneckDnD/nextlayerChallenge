import './Achievements.css';
import Image from 'next/image';

export default function Achievements() {
  return (
    <section id="o-nas" className="achievements">
      <div className="achievements-container">
        <div className="achievements-split">
          <div className="achievements-text">
            <h2 className="achievements-title">Kto sme</h2>
            <div className="achievements-content">
              <p>
                Sme tím mladých podnikateľov a mentorov, ktorí veria, že každý má potenciál
                vytvoriť niečo úžasné. Nextlayer Challenge je projekt, ktorý sme vytvorili pre
                ľudí ako ty – pre tých, ktorí majú nápady, ale ešte nevedia, ako ich zrealizovať.
              </p>
              <p>
                Naša cesta začínala presne tam, kde možno teraz si ty – s nápadmi, ktoré sme
                chceli premeniť na skutočnosť, ale bez jasného plánu. Postupne sme sa učili,
                robili chyby, získavali skúsenosti a dnes pomáhame ďalším mladým ľuďom nájsť
                svoju cestu.
              </p>
              <p>
                Nezáleží na tom, či už máš skúsenosti s podnikaním alebo len začínaš. Dôležité je,
                že máš chuť učiť sa, rásť a vytvárať. My ti pomôžeme s tým, čo potrebuješ –
                od prvých krokov až po spustenie tvojho projektu.
              </p>
              <p>
                Sme tu, aby sme ti ukázali, že podnikanie nie je len o biznis plánoch a číslach.
                Je to o vášni, kreativite a odvahe skúšať nové veci. Ak máš chuť začať, sme tu
                pre teba.
              </p>
            </div>
          </div>
          <div className="achievements-logo">
            <Image
              src="/img/logo.png"
              alt="Nextlayer Challenge Logo"
              width={400}
              height={400}
              className="company-logo"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

