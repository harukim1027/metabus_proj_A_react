import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import Button from 'Button';

import Agreementation from './Agreementation';
import SignupAgreementation from './SignupAgreementation';

function AssignCheck(props) {
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

  return (
    <>
      <main className="" role="main">
        <div className="m-5">
          <h1> 🐼 약관동의</h1>
        </div>
        <div className="ml-5 mr-5">
          <div className="text-center">
            <div className="font-bold pb-3">
              <br />
              아래 약관 및 개인정보 처리방침에 대한 안내를 반드시 읽고,
              동의해주세요.
            </div>
          </div>
          <hr />
          <div className=" pb-3 text-right">
            <label>
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
        </div>
        <div>
          <div className="ml-5 mr-5">
            <div>
              <label className="font-bold mb-2">
                회원 가입 약관 동의 [ 필수 ]
              </label>
            </div>

            <div>
              <SignupAgreementation />
            </div>

            <div className="text-right">
              <label>회원 가입 이용 약관에 동의합니다</label>
              <input
                type="checkbox"
                label="회원 가입 이용약관에 동의합니다."
                checked={contract_check ? 'checked' : null}
                onClick={isFirstCheckBoxClicked}
                required
              />
            </div>
            <hr className="pb-6" />
            <div>
              <div>
                <label className="font-bold">
                  개인정보 수집 및 이용에 관한 동의 사항 [ 필수 ]
                </label>
                <br />
                <div>
                  <Agreementation />
                </div>
              </div>
            </div>
            <div className="text-right pb-5">
              <label>개인정보 수집 및 이용에 동의합니다</label>
              <input
                type="checkbox"
                label="개인정보 수집 및 이용에 동의합니다."
                checked={contract_check ? 'checked' : null}
                onClick={isSecondCheckBoxClicked}
                required
              />
            </div>
            <hr />
            <div className="text-red-300 text-center">
              <br />
              약관 동의를 해야 회원가입을 할 수 있어요 ! 🐰
            </div>
            <div className="text-center my-3">
              {all_check && (
                <Button onClick={() => navigate('/assignment/new/')} disabled>
                  회원가입
                </Button>
              )}
            </div>
            <br />
          </div>
        </div>
      </main>
    </>
  );
}

export default AssignCheck;
