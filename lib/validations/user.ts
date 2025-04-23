import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    instrument: z.string().nonempty("Select an Instrument"),
    genre: z.string().nonempty("Select a genre"),
})