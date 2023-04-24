import { DOMID_POP_UP_WINDOW } from '@constants/DOM';
import axios from 'axios';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { TabState } from '@libs/types/infowindow';
import { fireEvent, RecoilObserver, render, screen, waitFor } from '@libs/utils/testUtils';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { RecoilRoot, SetRecoilState } from 'recoil';
import { cafeData } from '../../mocks/domain/cafe/data';
import InfoWindow from '.';

jest.mock('axios');

describe('인포 윈도우는', () => {
  const initializeState = ({ set }: { set: SetRecoilState }) => {
    set(tabStateAtom, { top: popUpHeights[PopUpHeightsType.middle], onHandling: true, popUpState: 'half' } as TabState);
    set(activatedCafeIdAtom, 1);
  };

  it('데이터가 없을 경우 돔에 없어서 조작이 안돼야 하며 로딩을 렌더링 한다..', async () => {
    render(<InfoWindow />);
    expect(screen.queryByTestId(DOMID_POP_UP_WINDOW)).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeInTheDocument();
  });

  it('X 아이콘을 누르면 썸네일 상태가 된다.', async () => {
    const onChange = jest.fn();
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    axios.get = jest.fn();
    mockedAxios.get.mockResolvedValue({ data: cafeData[0] });

    render(
      <RecoilRoot initializeState={initializeState}>
        <RecoilObserver node={tabStateAtom} onChange={onChange} />
        <InfoWindow />
      </RecoilRoot>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('close_button'));
    });

    expect(onChange).toBeCalledTimes(2);
    expect(onChange).lastCalledWith({
      top: popUpHeights[PopUpHeightsType.bottom],
      onHandling: false,
      popUpState: 'invisible',
    });
  });
});
