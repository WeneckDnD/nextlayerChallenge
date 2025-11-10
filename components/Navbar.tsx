'use client';

import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link href="/" className="navbar-logo-link">
            <Image
              src="/img/logo_small.png"
              alt="Nextlayer Challenge Logo"
              width={110}
              height={40}
              className="navbar-logo-image"
              priority
            />
            <span className="navbar-logo-text">Nextlayer Challenge</span>
          </Link>
        </div>
        <ul className="navbar-menu">
          <li><a href="/#domov">DOMOV</a></li>
          <li><a href="/#o-nas">O NÁS</a></li>
          <li><a href="/zucastnit">CHCEM SA ZÚČASTNIŤ</a></li>
          <li><a href="/#kontakt">KONTAKT</a></li>
        </ul>
      </div>
    </nav>
  );
}

