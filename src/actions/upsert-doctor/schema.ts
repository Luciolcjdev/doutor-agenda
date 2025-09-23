import { z } from "zod";

export const uppsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, { message: "Nome é obrigatório." }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória." }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório." }),
    availableFromWeekDay: z.number().min(0).max(6),
    availableToWeekDay: z.number().min(0).max(6),
    availableFromTime: z
      .string()
      .min(1, { message: "Hora do início é obrigatória." }),
    availableToTime: z
      .string()
      .min(1, { message: "Hora do término é obrigatória." }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "O horário inicial deve ser anterior a hora de término.",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof uppsertDoctorSchema>;
