import React from 'react';
import NewsList from '../components/NewsList';
import { getAllTopNews, NewsStory } from '../lib/apiClient';

type Props = {
  items?: string[];
  userAgent?: string;
};

type State = {
  newsItems: NewsStory[];
};

export default class IndexContainer extends React.Component<Props> {
  state: State = {
    newsItems: [],
  };

  componentDidMount = async () => {
    this.setState({
      newsItems: await getAllTopNews(),
    });
  };

  render() {
    const { userAgent } = this.props;
    const { newsItems } = this.state;
    return (
      <>
        <strong>{userAgent}</strong>
        <NewsList items={newsItems}></NewsList>
      </>
    );
  }
}
