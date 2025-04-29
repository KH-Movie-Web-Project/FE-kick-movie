import React from 'react';
import SearchHeader from '../../components/SearchHeader';

export default function RootLayout({ children }) {
  return (
    <>
        <SearchHeader/>
        {children}
    </>
  )
}