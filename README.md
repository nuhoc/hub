# The NUHOC Hub

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. It is very much still in development.

## Documentation links:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do run this?

We have docker setup (frontend broken at the moment)! So you can run the following commands:

```bash

docker-compose up -d

```

If you just want to run the frontend you can run:

```bash

npm run dev

```

If you just want to run the database you can run:

```bash

docker-compose up -d database

```

To migrate the Prisma schema changes to database, you can run:

```bash

npx prisma migrate dev --name <message>

```

To sync the Prisma schema changes to the database, you can run:

```bash

npx prisma push

```

To start Prisma Studio (GUI tool for database), you can run:
```bash

npx prisma studio

```
