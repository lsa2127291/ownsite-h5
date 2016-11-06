import React from 'react';
import styles from './FirstPage.scss';
import CSSMoudules from 'react-css-modules';
const FirstPage = (props) => (
  <div styleName="first-page">
    <section>
      <header>最新发布</header>
      {props.articles.map(article =>
        (<article key={article.id}>
          <header>{article.title}</header>
          <p>{article.quote}</p>
          <footer>类别：{article.mainType}，发布于：{article.date}</footer>
        </article>))}
    </section>
  </div>);
export default CSSMoudules(FirstPage, styles);
