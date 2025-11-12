import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface TeamMember {
  id: number;
  meno: string;
  priezvisko: string;
  email: string;
  telefon: string;
  nickname: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      meno, 
      priezvisko, 
      email, 
      telefon, 
      nickname,
      teamName, 
      scenario, 
      preco, 
      teamMembers,
      termsAccepted 
    } = body;

    // Validation
    if (!meno || !priezvisko || !email || !telefon || !teamName || !scenario || !preco) {
      return NextResponse.json(
        { error: 'Všetky povinné polia musia byť vyplnené.' },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'Musíte súhlasiť s podmienkami súťaže.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neplatná emailová adresa.' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(telefon)) {
      return NextResponse.json(
        { error: 'Neplatné telefónne číslo.' },
        { status: 400 }
      );
    }

    // Validate team members
    if (teamMembers && Array.isArray(teamMembers)) {
      for (const member of teamMembers) {
        if (!member.meno || !member.priezvisko || !member.email || !member.telefon) {
          return NextResponse.json(
            { error: 'Všetky povinné polia pre členov tímu musia byť vyplnené.' },
            { status: 400 }
          );
        }
        if (!emailRegex.test(member.email)) {
          return NextResponse.json(
            { error: `Neplatná emailová adresa pre člena tímu: ${member.meno || 'člen'}.` },
            { status: 400 }
          );
        }
        if (!phoneRegex.test(member.telefon)) {
          return NextResponse.json(
            { error: `Neplatné telefónne číslo pre člena tímu: ${member.meno || 'člen'}.` },
            { status: 400 }
          );
        }
      }
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing registrations
    const registrationsFilePath = path.join(dataDir, 'registrations.json');
    let registrations = [];

    if (existsSync(registrationsFilePath)) {
      const fileContent = await readFile(registrationsFilePath, 'utf-8');
      registrations = JSON.parse(fileContent);
    }

    // Add new registration
    const newRegistration = {
      id: Date.now().toString(),
      meno: meno.trim(),
      priezvisko: priezvisko.trim(),
      email: email.trim(),
      telefon: telefon.trim(),
      nickname: nickname ? nickname.trim() : '',
      teamName: teamName.trim(),
      scenario: scenario.trim(),
      preco: preco.trim(),
      teamMembers: teamMembers || [],
      termsAccepted: termsAccepted,
      timestamp: new Date().toISOString(),
    };

    registrations.push(newRegistration);

    // Save to file
    await writeFile(registrationsFilePath, JSON.stringify(registrations, null, 2), 'utf-8');

    return NextResponse.json(
      { message: 'Registrácia bola úspešne uložená.', data: newRegistration },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json(
      { error: 'Nastala chyba pri ukladaní registrácie.' },
      { status: 500 }
    );
  }
}

