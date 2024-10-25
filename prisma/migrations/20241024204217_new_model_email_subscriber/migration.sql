-- CreateTable
CREATE TABLE "EmailSubscriber" (
    "id" TEXT NOT NULL,
    "emails" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscriber_pkey" PRIMARY KEY ("id")
);
