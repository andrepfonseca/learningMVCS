import {
  insertCategory,
  selectAllCategoriesNames,
  selectCategoryById,
  selectCategoryByName,
  updateCategory,
  deleteCategory,
} from "../models/categoriesModels";
import { Category } from "../types";

export const getCategoriesNames = async () => {
  const categories: Category[] = await selectAllCategoriesNames();
  const categoriesArray = categories.map((category: Category) => category.name);
  return categoriesArray;
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await selectCategoryById(id);
    if (!category.length) {
      throw new Error("Category not found");
    }
    return category[0];
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const searchCategoryByName = await selectCategoryByName(name);
    if (!searchCategoryByName.length) {
      const createdCategoryId = await insertCategory(name);
      return { id: createdCategoryId[0], name };
    }
    throw new Error("Category already exists");
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};
export const putCategory = async (name: string, id: number) => {
  try {
    const searchCategoryByName = await selectCategoryByName(name);
    if (!searchCategoryByName.length) {
      const updatedCategory = await updateCategory(name, id);
      if (!updatedCategory) throw new Error("Could not update category");
      return { id, name };
    }
    throw new Error("Category name already exists");
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

export const removeCategory = async (id: number) => {
  try {
    const deletedCategory = await deleteCategory(id);
    if (!deletedCategory) throw new Error("Category does not exist");
    return { message: "Category deleted" };
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};
