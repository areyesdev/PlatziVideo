/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import useTvShowsApi from '../hooks/useTvShowsApi';
import '../assets/styles/App.scss';

const API = 'http://localhost:3000/initalState';

const Home = () => {
  const initialState = useTvShowsApi(API);
  return initialState.length === 0 ? <h1>Loading...</h1> : (
    <>
      <Search />
      {initialState.mylist.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {initialState.mylist.map((item) => <CarouselItem key={item.id} {...item} />)}
          </Carousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carousel>
          {initialState.trends.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
      <Categories title='Originales de Platfix'>
        <Carousel>
          {initialState.originals.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    </>
  );
};

export default Home;
