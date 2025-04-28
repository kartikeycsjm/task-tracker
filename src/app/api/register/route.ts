import {Connect } from '@/Utils/Connect';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, password, country } = await request.json();

  if (!name || !email || !password || !country) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  await Connect();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  await User.create({
    name,
    email,
    password: hashedPassword,
    country,
  });

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
