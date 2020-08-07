import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import ErrorScreen from '../error-screen/error-screen';

type Props = {
  renderPage: () => void;
  className?: string;
  hasFooter?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
};

const Page: React.FC<Props> = (props: Props) => {
  const {
    renderPage,
    className = ``,
    hasFooter = false,
    isLoading = false,
    errorMessage = ``,
  } = props;
  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
      <Header />
      {isLoading && <p>Loading...</p>}
      {!isLoading && errorMessage !== `` && <ErrorScreen message={errorMessage} isNotFound={false} />}
      {!isLoading && errorMessage === `` && renderPage()}
      {hasFooter && <Footer />}
    </div>
  );
};

export default Page;