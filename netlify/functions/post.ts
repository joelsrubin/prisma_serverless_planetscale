import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function handler(event) {
  const { title, content } = JSON.parse(event.body);
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return {
      statusCode: 200,
      body: 'post successfully created',
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}
