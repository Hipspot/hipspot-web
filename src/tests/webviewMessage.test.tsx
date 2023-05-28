/* eslint-disable no-console */
/*
import { RecoilObserver, render, waitFor } from '@libs/utils/testUtils';
import { authAtom } from '@states/auth';
import App from 'Main';
import { RecoilRoot } from 'recoil';

describe('웹뷰에서', () => {
  it('setAuth 메세지를 수신하면 상태를 업데이트한다.', async () => {
    const onChange = jest.fn();
    render(
      <RecoilRoot>
        <RecoilObserver node={authAtom} onChange={onChange} />
        <App />
      </RecoilRoot>
    );

    await waitFor(() => {
      window.flutterChannel({ type: 'setAuth', data: JSON.stringify({ isAuth: true }) });
    });

    expect(onChange).lastCalledWith({
      isAuth: true,
    });
  });

  it('잘못된 메세지 제목을 수신하면 에러를 출력한다.', async () => {
    console.error = jest.fn();
    render(<App />);

    await waitFor(() => {
      window.flutterChannel({ type: 'asd', data: null });
    });

    expect(console.error).toBeCalled();
  });

  it('잘못된 메세지 내용을 수신하면 에러를 출력한다.', async () => {
    console.error = jest.fn();
    render(<App />);

    await waitFor(() => {
      window.flutterChannel({ type: 'setAuth', data: null });
    });

    expect(console.error).toBeCalled();
  });
});
*/
