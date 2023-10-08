import axios from 'axios';
import { userTypes } from '../data-types';
import { useId, useRef } from 'react';
import { useDateFormat } from '../util/useDateFormat';

type InputPropsType = {
  curUser: userTypes | undefined;
  type: string;
  replyingTo?: string;
  url: string;
  hideInput?: (props: string | undefined) => void;
};

const date = new Date();

const Input = (props: InputPropsType) => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { curUser, type, replyingTo, url, hideInput } = props;
  let setId = useId();

  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentRef.current?.value) return;

    let body;

    if (type === 'SEND') {
      body = {
        id: `${setId}`,
        content: commentRef.current?.value,
        createdAt: useDateFormat(date),
        score: 0,
        user: {
          image: {
            png: 'https://i.ibb.co/3hVx9Cw/image-juliusomo.png',
            webp: 'https://i.ibb.co/3hVx9Cw/image-juliusomo.png',
          },
          username: 'juliusomo',
        },
        replies: [],
      };
    } else if (type === 'REPLY') {
      body = {
        id: `${setId}`,
        content: commentRef.current?.value,
        createdAt: useDateFormat(date),
        score: 0,
        replyingTo: replyingTo,
        user: {
          image: {
            png: 'https://i.ibb.co/3hVx9Cw/image-juliusomo.png',
            webp: 'https://i.ibb.co/3hVx9Cw/image-juliusomo.png',
          },
          username: 'juliusomo',
        },
      };
    }

    try {
      let response;

      if (type === 'SEND') {
        response = await axios.post(url, body, header);
      } else if (type === 'REPLY') {
        response = await axios.patch(url, body, header);
      }
    } catch (error) {
      console.error(error);
    }

    commentRef.current.value = '';

    if (hideInput) {
      hideInput(undefined);
    }
  };

  return (
    <div className="flex bg-white rounded-xl justify-between gap-4 p-7 items-start">
      <img
        src={curUser?.image.png}
        alt={curUser?.username}
        className="w-[3rem]"
      />
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex gap-4 w-full items-start"
      >
        <textarea
          ref={commentRef}
          cols={30}
          rows={3}
          className="w-full border rounded-xl outline-none resize-none p-5"
          placeholder="Add a comment"
        ></textarea>
        <button
          type="submit"
          className="text-white bg-[#5457b6] py-3 px-7 rounded-lg font-medium"
        >
          {type}
        </button>
      </form>
    </div>
  );
};

export default Input;
