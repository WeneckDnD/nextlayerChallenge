'use client';

import { useState, FormEvent } from 'react';
import './Registration.css';

export default function Registration() {
  const [formData, setFormData] = useState({
    meno: '',
    email: '',
    preco: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validation
    if (!formData.meno.trim() || !formData.email.trim() || !formData.preco.trim()) {
      setStatus('error');
      setMessage('Všetky polia sú povinné.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setMessage('Prosím zadajte platnú emailovú adresu.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Ďakujeme! Vaša registrácia bola úspešne odoslaná.');
        setFormData({ meno: '', email: '', preco: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Nastala chyba pri odosielaní formulára.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Nastala chyba pri odosielaní formulára. Skúste to znova.');
    }
  };

  return (
    <section className="registration">
      <div className="registration-container">
        <h2 className="registration-title">Chceš sa zúčastniť?</h2>
        <p className="registration-description">
          Vyplň formulár a daj nám vedieť, prečo chceš byť súčasťou Nextlayer Challenge.
        </p>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="meno">Meno</label>
            <input
              type="text"
              id="meno"
              name="meno"
              value={formData.meno}
              onChange={(e) => setFormData({ ...formData, meno: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="preco">Prečo sa chceš zapojiť?</label>
            <textarea
              id="preco"
              name="preco"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              rows={5}
              required
            ></textarea>
          </div>
          {message && (
            <div className={`form-message ${status}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Odosielam...' : 'Odoslať'}
          </button>
        </form>
      </div>
    </section>
  );
}

