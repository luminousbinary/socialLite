/*
  Warnings:

  - You are about to drop the `FriendRequestEntity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FriendRequestEntity" DROP CONSTRAINT "FriendRequestEntity_receivedFriendRequestId_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequestEntity" DROP CONSTRAINT "FriendRequestEntity_sentFriendRequestId_fkey";

-- DropTable
DROP TABLE "FriendRequestEntity";

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "sentFriendRequestId" TEXT,
    "receivedFriendRequestId" TEXT,
    "status" "FriendRequest_Status" DEFAULT 'not_sent',

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_sentFriendRequestId_fkey" FOREIGN KEY ("sentFriendRequestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receivedFriendRequestId_fkey" FOREIGN KEY ("receivedFriendRequestId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
