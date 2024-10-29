export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'isRecorded' : IDL.Func([], [IDL.Bool], ['query']),
    'recordPrincipal' : IDL.Func([], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
