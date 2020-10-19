import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Categories from '../components/Categories';
import '../assets/styles/App.scss';


const Home = ({ myList, trends, originals, searchResult }) => {
  return (
    <>
      <Header />
      <Search isHome />
      {
        Object.keys(searchResult).length > 0 &&
        (
          <Categories title="Resultados de la busqueda...">
            <Carousel>
              {searchResult.map(item =>
                <CarouselItem
                  key={item.id}
                  {...item}
                />
              )}
            </Carousel>
          </Categories>
        )
      }
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList.map((item) =>
              <CarouselItem
                key={item.id}
                {...item}
                isList
              />
            )}
          </Carousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
      <Categories title='Originales de Platfix'>
        <Carousel>
          {originals.map((item) => <CarouselItem key={item.id} {...item} />)}
        </Carousel>
      </Categories>
    </>
  );
};

const mapStateToProps = state => {
  return {
    myList: state.myList,
    trends: state.trends,
    originals: state.originals,
    searchResult: state.searchResult,
  };
};
export default connect(mapStateToProps, null)(Home);
