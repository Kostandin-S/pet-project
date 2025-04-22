import dotenv from "dotenv";

import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

async function main() {
  // --- Seed Genres ---
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Biography",
    "History",
    "Romance",
    "Thriller",
    "Horror",
    "Self-Help",
    "Poetry",
    "Drama",
    "Adventure",
    "Children’s Literature",
    "Young Adult",
    "Classic",
    "Graphic Novel",
    "Philosophy",
    "Health & Wellness",
  ];

  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const allGenres = await prisma.genre.findMany();

  // --- Seed Books ---
  const books = [
    {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      publishedDate: new Date("2019-02-05"),
      isbn: "9781250301697",
      genres: ["Mystery", "Thriller"],
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      publishedDate: new Date("2018-10-16"),
      isbn: "9780735211292",
      genres: ["Self-Help", "Health & Wellness"],
    },
    {
      title: "1984",
      author: "George Orwell",
      publishedDate: new Date("1949-06-08"),
      isbn: "9780451524935",
      genres: ["Classic", "Philosophy", "Science Fiction"],
    },
    {
      title: "Harry Potter and the Sorcerer’s Stone",
      author: "J.K. Rowling",
      publishedDate: new Date("1997-06-26"),
      isbn: "9780590353427",
      genres: ["Fantasy", "Young Adult", "Children’s Literature"],
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedDate: new Date("1937-09-21"),
      isbn: "9780547928227",
      genres: ["Fantasy", "Adventure", "Classic"],
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedDate: new Date("1960-07-11"),
      isbn: "9780061120084",
      genres: ["Fiction", "Classic", "Drama"],
    },
    {
      title: "Educated",
      author: "Tara Westover",
      publishedDate: new Date("2018-02-20"),
      isbn: "9780399590504",
      genres: ["Biography", "Non-Fiction"],
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publishedDate: new Date("1925-04-10"),
      isbn: "9780743273565",
      genres: ["Classic", "Drama"],
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      publishedDate: new Date("1988-01-01"),
      isbn: "9780061122415",
      genres: ["Philosophy", "Fiction"],
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      publishedDate: new Date("1965-08-01"),
      isbn: "9780441172719",
      genres: ["Science Fiction", "Adventure"],
    },
  ];

  for (const book of books) {
    const createdBook = await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate,
        isbn: book.isbn,
      },
    });

    const genreConnections = book.genres.map((genreName) => {
      const genre = allGenres.find((g) => g.name === genreName);
      if (!genre) throw new Error(`Genre not found: ${genreName}`);
      return {
        bookId: createdBook.id,
        genreId: genre.id,
      };
    });

    for (const connection of genreConnections) {
      await prisma.bookGenres.create({
        data: connection,
      });
    }
  }

  console.log("Genres and Books seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
