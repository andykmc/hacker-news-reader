import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';

type Props = {
  storyUrl: string;
};

type State = {
  storyTitle: string;
  storyContent: string;
};

type WrapperProps = {
  isSmDown: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  margin-left: ${props =>
    props.isSmDown
      ? 'initial'
      : props.theme.overhaul.newsListWidth + 20 + 'px'};
  padding: 20px;
  text-align: justify;

  * {
    max-width: 100%;
  }

  img {
    display: block;
    margin: 32px auto;
    height: auto;
  }

  pre {
    white-space: pre-wrap;
  }
`;

const NewsList: React.FunctionComponent<Props> = ({ storyUrl }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const isSmDown = useScreenSize.isSmallOrDown();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post('/api/storyContent', {
          url: storyUrl,
        });
        const { title, content } = response.data;
        changeStory(title, content);
      } catch (e) {}
    };
    fetch();
  }, [storyUrl]);

  const changeStory = (title: string, content: string) => {
    setStoryTitle(title);
    setStoryContent(content);
    scrollTo(0, 0);
  };

  return storyContent.length ? (
    <Wrapper isSmDown={isSmDown}>
      <a href={storyUrl} target="_blank">
        View Story in Oringal
      </a>
      <h1>{storyTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: storyContent }} style={{}}></div>
    </Wrapper>
  ) : (
    <></>
  );
};

export default NewsList;
