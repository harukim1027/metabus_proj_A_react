const {
  default: IntroduceMain,
} = require('Components/introduce/IntroduceMain');
const { default: TopNav } = require('Components/Main/TopNavi');

function PageIntroduceMain() {
  return (
    <>
      <div>
        <TopNav />
      </div>
      <div>
        <IntroduceMain />
      </div>
    </>
  );
}

export default PageIntroduceMain;
