import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import Button from 'Button';

function Contract(props) {
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
            <div className="font-weight-bold pb-3">
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
              <label className="font-weight-bold">
                회원 가입 약관 동의(필수)
              </label>
            </div>
            <textarea
              className="border-2 w-full pb-3"
              rows={5}
              readOnly
            ></textarea>
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
                <label className="font-weight-bold">
                  개인정보 수집 및 이용에 관한 동의 사항(필수)
                </label>
                <br />
                <textarea
                  className="border-2 w-full pb-3"
                  rows={5}
                  readOnly
                ></textarea>
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
            <div className="text-center my-3">
              {all_check && (
                <Button onClick={() => navigate('/accounts/signup/')} disabled>
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

export default Contract;
