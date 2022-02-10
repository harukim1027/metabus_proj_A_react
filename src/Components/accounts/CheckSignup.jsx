import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'Button';

function Contract(props) {
  let [all_check, set_all_check] = useState(false);
  let [contract_check, set_contract_check] = useState(false);
  let [individual_check, set_individual_check] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    set_contract_check(all_check);
    set_individual_check(all_check);
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
              <label className="font-weight-bold">회원가입약관</label>
              <textarea
                className="border-2 w-full pb-3"
                rows={5}
                readOnly
              ></textarea>
            </div>
            <div className="text-right">
              <input
                type="checkbox"
                label="개인정보 수집 및 이용에 동의합니다."
                checked={contract_check ? 'checked' : null}
                onClick={() => {
                  set_individual_check(individual_check);
                }}
              />
            </div>
            <hr className="pb-6" />
            <div>
              <div>
                <label className="font-weight-bold">
                  개인정보 수집 및 이용에 관한 동의 사항 (필수사항)
                </label>
                <br />
                <textarea
                  className="border-2 w-full pb-3"
                  rows={5}
                  readOnly
                ></textarea>
              </div>
              <hr />
            </div>
            <div className="text-right mb-5">
              <input
                type="checkbox"
                label="개인정보 수집 및 이용에 동의합니다."
                checked={contract_check ? 'checked' : null}
                onClick={() => {
                  set_individual_check(!individual_check);
                }}
              />
            </div>
            <div className="text-center">
              {all_check && (
                <Button onClick={() => navigate('/accounts/signup/')}>
                  회원가입
                </Button>
              )}
            </div>
            {/* <div className="text-center">
              {individual_check && (
                <Button onClick={() => navigate('/accounts/signup/')}>
                  회원가입
                </Button>
              )}
            </div> */}
            <br />
          </div>
        </div>
      </main>
    </>
  );
}

export default Contract;
