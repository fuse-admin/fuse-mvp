"use server";
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type Client = {
  id: string;
  name: string;
  address: string;
  city_state_zip: string;
  social_security_number: string;
  email: string;
  telephone: string;
  portfolio_value: number;
};

export async function GET(request: NextRequest) {
  try {
    const clients = await getDataFromDatabase();
    // Revalidate the cache every 60 seconds
    const path = request.nextUrl.searchParams.get('path') || '/';
    revalidatePath(path);

    return new NextResponse(JSON.stringify(clients), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60',
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500 }
    );
  }
}

async function getDataFromDatabase(): Promise<Client[]> {
  const response = await fetch('https://654ee273358230d8f0ccdecf.mockapi.io/api/clients/Client');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

