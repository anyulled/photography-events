# Photography events

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=anyulled_photography-events&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=anyulled_photography-events)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [
`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses [
`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check
out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out
our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for
more details.

## Event registration process

```plantuml
@startuml

skinparam backgroundColor #F5F5F5
skinparam shadowing false
skinparam arrowColor Black
skinparam actorBorderColor Black
skinparam activityBackgroundColor #FFDDDD
skinparam activityBorderColor Black
skinparam decisionBorderColor Black
skinparam decisionBackgroundColor #FFDDDD
skinparam endColor #FFAAAA

|#Rose|

start

:Organizer creates event;

:User registers for the event;

:Registration status is pending;

if (Approve registration?) then (yes)
    :Organizer approves registration;
    :Registration is approved;
    :User pays registration fee;
    :Registration is confirmed;
else (no)
    :Organizer rejects registration;
    :Registration is rejected;
endif

stop

@enduml

```
