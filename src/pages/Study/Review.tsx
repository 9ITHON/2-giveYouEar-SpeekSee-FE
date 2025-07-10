import List from '../../components/List';

const Review = () => {
  const reviews = [
    {
      title: '데일리 추천 대본',
      description: '잰말놀이',
      detail: '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 된 공장장이다.',
    },
    {
      title: '데일리 추천 대본',
      description: '자기소개',
      detail: '안녕하십니까? 저는 산책하는 중입니다.',
    },
    {
      title: '데일리 추천 대본',
      description: '뉴스',
      detail: '2024년 12월 말, 선행을 베푼 두 학생은',
    },
  ];
  return (
    <div>
      {reviews.map(review => (
        <List title={review.title} description={review.description} detailOne={review.detail} />
      ))}
    </div>
  );
};
export default Review;
