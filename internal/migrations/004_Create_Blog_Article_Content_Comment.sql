-- CREATE TYPE programming_languages_enum AS ENUM ('c', 'c++', 'java', 'javascript', 'typescript', 'python', 'go', 'rust');


CREATE TABLE IF NOT EXISTS "blog"(
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "category" programming_languages_enum NOT NULL,
  "userId" UUID NOT NULL,

  FOREIGN KEY ("userId") REFERENCES "user"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "deletedAt" TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "article"(
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" VARCHAR(255) NOT NULL,
  "blogId" UUID NOT NULL,
  
  FOREIGN KEY ("blogId") REFERENCES "blog"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "deletedAt" TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "content"(
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "text" TEXT NOT NULL,
  "imgUrl" VARCHAR(255) NOT NULL,
  "articleId" UUID NOT NULL,
  
  FOREIGN KEY ("articleId") REFERENCES "article"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "deletedAt" TIMESTAMP
);


CREATE TABLE IF NOT EXISTS "comment"(
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "text" TEXT NOT NULL,
  "articleId" UUID NOT NULL,
  "userId" UUID NOT NULL,
  FOREIGN KEY ("articleId") REFERENCES "article"(id),
  FOREIGN KEY ("userId") REFERENCES "user"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "deletedAt" TIMESTAMP
)