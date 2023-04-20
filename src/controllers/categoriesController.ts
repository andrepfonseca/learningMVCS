import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {
  getCategoriesNames,
  createCategory,
  getCategoryById,
  putCategory,
  removeCategory,
} from "../services/categoriesServices";

const knexInstance: Knex = knex(config);

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categoriesArray = await getCategoriesNames();
    res.status(200).send(categoriesArray);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await getCategoryById(id);
    res.status(200).send(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const createdCategory = await createCategory(name);
    res.status(201).send(createdCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body;
    const category = await putCategory(name, id);
    res.status(201).send(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await removeCategory(id);
    res.status(200).json(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
