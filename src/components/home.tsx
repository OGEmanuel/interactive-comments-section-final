import { useEffect, useState } from 'react';
import Comment from './comment';
import { getData } from './util/api';
import { userTypes } from './data-types';
import Input from './ui/input';

const Home = () => {
  const [curUser, setCurUser] = useState<userTypes | undefined>();

  const getCurUser = async () => {
    const curUser = await getData('http://localhost:8080/current-user');
    setCurUser(curUser);
  };

  useEffect(() => {
    getCurUser();
  }, []);
  return (
    <section className="max-w-[1440px] mx-auto my-16">
      <div className="w-[51rem] mx-auto flex flex-col gap-5">
        <Comment curUser={curUser} />
        <Input
          url="http://localhost:8080/add-comment"
          type="SEND"
          curUser={curUser}
        />
      </div>
    </section>
  );
};

export default Home;
