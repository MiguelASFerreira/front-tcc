"use server"
import { utapi } from "@/server/uploadthing"

export const imageRemove = async (imageKey: any) => {
    try {
        await utapi.deleteFiles(imageKey)
        return {sucess: true}
    } catch (error) {
        return {sucess: false}
    }
}