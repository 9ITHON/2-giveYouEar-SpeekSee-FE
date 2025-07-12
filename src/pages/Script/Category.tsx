import List from '../../components/List';
import SelectDescription from './components/SelectDescription';
import Difficulty from './components/Difficulty';

const Select = () => {
  const fields = [
    {
      title: '자기소개',
      description: '자신의 닉네임을 넣어 자기소개서를 연습해보세요!',
      detail: <Difficulty category="SELF_INTRODUCTION" />,
    },
    {
      title: '날씨',
      description: '다양한 날씨 상황을 소개하는 것을 연습해보세요!',
      detail: <Difficulty category="WEATHER" />,
    },
    {
      title: '뉴스',
      description: '기사를 읽으며 실제 상황을 설명하는 것을 연습해보세요!',
      detail: <Difficulty category="NEWS" />,
    },
    {
      title: '잰말놀이',
      description: '보다 정확하고 신속하게 발음하는 것을 연습해보세요!',
      detail: <Difficulty category="DAILY" />,
    },
  ];
  return (
    <div>
      <SelectDescription>연습하고자 하는 분야를 선택해주세요</SelectDescription>
      {fields.map((field, index) => (
        <List
          key={index}
          title={field.title}
          description={field.description}
          detail={field.detail}
        />
      ))}
    </div>
  );
};

export default Select;
