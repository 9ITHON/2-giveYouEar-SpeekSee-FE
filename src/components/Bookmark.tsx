import BookmarkIcon from '../assets/png/bookmark.png';
import BookmarkClickedIcon from '../assets/png/bookmark-clicked.png';
import styled from 'styled-components';

const BookmarkStyle = styled.img`
  position: absolute;
  right: 26px;
  top: -1px;
  width: 24px;
  cursor: pointer;
`;

const Bookmark = ({ active }: { active: boolean | undefined }) => {
  return <BookmarkStyle src={active ? BookmarkClickedIcon : BookmarkIcon} alt="북마크" />;
};

export default Bookmark;
