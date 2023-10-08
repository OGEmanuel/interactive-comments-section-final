export type replies = {
  id?: string;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: userTypes;
};

type imageTypes = {
  png: string;
  webp: string;
};

export type userTypes = {
  image: imageTypes;
  username: string;
};

export type commentsDataTypes = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: userTypes;
  replies: replies[];
};

export type GetDataPropsType = string;
