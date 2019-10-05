import React from 'react';
import NewsList from '../components/NewsList';
import NewsStoryView from '../components/NewsStoryView';
import { getAllTopNews, NewsStory } from '../lib/apiClient';
import styled from 'styled-components';

type Props = {
  items?: string[];
  userAgent?: string;
};

type State = {
  newsItems: NewsStory[];
  storyUrlOnView: string;
};

const IndexWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  max-width: 1200px;
  margin: 0 auto;
`;

export default class IndexContainer extends React.Component<Props> {
  state: State = {
    newsItems: [],
    storyUrlOnView: '',
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
      <IndexWrapper>
        <NewsList
          items={newsItems}
          onClick={this.handleNewsItemClick}
        ></NewsList>
        <NewsStoryView storyUrl={storyUrlOnView}></NewsStoryView>
      </IndexWrapper>
    );
  }
}
