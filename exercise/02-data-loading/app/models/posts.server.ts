import { prisma } from "~/db.server";

export async function getPostsListItem() {
  return prisma.post.findMany();
}
