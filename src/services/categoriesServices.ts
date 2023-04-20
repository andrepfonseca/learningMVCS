import categoriesModels from "../models/categoriesModels";
import { Category } from "../types";

const getCategoriesNames = async () => {
  const categories: Category[] =
    await categoriesModels.selectAllCategoriesNames();
  const categoriesArray = categories.map((category: Category) => category.name);
  return categoriesArray;
};

const getCategoryById = async (id: number) => {
  try {
    const category = await categoriesModels.selectCategoryById(id);
    if (!category.length) {
      throw new Error("Category not found");
    }
    return category[0];
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const createCategory = async (name: string) => {
  try {
    const searchCategoryByName = await categoriesModels.selectCategoryByName(
      name
    );
    if (!searchCategoryByName.length) {
      const createdCategoryId = await categoriesModels.insertCategory(name);
      return { id: createdCategoryId[0], name };
    }
    throw new Error("Category already exists");
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const putCategory = async (name: string, id: number) => {
  try {
    const searchCategoryByName = await categoriesModels.selectCategoryByName(
      name
    );
    if (!searchCategoryByName.length) {
      const updatedCategory = await categoriesModels.updateCategory(name, id);
      if (!updatedCategory) throw new Error("Could not update category");
      return { id, name };
    }
    throw new Error("Category name already exists");
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

const removeCategory = async (id: number) => {
  try {
    const deletedCategory = await categoriesModels.deleteCategory(id);
    if (!deletedCategory) throw new Error("Category does not exist");
    return { message: "Category deleted" };
  } catch (error: any) {
    return error.message ? { error: error.message } : error;
  }
};

export default {
  getCategoriesNames,
  getCategoryById,
  createCategory,
  putCategory,
  removeCategory,
};
