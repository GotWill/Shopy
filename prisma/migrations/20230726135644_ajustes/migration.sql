/*
  Warnings:

  - You are about to drop the column `productId` on the `Favorites` table. All the data in the column will be lost.
  - Added the required column `productsId` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_productId_fkey";

-- DropIndex
DROP INDEX "Favorites_userId_productId_key";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "productId",
ADD COLUMN     "productsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
