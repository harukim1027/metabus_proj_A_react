import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import Button from 'Button';
import '../../App.css';
import './Assignment.css';

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
      <div className="header flex justify-center ">
        <div className="flex flex-wrap max-w-m justify-center rounded pt-6 pb-8 mb-4">
          <div className="accounts_header shadow-md  flex flex-wrap justify-center w-full max-w-m">
            <main className="" role="main">
              <h1 className="mt-5 font-semibold text-2xl text-center p-2">
                {' '}
                🐼 크루 신청하기
              </h1>

              <div className="ml-10 mr-10 ">
                <div className="text-center">
                  <div className="font-bold pb-3">
                    <br />
                    <blockquote class="text-3xl font-semibold italic text-center text-slate-900">
                      <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 relative inline-block">
                        <span class="relative text-white">
                          " 입양 절차, 입양 전 주의사항 "
                        </span>
                      </span>
                      <p className="mt-3 mb-3">
                        {' '}
                        안내를 반드시 읽고, 동의해주세요 !
                      </p>
                    </blockquote>
                  </div>
                </div>
                <hr />
                <br />
                <div className=" pb-3 text-right ">
                  <label className="text-m bg-yellow-100 font-bold">
                    모두 동의합니다{'  '}
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
              <div className="w-full">
                <div className="justify-center">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                    입양 절차
                  </span>

                  <div className="assign_explanation">
                    <img src="/assigncheck.png" alt="dog crew" />
                  </div>

                  <div className="text-right mb-3 mt-8 font-bold">
                    <label>입양 절차를 숙지했습니다 </label>
                    <input
                      type="checkbox"
                      checked={contract_check ? 'checked' : null}
                      onClick={isFirstCheckBoxClicked}
                      required
                    />
                  </div>
                  <hr className="pb-6" />
                  <div>
                    <div>
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                        입양 전 주의 사항
                      </span>
                    </div>

                    <div className="assign_explanation2">
                      <img src="/list.png" alt="dog crew" />
                    </div>
                  </div>
                  <div className="text-right pb-5 font-bold">
                    <label>입양 전 주의사항을 숙지했습니다 </label>
                    <input
                      type="checkbox"
                      checked={contract_check ? 'checked' : null}
                      onClick={isSecondCheckBoxClicked}
                      required
                    />
                  </div>
                  <hr />
                  <div className="text-xl text-red-400 text-center">
                    <br />
                    동의를 해야 입양 신청을 할 수 있어요 ! 🐰
                  </div>
                  <div className="text-center my-3">
                    {all_check && (
                      <Button
                        onClick={() => navigate('/assignment/new/')}
                        disabled
                      >
                        신청하기
                      </Button>
                    )}
                  </div>
                  <br />
                </div>
              </div>
            </main>
          </div>
          <p className="mt-3 text-center text-gray-500 text-xs">
            &copy;2022 METABUS Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default AssignCheck;
