import { Outlet } from 'react-router-dom';
import Intro from '../components/Intro';
import MoviesTread from './MoviesTrending';
import Treadingtv from '../components/treadingtv';

const PageLayout = () => {
  return (
    // page layouts
    <>
      <Outlet />
      <Intro />
      <MoviesTread />
      <Treadingtv />
    </>
  );
};

export default PageLayout;
