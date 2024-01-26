"use server";
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { fetchClientsForFuseAI } from './fuse-clients/clients';


export async function GET(request: NextRequest) {
  const orgId = request.headers.get('X-Organization-Id');
  try {
    let clients;
    if (orgId === 'org_2bLHjXtOFDFbhCv7hfXMYt7ucNM') {
      clients = await fetchClientsForFuseAI();
    } else {
      console.log('Unknown organization ID:', orgId);
    }

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
