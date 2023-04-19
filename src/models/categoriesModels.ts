import knex from "knex";
import config from "../../knexfile";
import { Category } from "../types";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

export const getCategoriesNames = async () => {
  const categories: Category[] = await knexInstance("categories").select(
    "name"
  );
  return categories;
};

export const getCategoryById = async (id: number) => {
  const category: Category[] = await knexInstance("categories")
    .select("*")
    .where({ "categories.id": id });
  return category;
};

export const getCategoryByName = async (name: string) => {
  const category: Category[] = await knexInstance("categories")
    .select("*")
    .where({ "categories.name": name });
  return category;
};

export const createNewCategory = async (name: string) => {
  const id: number[] = await knexInstance("categories").insert({ name });
  return id;
};

export const updateCategory = async (name: string, id: number) => {
  return await knexInstance("categories").update({ name }).where({ id });
};

export const deleteCategory = async (id: number) => {
  return await knexInstance("categories").delete().where({ id });
};
