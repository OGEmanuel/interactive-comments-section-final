import { useState } from 'react';
import { replies, userTypes } from './data-types';
import Card from './ui/card';
import Input from './ui/input';
import Modal from './ui/modal';

type ReplyPropsType = {
  modalActive: () => void;
  replies: replies;
  curUser: userTypes | undefined;
  commentId: string;
  modalOpen: boolean;
};

const Reply = (props: ReplyPropsType) => {
  const [isReplying, setIsReplying] = useState<string | undefined>(undefined);
  const { replies, curUser, commentId, modalActive, modalOpen } = props;
  // , onOpenModal, modalOpen

  const handleReplyClick = (id: string | undefined) => {
    if (isReplying === id) {
      return setIsReplying(undefined);
    }

    setIsReplying(id);
  };

  return (
    <>
      <Card
        urlMinus={`http://localhost:8080/decrement-reply-score/${commentId}?id=${replies.id}`}
        urlPlus={`http://localhost:8080/increment-reply-score/${commentId}?id=${replies.id}`}
        onReplyClick={handleReplyClick}
        id={replies.id}
        className="px-7 py-7 ml-10"
        replyingTo={replies.replyingTo}
        content={replies.content}
        createdAt={replies.createdAt}
        score={replies.score}
        user={replies.user}
        curUser={curUser}
        onOpenModal={modalActive}
      />
      {replies.user.username !== curUser?.username &&
        isReplying === replies.id && (
          <div className="ml-10">
            <Input
              url={`http://localhost:8080/add-reply/${commentId}`}
              type="REPLY"
              curUser={curUser}
              replyingTo={replies.user.username}
              hideInput={setIsReplying}
            />
          </div>
        )}

      {modalOpen && (
        <Modal
          url={`http://localhost:8080/delete-reply/${commentId}?repId=${replies.id}`}
          modalActive={modalActive}
        />
      )}
    </>
  );
};

export default Reply;
