import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { string } from 'zod';
export const NewHouseService = (
    payload:Prisma.HouseCreateInput
) => {
    return prisma.house.create({
        data:payload
    })
}

export const CheckIfSameHouse = (
    userId: number,
    houseId: number
) => {
    return prisma.house.findFirstOrThrow({
        where: {
            proprietorId: userId,
            id: houseId
        }
    });
}

export const storePathImg = (
    path:string,
    userId:number,
    houseId:number
) => {
    return prisma.photo.create({
        data: {
            path: path,
            house: {
                connect: {
                    id:houseId
                }
            },
            User: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

export const GetHoues = (
    size?: number,
    skip?:number
) => {
    return prisma.house.findMany({
        take: size,
        skip: skip
    })
}

export const SearchService = (
    where: object,
    orderBy?: object
) =>{
    return prisma.house.findMany({
        where: where,
        include: {
            Photo: true,
            Proprietor:true
        },
        orderBy:orderBy
    });
}

export const GetAllService = (
    where?: object,
    orderBy?: object
) => {
    return prisma.house.findMany({
        include: {
            Photo: true,
            Proprietor:true
        }
    });
}

export const GetAllPhotoService= () => {
    return prisma.photo.findMany();
}
 
export const GetPhotoService = (
    id: number
) => {
    return prisma.photo.findMany({
        where: {
            "houseId": id
        }
    })
}