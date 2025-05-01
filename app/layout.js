import React from "react";
import MainHeader from "../components/main-header";
import Navigation from "../components/navigation";
import "../app/globals.css";
import { Suspense } from 'react'


export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader />
      <Suspense fallback={<div>검색 결과 로딩 중...</div>}>{children}</Suspense>
      <Navigation />
    </>
  );
}
