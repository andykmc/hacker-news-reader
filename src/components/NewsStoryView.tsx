import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';

type Props = {
  storyUrl?: string;
};

type ProgressWrapperProps = {
  hidden: boolean;
};

const ProgressWrapper = styled(LinearProgress)<ProgressWrapperProps>`
  display: ${props => (props.hidden ? 'none' : 'block')};
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1200;
`;

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: initial;
  }

  p {
    font-size: ${props => (props.isSmDown ? 18 : 20) + 'px'};
  }
`;

const NewsList: React.FC<Props> = ({ storyUrl }) => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isSmDown = useScreenSize.isSmallOrDown();

  const displayStory = (title: string, content: string) => {
    setStoryTitle(title);
    setStoryContent(content);
    scrollTo(0, 0);
  };

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('/api/storyContent', {
          url: storyUrl,
        });
        if (!ignore) {
          setIsLoading(false);
          const { title, content } = response.data;
          displayStory(title, content);
        }
      } catch (e) {
        setIsLoading(false);
      }
    };

    fetch();
    return () => {
      ignore = true;
    };
  }, [storyUrl]);

  return (
    <Wrapper isSmDown={isSmDown}>
      <ProgressWrapper hidden={!isLoading} />
      {storyContent.length ? (
        <>
          <a href={storyUrl} target="_blank" rel="noopener noreferrer">
            View Story in Oringal
          </a>
          <h1>{storyTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: storyContent }} style={{}} />
        </>
      ) : null}
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => {
  const { id, storyUrl } = state.storyInView || {};
  return { storyUrl };
};

export default connect(mapStateToProps)(NewsList);
