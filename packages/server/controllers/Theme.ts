import type { Request, Response } from 'express';

import { tryCatch } from '../helpers/controllerHelper';

import { Theme as ThemeModel } from '../db';

import type { Theme } from '../models/Theme';

export const ThemeController = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getTheme: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const userId = +request.params.user_id;
      const theme = await ThemeModel.findOne({ where: { userId } });
      response.status(200).json({ data: theme });
    });
  },

  postTheme: async (request: Request, response: Response) => {
    tryCatch(response, async () => {
      const { userId, theme } = request.body;
      const messageData: Omit<Theme, 'id'> = {
        userId,
        theme,
      };

      const [savedTheme, created] = await ThemeModel.findOrCreate({
        where: { userId },
        defaults: messageData,
      });

      if (!created) {
        await savedTheme.update({ theme });
      }
      response.status(200).json({ data: savedTheme });
    });
  },
};
