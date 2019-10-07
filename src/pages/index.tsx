import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';

type Props = {
  userAgent?: string;
};

const IndexPage: NextPage<Props> = ({ userAgent }) => (
  <IndexContainer userAgent={userAgent}></IndexContainer>
);

IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default IndexPage;
