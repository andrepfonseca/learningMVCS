import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {
  categoriesNames,
  categoryCreate,
  categoryId,
} from "../services/categoriesServices";

const knexInstance: Knex = knex(config);

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categoriesArray = await categoriesNames();
    res.status(200).send(categoriesArray);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await categoryId(id);
    res.status(200).send(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;
    const createdCategory = await categoryCreate(name);
    res.status(201).send(createdCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body;

    await knexInstance("categories").update({ name }).where({ id });
    res.status(201).send({
      id,
      name,
    });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const category: number = await knexInstance("categories")
      .delete()
      .where({ id });
    if (!category) throw new Error("Category does not exist");
    res.status(200).json({ message: "Category deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
