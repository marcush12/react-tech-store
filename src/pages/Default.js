import React from 'react';
import Hero from '../components/Hero';
import defaultBcg from '../images/defaultBcg.jpeg';
import {Link} from 'react-router-dom';

export default function DefaultPage() {
  return (
    <>
      <Hero img={defaultBcg} title="404" max="true">
        <h2 className="text-uppercase">página não encontrada</h2>
        <Link to="/" className="main-link" style={{marginTop:"2rem"}}>voltar para Homepage</Link>
      </Hero>

    </>
  )
}
