export type GoogleBooksVolumeInfo = {
  title: string;
  authors: string[];
  publishedDate: string;
  categories: string[];
  imageLinks: {
    thumbnail: string;
  };
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
};

export type GoogleBooksApiResponse = {
  totalItems: number;
  items: {
    id: string;
    volumeInfo: GoogleBooksVolumeInfo;
  }[];
};

export type GenericError = {
  name: string;
  message: string;
  details: string;
};

export type FuncParams = {
  genre?: string;
  title?: string;
  author?: string;
};
