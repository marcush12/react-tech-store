import React from 'react';
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';

export default function Info() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <img src={aboutBcg} className="img-fluid img-thumbnail" alt="about cia" style={{background:'var(--darkGrey)'}}/>
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
            <Title title="sobre nós"/>
            <p className="text-lead text-muted my-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor dolores ipsum officia dignissimos mollitia quaerat quia nesciunt, beatae fugiat asperiores.</p>
            <p className="text-lead text-muted my-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor dolores ipsum officia dignissimos mollitia quaerat quia nesciunt, beatae fugiat asperiores.</p>
            <button type="button" style={{marginTop:"2rem"}} className="main-link">mais</button>
          </div>
        </div>
      </div> 
    </section>
  );
}
