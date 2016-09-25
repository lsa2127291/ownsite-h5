import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { queryArticles } from '../actions/article';
import NavBar from '../components/Navbar/Navbar';
import FirstPage from '../components/FirstPage/FirstPage';
import '../styles/layout.scss';
class App extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(queryArticles());
  }

  render () {
    const {articles} = this.props;
    return (
      <div>
        <NavBar />
        <FirstPage articles={articles} />
      </div>
    );
  }
}
const mapStateToPros = state => ({articles: state.article.articleList});
export default connect(mapStateToPros)(App);

