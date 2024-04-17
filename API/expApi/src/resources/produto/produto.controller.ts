import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";

const index  = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({msg: "okay"})
};
const create = async (req: Request, res: Response) => {};
const read   = async (req: Request, res: Response) => {};
const update = async (req: Request, res: Response) => {};
const remove = async (req: Request, res: Response) => {};

export default { index, create, read, update, remove};

