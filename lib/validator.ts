import { z } from "zod";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be atleast 3 characters."),
  description: z
    .string()
    .min(3, "Description must be atleast 3 characters.")
    .max(700, "Description must be atmost 400 characters."),
  location: z
    .string()
    .min(3, "Location must be atleast 3 characters.")
    .max(400, "Location must be atmost 400 characters."),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

export default eventFormSchema;
