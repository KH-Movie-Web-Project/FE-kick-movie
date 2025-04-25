import React from 'react';
import MainHeader from '../components/main-header';
import Navigation from '../components/navigation';
import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader/>
        {children}
        <Navigation/>
      </body>
    </html>
  )
}
