import axios from 'axios';
import IconMinus from '../assets/icons/icon-minus';
import IconPlus from '../assets/icons/icon-plus';

type ScorePropsType = {
  score: number;
  urlPlus: string;
  urlMinus: string;
};

const Rate = (props: ScorePropsType) => {
  const { score, urlPlus, urlMinus } = props;

  const header = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handlePlusClick = () => {
    axios.patch(urlPlus, header);
  };

  const handleMinusClick = () => {
    axios.patch(urlMinus, header);
  };

  return (
    <div className="bg-[#eaecf1] flex flex-col gap-5 items-center h-[70%] text-lg rounded-xl w-[4rem] py-4 font-medium text-[#5457b6]">
      <button onClick={handlePlusClick}>
        <IconPlus />
      </button>
      <p className="w-[25px] text-center">{score}</p>
      <button onClick={handleMinusClick}>
        <IconMinus />
      </button>
    </div>
  );
};

export default Rate;
