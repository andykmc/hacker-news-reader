import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';
import { StylesProvider } from '@material-ui/styles';

type Props = {
  userAgent?: string;
};

const IndexPage: NextPage<Props> = ({ userAgent }) => (
  <StylesProvider injectFirst>
    <IndexContainer userAgent={userAgent}></IndexContainer>
  </StylesProvider>
);

IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default IndexPage;
