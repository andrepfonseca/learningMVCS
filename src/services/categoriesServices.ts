import {
  createNewCategory,
  getCategoriesNames,
  getCategoryById,
  getCategoryByName,
} from "../models/categoriesModels";
import { Category } from "../types";

export const categoriesNames = async () => {
  const categories: Category[] = await getCategoriesNames();
  const categoriesArray = categories.map((category: Category) => category.name);
  return categoriesArray;
};

export const categoryId = async (id: number) => {
  try {
    const category = await getCategoryById(id);
    if (!category.length) {
      throw new Error("Category not found");
    }
    return category[0];
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

export const categoryCreate = async (name: string) => {
  try {
    const searchCategoryByName = await getCategoryByName(name);
    if (!searchCategoryByName.length) {
      const createdCategoryId = await createNewCategory(name);
      return { id: createdCategoryId[0], name };
    }
    throw new Error("Category already exists");
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};
