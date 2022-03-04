import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import Button from 'Button';

import Agreementation from './Agreementation';
import SignupAgreementation from './SignupAgreementation';
import '../../App.css';
import './accounts.css';

function CheckSignup(props) {
  let [all_check, set_all_check] = useState(false);
  let [contract_check, set_contract_check] = useState(false);

  // 1번 체크박스
  const [firstCheckBoxActive, setFirstCheckBoxActive] = useState(false);
  const isFirstCheckBoxClicked = () => {
    setFirstCheckBoxActive(!firstCheckBoxActive);
  };

  // 2번 체크박스
  const [secondCheckBoxActive, setSecondCheckBoxActive] = useState(false);
  const isSecondCheckBoxClicked = () => {
    setSecondCheckBoxActive(!secondCheckBoxActive);
  };

  // checkbox의 체크 상태를 확인할 수 있는 checked
  // checked = true (체크 O) / checked = false (체크 x)

  const navigate = useNavigate();

  useEffect(() => {
    set_contract_check(all_check);
  }, [all_check]);

  useEffect(() => {
    if (firstCheckBoxActive && secondCheckBoxActive) {
      set_all_check(true);
    } else set_all_check(false);
  }, [firstCheckBoxActive, secondCheckBoxActive]);

  useEffect(() => {
    setFirstCheckBoxActive(all_check);
    setSecondCheckBoxActive(all_check);
  }, [all_check]);

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  // console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, []);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [topLocation]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="mx-5 accounts_header rounded-xl shadow-md overflow-hidden sm:px-20 pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <main className="" role="main">
            <h1 className="mt-5 font-semibold text-2xl text-center p-2">
              🐼 약관동의
            </h1>

            <div className="flex justify-center text-center">
              <div className="px-4 py-5 xs:w-full sm:w-2/3">
                <br />
                <blockquote class="font-semibold italic text-center text-slate-900">
                  <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                    <span class="xl:text-4xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl relative text-white">
                      " 약관 및 개인정보 처리방침 "
                    </span>
                  </span>
                  <p className="xl:text-4xl lg:text-2xl md:text-xl sm:text-xl xs:text-xl mt-3 mb-3">
                    안내를 반드시 읽고, 동의해주세요 !
                  </p>
                </blockquote>
              </div>

              <hr />
              <br />
            </div>
            <div className="w-full">
              <div className="xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm sm:mt-0 sm:col-span-2">
                <div className="mx-5">
                  <p className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 font-bold mb-2">
                    회원 가입 약관 동의 [ 필수 ]
                  </p>

                  <SignupAgreementation />

                  <div className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm sm:mt-0 sm:col-span-2 text-right pb-5 font-bold text-gray-700">
                    <label>회원 가입 이용 약관에 동의합니다 </label>
                    <input
                      type="checkbox"
                      label="회원 가입 이용약관에 동의합니다."
                      checked={contract_check ? 'checked' : null}
                      onClick={isFirstCheckBoxClicked}
                      required
                    />
                  </div>
                </div>
                <hr className="pb-6" />
                <div className="mx-5">
                  <p className="xl:text-xl lg:text-xl md:text-base sm:text-sm xs:text-sm after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 font-bold mb-2">
                    개인정보 수집 및 이용에 관한 동의 사항 [ 필수 ]
                  </p>
                  <Agreementation />

                  <div className="xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm sm:mt-0 sm:col-span-2 text-right pb-5 font-bold text-gray-700">
                    <label>개인정보 수집 및 이용에 동의합니다 </label>
                    <input
                      type="checkbox"
                      label="개인정보 수집 및 이용에 동의합니다."
                      checked={contract_check ? 'checked' : null}
                      onClick={isSecondCheckBoxClicked}
                      required
                    />
                  </div>
                </div>
                <div className="mx-5 pb-3 text-right ">
                  <label className="xl:text-xl lg:text-xl md:text-base sm:text-base xs:text-sm sm:mt-0 sm:col-span-2 bg-yellow-100 font-bold">
                    모두 동의합니다
                    <input
                      checked={all_check ? 'checked' : null}
                      type="checkbox"
                      onClick={() => {
                        set_all_check(!all_check);
                      }}
                    />
                  </label>
                </div>
                <hr />
                <div className="xl:text-3xl lg:text-2xl md:text-xl sm:text-xl xs:text-base sm:mt-0 sm:col-span-2 text-red-400 text-center">
                  <br />
                  약관 동의를 해야 회원가입을 할 수 있어요 ! 🐰
                </div>
                <div className="text-center my-3">
                  {all_check && (
                    <Button
                      onClick={() => navigate('/accounts/signup/')}
                      disabled
                    >
                      회원가입
                    </Button>
                  )}
                </div>
                <br />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CheckSignup;
