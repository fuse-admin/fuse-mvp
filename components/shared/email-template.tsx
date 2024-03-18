import * as React from 'react';
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, message,
}) => (
  <div>
    <p className={`${archivo.className}`}>Hi team,</p>
    <p>Someone sent us a new message on the 'Contact Us' page on the website. The request is from {name} ({email}). Read their message below:</p>
    <p className='font-bold' style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {message}
    </p>
  </div>
);
