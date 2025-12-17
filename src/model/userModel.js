import { PrismaClient } from "@prisma/client";
import * as z from "zod";

const prisma = new PrismaClient();

// Zod schema para validar o User
const userSchema = z.object({
  id: z.number().int().positive().optional(),
  publicId: z.string().uuid().optional(),
  username: z.string({ required_error: "Username é obrigatório" }).min(3),
  email: z.string({ required_error: "Email é obrigatório" }).email(),
  password: z.string({ required_error: "Senha é obrigatória" }).min(6),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().nullable().optional(),
  theme: z.enum(["LIGHT", "DARK", "SYSTEM"]).optional(),
  role: z.enum(["USER", "ADMIN", "MODERATOR", "AUTHOR"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "BANNED"]).optional(),
  isAdult: z.boolean().optional(),
  emailVerified: z.boolean().optional()
});

// Função para validar User
export const validateUser = (user, partial = false) => {
  const schema = partial ? userSchema.partial() : userSchema;
  const result = schema.safeParse(user);
  if (result.success) return { success: true, data: result.data };
  const flattened = result.error.flatten();
  return { success: false, errors: flattened.fieldErrors };
};

// Helper para criar filtro flexível
const buildUserWhere = (identifier) => {
  if (typeof identifier === "number") return { id: identifier };
  if (typeof identifier === "string") return { publicId: identifier };
  throw new Error("Identificador inválido, deve ser id (number) ou publicId (string)");
};

// CRUD

export const createUser = async (user) => {
  const validated = validateUser(user);
  if (!validated.success) {
    const err = new Error("Validation failed");
    err.details = validated.errors;
    throw err;
  }

  const data = { ...validated.data, updatedAt: new Date() };

  return await prisma.user.create({
    data,
    select: {
      id: true,
      publicId: true,
      username: true,
      email: true,
      bio: true,
      avatarUrl: true,
      role: true,
      status: true,
      isAdult: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const getUser = async (identifier) => {
  return await prisma.user.findUnique({
    where: buildUserWhere(identifier),
    select: {
      id: true,
      publicId: true,
      username: true,
      email: true,
      bio: true,
      avatarUrl: true,
      role: true,
      status: true,
      isAdult: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const updateUser = async (identifier, user) => {
  const validated = validateUser(user, true);
  if (!validated.success) {
    const err = new Error("Validation failed");
    err.details = validated.errors;
    throw err;
  }

  return await prisma.user.update({
    where: buildUserWhere(identifier),
    data: { ...validated.data, updatedAt: new Date() },
    select: {
      id: true,
      publicId: true,
      username: true,
      email: true,
      bio: true,
      avatarUrl: true,
      role: true,
      status: true,
      isAdult: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const deleteUser = async (identifier) => {
  return await prisma.user.delete({
    where: buildUserWhere(identifier),
    select: {
      id: true,
      publicId: true,
      username: true,
      email: true
    }
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      publicId: true,
      username: true,
      email: true,
      bio: true,
      avatarUrl: true,
      role: true,
      status: true,
      isAdult: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
