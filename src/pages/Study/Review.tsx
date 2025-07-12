import styled from 'styled-components';
import List from '../../components/List';
import { useEffect, useState } from 'react';
import getUserPracticeScripts from '../../apis/getUserPracticeScripts';
import { useNavigate } from 'react-router-dom';

const ReviewStyle = styled.div`
  margin-top: 18px;
  padding: 0 24px;
`;

const ReviewStyle = styled.div`
  margin-top: 18px;
  padding: 0 24px;
`;

const Review = () => {
  const [reviews, setReviews] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getUserPracticeScripts();
        setReviews([...response.data.data].reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);
  const navigate = useNavigate();
  console.log(reviews);
  return (
    <ReviewStyle>
      {reviews.map((review, index) => (
        <List
          key={index}
          title={'데일리 추천 대본'}
          description={review.title}
          detail={review.content}
          onClick={() => navigate(`/script/review/${review.id}`, {
            state: {
              id: review.id,
              content: review.content,
            }
          })}
        />
      ))}
    </ReviewStyle>
  );
};
export default Review;
