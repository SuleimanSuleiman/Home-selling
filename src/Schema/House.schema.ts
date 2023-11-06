import { object, string, number, TypeOf } from 'zod';

const payloadStore = {
    body: object({
        title: string({
            required_error: "Title is required"
        }),
        desc:  string({
            required_error: "Desc is required"
        }),
        price: string({
            required_error: "price is required"
        }),
        location:  string({
            required_error: "location is required"
        }),
        proprietorId:  number().optional(),
    })
}

const paramsPagination = {
    params: object({
        pgnum: string({
            required_error: "pgnum is required",
        }),
        pgsize: string({
            required_error: "pgsize is required",
        }),
    })
}

const GetPhotos = {
    params: object({
        id: string({
            required_error: "id is required",
        })
    })
}

export const StoreHouesSchema = object({
    ...payloadStore
})

export const GetPaginationSchema = object({
    ...paramsPagination
})

export const GetPhotoSchema = object({
    ...GetPhotos
})

export type StoreHouseInput = TypeOf<typeof StoreHouesSchema>
export type GetPaginationInput = TypeOf<typeof GetPaginationSchema>
export type  GetPhotoInput = TypeOf<typeof GetPhotoSchema>