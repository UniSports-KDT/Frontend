컴포넌트 안내

1. homepages - 유니 스포트 메인화면

2. facility-lists - 시설 예약 가능 시설 리스트

3. accouncements - 공지사항 리스트가 카드 형식으로 나오는 페이지
공지사항 상세는 따로 만들지 않음

4. facility-resevations - 특정 시설을 예약할 수 있는 페이지

5. facility-lists 페이지에서 특정 시설을 클릭하면 여기로 이동

6. booking-list - 내가 예약한 시설의 예약 상태를 확인 가능한 페이지
승인/거절/대기 여부를 확인 가능

7. reservation-admin - 관리자가 시설에 대한 예약을 승인 및 거절 할 수 있는 페이지

8. announcement-write - 관리자가 공지사항 작성 누를 시 공지를 작성할 수 있는 페이지

9. announcements-admin - 관리자가 작성한 공지사항을 볼 수 있는 페이지
여기에서 관리자가 공지사항 작성하기 버튼을 눌러서 추가적으로 공지사항을 작성할 수 있음
작성한 공지사항을 수정 및 삭제 가능

10. facility-admin - 관리자가 등록한 시설 목록을 볼 수 있는 페이지
여기에 새로운 시설 등록하기 버튼을 눌러서 새로운 시설 등록 가능
이미 등록된 시설들은 수정 및 삭제하기 버튼으로 조작이 가능함

11. facility-create - 관리자가 새로운 시설을 등록하는 페이지

12. facility-edit - 관리자가 등록된 시설의 정보를 수정 가능한 페이지 

13. 관리자 메뉴 리스트
1) 공지사항 -> announcements-admin
2) 예약 관리 -> reservation-admin
3) 시설 관리 -> facility-admin
페이지로 가도록 라우팅 해놓았음



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
