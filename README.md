# FE-kick-movie

kick-movie 프론트 엔드 구현 레포지토리입니다. 

## 설치 방법 

```bash
git clone {remote 주소}
```

```bash
npm install react@latest next@latest react-dom@latest
```

## git branch 

```text
main : 메인입니다. 
develop : 지속적으로 개발할 브랜치입니다. 
feature/{기능명} : 신기능 개발할 브랜치입니다. 기능 구현이 완료되면 merge PR(pull request 요청)
```

```bash
git branch -m feature/{기능명} # 브랜치 생성
git push origin feature/{기능명} # 레포지토리에 등록
```

## git commit 메시지 작성

- feat: 새로운 기능 추가
- fix: 버그 수정 or 코드 로직 수정 등
- docs: 문서 수정
- style: 코드 포맷팅, 세미콜론 누락 등 코드 변경이 없는 경우
- refactor: 코드 리팩토링
- test: 테스트 코드 추가
- chore: 빌드 업무 수정, 패키지 매니저 수정 등

```bash
git commit -m "[feat] xxx 기능 추가"
git commit -m "[fix] {git issue 번호} 버그 수정"
git commit -m "[docs] readme 파일 수정"
git commit -m "[style] 코드 줄바꿈 수정"
git commit -m "[refactor] xxx 코드 리스트 형식에서 Hash로 리펙토링"
git commit -m "[test] xxx 기능 or Controller or Service 테스트"
git commit -m "[chore] git action 파일 or docker-compose 파일 수정"
```
