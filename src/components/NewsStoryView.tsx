import React from 'react';
import axios from 'axios';

type Props = {
  storyUrl: string;
};

type State = {
  storyTitle: string;
  storyContent: string;
};

export default class NewsList extends React.Component<Props> {
  state: State = {
    storyTitle: '',
    storyContent: '',
  };

  componentDidMount = async () => {
    const { storyUrl } = this.props;
  };

  componentDidUpdate = async (prevProps, prevState) => {
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
      <div>
        <a href={storyUrl} target="_blank">
          View Story in Oringal
        </a>
        <h1>{storyTitle}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: storyContent }}
          style={{}}
        ></div>
      </div>
    ) : (
      <></>
    );
  }
}
