import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';
import { LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

type Props = {};

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

const NewsView: React.FC<Props> = () => {
  const isSmDown = useScreenSize.isSmallOrDown();
  const id = useSelector((state: AppState) => state.newsInView.id);
  const newsUrl = useSelector((state: AppState) => state.newsInView.newsUrl);
  const title = useSelector((state: AppState) => state.newsInView.title);
  const content = useSelector((state: AppState) => state.newsInView.content);
  const isLoading = useSelector(
    (state: AppState) => state.newsInView.isLoading
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, [id]);

  return (
    <Wrapper isSmDown={isSmDown}>
      <ProgressWrapper hidden={!isLoading} />
      {content.length ? (
        <>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer">
            View News in Oringal
          </a>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} style={{}} />
        </>
      ) : null}
    </Wrapper>
  );
};

export default NewsView;
