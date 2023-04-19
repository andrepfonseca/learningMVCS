import {
  createNewCategory,
  getCategoriesNames,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
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
export const putCategory = async (name: string, id: number) => {
  try {
    const searchCategoryByName = await getCategoryByName(name);
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
