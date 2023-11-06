import { NextFunction, Request, Response } from 'express';
import HandleError from '../middleware/HandleError';
import { GetPaginationInput, StoreHouseInput, GetPhotoInput } from '../Schema/House.schema';
import { logger } from '../utils/logger';
import { CheckIfSameHouse, NewHouseService, storePathImg, GetHoues, SearchService, GetAllService, GetAllPhotoService, GetPhotoService } from '../service/building.service';
import { HandleSuccess } from '../middleware/HandleSuccess';

export const StoreBuildingHandle = async (
    req: Request<{},{},StoreHouseInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = {...req.body,proprietorId: res.locals.user.id}
        const new_house = await NewHouseService(payload);

        if (!new_house) next(HandleError(400))
        
        return res.status(201).json(HandleSuccess(new_house))
    } catch (error: any) {
        logger.error(error.message)
        next(HandleError(400, error))
    }
}

export const StoreBuildImgsHandle = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const houseId = req.params.id;
        
        await CheckIfSameHouse(user.id, parseInt(houseId));

        for (const file of (req.files as Express.Multer.File[])) {
            await storePathImg(file.path.split("uploads\\")[1],user.id,parseInt(houseId));
        }
        return res.status(201).json(HandleSuccess({message:"Succassfull"}));

    } catch (error: any) {
        logger.error(error.message)
        next(HandleError(400,error))
    }
}


//size of pagination is 10
export const PaginationHandle = async (
    req: Request<GetPaginationInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const pgnum = +(parseInt(req.params.pgnum) ?? 0);
        const pgsize = +(parseInt(req.params.pgsize) ?? 0);

        const houses = await GetHoues(pgsize, pgnum * pgsize);
        return res.status(200).json(HandleSuccess(houses));
    } catch (error: any) {
        logger.error(error.message)
        next(HandleError(400,error))       
    }
}



export const DeleteBuildingHandle = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
}



export const SearchBuildingHandle =  async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let where: any = {};
        let orderBy: any = {};
        
        if (req.query.title) {
            where.title = {
                contains: req.query.title,
            }
        }
        if (req.query.desc) {
            where.desc = {
                contains: req.query.desc,
            }
        }
        if (req.query.minprice) {
            where.price = {
                gte: req.query.minprice
            }
        }
        if (req.query.maxprice) {
            where.price = {
                lte: req.query.maxprice
            }
        }
        if (req.query.location) {
            where.location = {
                contains: req.query.location,
            }
        }
        if (req.query.sort) {
            const sort = req.query.sort as string;
            const sortArr = sort.split(" ")
            const key = sortArr[0]
            const value = sortArr[1]
            orderBy[key] = value
        }

        const search = await SearchService(where,orderBy);

        return res.status(200).json(HandleSuccess(search))

    } catch (error: any) {
        logger.error(error.message);
        next(HandleError(400,error))
    }
}

export const GetAllHandle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
       
        const data = await GetAllService()

        return res.status(200).json(HandleSuccess(data))

    } catch (error: any) {
        logger.error(error.message);
        next(HandleError(400,error))
    }
}

export const GetAllPhotoHandle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
       
        const data = await GetAllPhotoService()

        return res.status(200).json(HandleSuccess(data))

    } catch (error: any) {
        logger.error(error.message);
        next(HandleError(400,error))
    }
}


export const GetPhotoHandle = async (
    req: Request<GetPhotoInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        if(!id) next(HandleError(400,{message: "id not Found"}))
        const photos = await GetPhotoService(id);
        return res.status(200).json(HandleSuccess(photos))
    } catch (error: any) {
          logger.error(error.message);
        next(HandleError(400,error))      
    }
}