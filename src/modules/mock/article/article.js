import fetchMock from 'fetch-mock';
import {HOST} from '../../common/constants';
if (!process.env.NOT_MOCK) {
  fetchMock.mock(HOST + '/article/list', {
    body: {
      data: {
        articles: [
          {
            id: '0',
            title: '我对闭包的看法',
            quote: '很多东西都无法简单的解释，包括这个闭包的理解',
            date: '2016.9.18',
            mainType: 'javascript'
          },
          {
            id: '1',
            title: '我对css的看法',
            quote: '很多东西都无法简单的解释，包括这个闭包的理解',
            date: '2016.9.18',
            mainType: 'css'},
          {
            id: '2',
            title: '我对dd的看法',
            quote: '很多东西都无法简单的解释，包括这个闭包的理解',
            date: '2016.9.18',
            mainType: 'javascript'
          }]
      }
    }
  });
}
