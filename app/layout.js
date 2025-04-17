import React from 'react';
import MainHeader from '../components/main-header';
import Navigation from '../components/navigation';

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
