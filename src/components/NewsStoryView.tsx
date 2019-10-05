import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

type Props = {
  storyUrl: string;
};

type State = {
  storyTitle: string;
  storyContent: string;
};

const Wrapper = styled.div`
  margin-left: ${props => props.theme.overhaul.newsListWidth + 20}px;
  padding: 20px;

  * {
    max-width: 100%;
  }

  pre {
    white-space: pre-wrap;
  }
`;

export default class NewsList extends React.Component<Props> {
  state: State = {
    storyTitle: '',
    storyContent: '',
  };

  componentDidMount = async () => {
    const { storyUrl } = this.props;
  };

  componentDidUpdate = async (prevProps: Props, prevState: State) => {
    const { storyUrl } = this.props;
    if (storyUrl && prevProps.storyUrl !== storyUrl) {
      try {
        const response = await axios.post('/api/storyContent', {
          url: storyUrl,
        });
        const { title, content } = response.data;
        this.setState({
          storyTitle: title,
          storyContent: content,
        });
      } catch (e) {}
    }
  };

  render() {
    const { storyTitle, storyContent } = this.state;
    const { storyUrl } = this.props;
    return storyContent.length ? (
      <Wrapper>
        <a href={storyUrl} target="_blank">
          View Story in Oringal
        </a>
        <h1>{storyTitle}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: storyContent }}
          style={{}}
        ></div>
      </Wrapper>
    ) : (
      <></>
    );
  }
}
