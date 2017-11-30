export function updateKarma(karma) {
  return {
    type: 'KARMA_UPDATE',
    karma
  };
}

export function updateActions(actions) {
  return {
    type: 'ACTIONS_UPDATE',
    actions
  };
}