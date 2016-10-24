import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
// import { queryArticles } from '../actions/article';
import FirstPageView from '../components/FirstPage/FirstPage';
class FirstPage extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  render () {
    const {articles} = this.props;
    return (
      <div>
        <FirstPageView articles={articles} />
      </div>
    );
  }
}
const mapStateToProps = state => ({articles: state.article.articleList});
export default connect(mapStateToProps)(FirstPage);

