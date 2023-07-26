/*
  Warnings:

  - You are about to drop the column `productsId` on the `Favorites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_productsId_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "productsId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_productId_key" ON "Favorites"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
