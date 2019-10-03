import React from 'react';
import NewsList from '../components/NewsList';
import NewsStoryView from '../components/NewsStoryView';
import { getAllTopNews, NewsStory } from '../lib/apiClient';

type Props = {
  items?: string[];
  userAgent?: string;
};

type State = {
  newsItems: NewsStory[];
  storyUrlOnView: string;
};

export default class IndexContainer extends React.Component<Props> {
  state: State = {
    newsItems: [],
    storyUrlOnView: null,
  };

  componentDidMount = async () => {
    this.setState({
      newsItems: await getAllTopNews(),
    });
  };

  handleNewsItemClick = (id: string) => {
    this.setState({
      storyUrlOnView: id,
    });
  };

  render() {
    const { userAgent } = this.props;
    const { newsItems, storyUrlOnView } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <NewsList
          items={newsItems}
          onClick={this.handleNewsItemClick}
        ></NewsList>
        <NewsStoryView storyUrl={storyUrlOnView}></NewsStoryView>
      </div>
    );
  }
}
