import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <ul>
        <li><Link href="/">영화 홈페이지</Link></li>
        <li><Link href="/search">영화 검색 페이지</Link></li>
        <li><Link href="/detail">영화 상세 페이지</Link></li>
      </ul>
    </div>
  );
}
