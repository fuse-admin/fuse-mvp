"use client";
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";
import { Archivo } from 'next/font/google';

const archivo = Archivo({ subsets: ["latin"] })

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setEmailSending(true);

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      // Handle error here
    } else {
      console.log('Email sent successfully', data);
      setEmailSending(false);
      setFormData({ name: '', email: '', message: '' }); // Reset form
      setIsDialogOpen(true); // Show success dialog
    }
  };

  return (
    <main className='h-screen w-screen flex flex-col p-10'>
      <section>
        <h1 className={`${archivo.className} text-yellow-500 font-extrabold text-4xl`}>Contact Us</h1>
      </section>
      <section className='flex mt-10'>
        <form className='flex flex-col w-1/2' onSubmit={handleSubmit}>
          <Input type="text" placeholder='Name' className='p-2 m-2 border-2 border-gray-500' name="name" value={formData.name} onChange={handleChange} />
          <Input type="email" placeholder='Email' className='p-2 m-2 border-2 border-gray-500' name="email" value={formData.email} onChange={handleChange} />
          <Textarea placeholder='Message' className='p-2 m-2 border-2 border-gray-500' name="message" value={formData.message} onChange={handleChange} />
          <Button type="submit" disabled={emailSending} className='relative text-white font-bold rounded-xl bg-yellow-500 hover:bg-green-500'>
              {emailSending ? (
                  <>
                      <Loading />
                      <span className="absolute">Sending...</span>
                  </>
              ) : (
                  'Send'
              )}
            </Button>
        </form>
      </section>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Request Sent</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Your request has been successfully sent. We'll get back to you soon. Thanks!
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsDialogOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </main>
  );
};

export default ContactUs;
