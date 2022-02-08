import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
  static getDerivedStateFromError(error) {
    return { error };
  }

  // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen items-center">
          <div className="w-80 mx-auto bg-red-100 rounded h-40 p-3">
            <h1 className="text-xl font-extrabold text-red-500 mt-1 mb-2">
              Something went wrong.
            </h1>
            {this.state.error.toString()}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
