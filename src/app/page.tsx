'use client';

import Image from "next/image";
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6">
          <Image
            src="/darklogo.png"
            alt="Neobound"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </div>
      </header>
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
          
        </div>
      </div>
    </main>
  );
} 