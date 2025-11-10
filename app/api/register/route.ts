import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { meno, email, preco } = body;

    // Validation
    if (!meno || !email || !preco) {
      return NextResponse.json(
        { error: 'Všetky polia sú povinné.' },
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

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing registrations
    const filePath = path.join(dataDir, 'registrations.json');
    let registrations = [];

    if (existsSync(filePath)) {
      const fileContent = await readFile(filePath, 'utf-8');
      registrations = JSON.parse(fileContent);
    }

    // Add new registration
    const newRegistration = {
      id: Date.now().toString(),
      meno: meno.trim(),
      email: email.trim(),
      preco: preco.trim(),
      timestamp: new Date().toISOString(),
    };

    registrations.push(newRegistration);

    // Save to file
    await writeFile(filePath, JSON.stringify(registrations, null, 2), 'utf-8');

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

