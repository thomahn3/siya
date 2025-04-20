/*
  Warnings:

  - You are about to alter the column `abn` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "hashedPassword" TEXT,
    "phone" INTEGER,
    "phoneVerified" DATETIME,
    "postcode" TEXT,
    "abn" INTEGER,
    "appUseType" TEXT,
    "entityType" TEXT,
    "profileCompleted" BOOLEAN DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("abn", "appUseType", "createdAt", "email", "emailVerified", "entityType", "hashedPassword", "id", "image", "name", "phone", "phoneVerified", "postcode", "profileCompleted", "updatedAt") SELECT "abn", "appUseType", "createdAt", "email", "emailVerified", "entityType", "hashedPassword", "id", "image", "name", "phone", "phoneVerified", "postcode", "profileCompleted", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
