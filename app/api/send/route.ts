import { EmailTemplate } from '@/components/shared/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  try {
    const { data, error} = await resend.emails.send({
      from: 'Contact Us <contactus@fuseai.app>',
      to: ['contact@fuseai.app'],
      subject: 'New Contact Form Submission',
      react: EmailTemplate({ name, email, message }) as React.ReactElement,
    });

    if (error) {
        return Response.json({ error });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
