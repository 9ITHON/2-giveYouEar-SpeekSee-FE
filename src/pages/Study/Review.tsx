import styled from 'styled-components';
import List from '../../components/List';
import { useEffect, useState } from 'react';
import getUserPracticeScripts from '../../apis/getUserPracticeScripts';

const ReviewStyle = styled.div`
  margin-top: 18px;
  padding: 0 24px;
`;

const Review = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getUserPracticeScripts();
        // response.data의 구조에 따라 아래 코드 수정 필요
        setReviews(response.data.data); // 예시: response.data가 배열일 경우
      } catch (error) {
        // 에러 처리
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
  console.log(reviews);
  return (
    <ReviewStyle>
      {reviews.map((review, index) => (
        <List
          key={index}
          title={"데일리 추천 대본"}
          description={review.title}
          detail={review.content}
        />
      ))}
    </ReviewStyle>
  );
};
export default Review;
