function DebugStates(props) {
  return (
    <div>
      <pre className="bg-blue-100 hover:bg-blue-400 text-xs  p-1 border border-gray-400 overflow-x-scroll h-40">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default DebugStates;
