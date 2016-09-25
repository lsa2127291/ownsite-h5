import React from 'react';
import styles from './FirstPage.scss';
import CSSMoudules from 'react-css-modules';
const FirstPage = (props) => (
  <div styleName="first-page">
    <section>
      <header>最新发布</header>
      {props.articles.map(article =>
        (<article>
          <header>{article.title}</header>
          <p>{article.content}</p>
          <footer>类别：{article.mainType}，来源：{article.origin}，发布于：{article.date}</footer>
        </article>))}
    </section>
  </div>);
export default CSSMoudules(FirstPage, styles);
