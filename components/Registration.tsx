'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import './Registration.css';

interface TeamMember {
  id: number;
  meno: string;
  priezvisko: string;
  email: string;
  telefon: string;
  nickname: string;
}

export default function Registration() {
  const [formData, setFormData] = useState({
    meno: '',
    priezvisko: '',
    email: '',
    telefon: '',
    nickname: '',
    teamName: '',
    scenario: '',
    preco: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [memberCounter, setMemberCounter] = useState(0);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTeamMember = () => {
    if (teamMembers.length >= 5) {
      setStatus('error');
      setMessage('Maximálny počet členov tímu je 5.');
      return;
    }
    setTeamMembers([...teamMembers, { 
      id: memberCounter, 
      meno: '',
      priezvisko: '',
      email: '',
      telefon: '',
      nickname: ''
    }]);
    setMemberCounter(memberCounter + 1);
  };

  const removeTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const updateTeamMember = (id: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Validation
    if (!formData.meno.trim() || !formData.priezvisko.trim() || !formData.email.trim() || 
        !formData.telefon.trim() || !formData.teamName.trim() || !formData.scenario || 
        !formData.preco.trim()) {
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

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(formData.telefon)) {
      setStatus('error');
      setMessage('Prosím zadajte platné telefónne číslo.');
      return;
    }

    // Terms acceptance validation
    if (!termsAccepted) {
      setStatus('error');
      setMessage('Musíte súhlasiť s podmienkami súťaže.');
      return;
    }

    // Validate team members
    for (const member of teamMembers) {
      if (!member.meno.trim() || !member.priezvisko.trim() || !member.email.trim() || !member.telefon.trim()) {
        setStatus('error');
        setMessage('Všetky povinné polia pre členov tímu musia byť vyplnené.');
        return;
      }
      if (!emailRegex.test(member.email)) {
        setStatus('error');
        setMessage(`Prosím zadajte platnú emailovú adresu pre člena tímu: ${member.meno || 'člen'}.`);
        return;
      }
      if (!phoneRegex.test(member.telefon)) {
        setStatus('error');
        setMessage(`Prosím zadajte platné telefónne číslo pre člena tímu: ${member.meno || 'člen'}.`);
        return;
      }
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meno: formData.meno.trim(),
          priezvisko: formData.priezvisko.trim(),
          email: formData.email.trim(),
          telefon: formData.telefon.trim(),
          nickname: formData.nickname.trim(),
          teamName: formData.teamName.trim(),
          scenario: formData.scenario,
          preco: formData.preco.trim(),
          teamMembers: teamMembers,
          termsAccepted: termsAccepted,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Ďakujeme! Vaša registrácia bola úspešne odoslaná.');
        setFormData({ 
          meno: '', 
          priezvisko: '',
          email: '', 
          telefon: '',
          nickname: '',
          teamName: '',
          scenario: '',
          preco: '' 
        });
        setTermsAccepted(false);
        setTeamMembers([]);
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
            <label htmlFor="meno">Meno a Priezvisko</label>
            <div className="name-fields">
              <input
                type="text"
                id="meno"
                name="meno"
                placeholder="Meno"
                value={formData.meno}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                id="priezvisko"
                name="priezvisko"
                placeholder="Priezvisko"
                value={formData.priezvisko}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="xyz@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefon">Telefónne číslo</label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleInputChange}
              required
              placeholder="+421 912 345 678"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Prezývka (voliteľné)</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="nickname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Názov tímu</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="scenario">Scenár</label>
            <select
              id="scenario"
              name="scenario"
              value={formData.scenario}
              onChange={handleInputChange}
              required
            >
              <option value="">--vyberte scenár--</option>
              <option value="1">Nextlayer Bakery</option>
              <option value="2">Nextlayer Sweets</option>
              <option value="3">Nextlayer Coffee</option>
              <option value="4">Nextlayer Marketing</option>
              <option value="5">Nextlayer Production</option>
            </select>
          </div>
          <div className="form-group">
            <label>Členovia tímu (max. 5)</label>
            {teamMembers.map((member, index) => (
              <div key={member.id} className="team-member-card">
                <div className="team-member-header">
                  <h4>Člen tímu #{index + 1}</h4>
                  <button
                    type="button"
                    className="remove-member-button"
                    onClick={() => removeTeamMember(member.id)}
                  >
                    Odstrániť
                  </button>
                </div>
                <div className="team-member-fields">
                  <div className="form-group">
                    <label>Meno a Priezvisko</label>
                    <div className="name-fields">
                      <input
                        type="text"
                        placeholder="Meno"
                        value={member.meno}
                        onChange={(e) => updateTeamMember(member.id, 'meno', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Priezvisko"
                        value={member.priezvisko}
                        onChange={(e) => updateTeamMember(member.id, 'priezvisko', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="xyz@example.com"
                      value={member.email}
                      onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Telefónne číslo</label>
                    <input
                      type="tel"
                      placeholder="+421 912 345 678"
                      value={member.telefon}
                      onChange={(e) => updateTeamMember(member.id, 'telefon', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Prezývka (voliteľné)</label>
                    <input
                      type="text"
                      placeholder="nickname"
                      value={member.nickname}
                      onChange={(e) => updateTeamMember(member.id, 'nickname', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            {teamMembers.length < 5 && (
              <button
                type="button"
                className="add-member-button"
                onClick={addTeamMember}
              >
                Pridať člena
              </button>
            )}
          </div>
          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <span>Súhlasím s podmienkami súťaže</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="preco">Prečo sa chceš zapojiť?</label>
            <textarea
              id="preco"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
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

