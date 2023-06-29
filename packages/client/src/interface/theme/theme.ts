import { z } from 'zod';

const ThemeModel = z.object({
  id: z.number(),
  userId: z.number(),
  theme: z.string(),
});

export type Theme = z.infer<typeof ThemeModel>

export type CreateThemeProps = Omit<Theme, 'id'>
export type GetThemeResult = { data: {
  theme: string,
}};

export type ThemeId = number
