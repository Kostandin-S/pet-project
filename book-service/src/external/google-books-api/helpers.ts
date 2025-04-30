import { FuncParams } from './types';

export const generateRequestQuery = (params: FuncParams) => {
  if (params?.author && params?.title) {
    return `intitle:${params.title}+inauthor:${params.author}`;
  }

  if (params?.genre) {
    return `subject:${params.genre}+maxResults:5`;
  }

  return "";
};
