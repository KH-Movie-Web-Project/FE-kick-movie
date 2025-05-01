import React from 'react';
import MainHeader from '../components/main-header';
import Navigation from '../components/navigation';
import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
      <>
        <MainHeader/>
        {children}
        <Navigation/>
      </>
  )
}
