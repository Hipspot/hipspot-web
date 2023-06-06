// 플러터에서 실행 가능한 함수 목록 작성
// flutterMessageHandler 파라미터 중 type 값으로 넘어옴

export enum FlutterCallback {
  initFilterling,
  setAuth,
  setMyLocation,
  setNotchHeight,
  setIsWebView,
}

export enum MessageToFlutterType {
  openLoginModal = 'openLoginModal',
  getMyLocation = 'getMyLocation',
  getAuth = 'getAuth',
  getNotchHeight = 'getNotchHeight',
  addFavorite = 'addFavorite',
  removeFavorite = 'removeFavorite',
  getIsWebView = 'getIsWebView',
}
