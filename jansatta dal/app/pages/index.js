/** @jsx jsx */
import { jsx } from '@emotion/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Navbar from './Navbar'
import Hero from './Hero'
import Main from './Main'



export default () => {

  const { data, loading, error } = useQuery(gql`
  query {
    allMartyrs{
      name
      key
    }
  } 
`)

  console.log(data);
  return (
    <>
      <Navbar />
      <div className='container'>
        <Hero />
        <Main />
      </div>
    </>
  );

}
