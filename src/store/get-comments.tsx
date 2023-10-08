import React, { ReactNode, useEffect, useState } from 'react';
import { commentsDataTypes } from '../components/data-types';
import { getData } from '../components/util/api';

type childrenType = {
  children: ReactNode;
};

const CommentsContext = React.createContext<commentsDataTypes[]>([]);

export const CommentsContextProvider = (props: childrenType) => {
  const [commentsData, setCommentsData] = useState<commentsDataTypes[]>([]);
  const { children } = props;

  const getComments = async () => {
    const comments: [] = await getData('http://localhost:8080/all-comments');
    setCommentsData(comments);
  };

  useEffect(() => {
    getComments();
  }, [commentsData]);

  return (
    <CommentsContext.Provider value={commentsData}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContext;
