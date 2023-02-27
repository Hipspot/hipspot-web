import { ClockIcon, CopyIcon, MarkerIcon, PhoneIcon } from '@assets/index';
import styled from '@emotion/styled';
import { copyToClipboard } from '@libs/utils/cafeInfo';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

interface InformationProps {
  businessDay: string[];
  businessTime: string | null;
  address: string;
  contactNum: string;
}

function Information({ businessDay, businessTime, address, contactNum }: InformationProps) {
  const InfoList = [
    {
      title: '영업시간',
      icon: <ClockIcon />,
      description: `${businessDay.join(', ')} ${businessTime || ''}`,
    },
    { title: address, icon: <MarkerIcon /> },
    { title: contactNum, icon: <PhoneIcon /> },
  ];

  const handleCopyText = (message: string, text: string) => {
    toast.success(message);
    copyToClipboard(text);
  };
  return (
    <>
      {InfoList.map(({ title, icon, description }, i) => (
        <Wrapper key={`${title}_${+i}`}>
          <Icon>{icon}</Icon>
          <Contents>
            <Title>{title}</Title>

            {description && <Description>{description}</Description>}
          </Contents>
          {title === address && <CopyIcon onClick={() => handleCopyText('주소가 복사되었습니다.', address)} />}
        </Wrapper>
      ))}
    </>
  );
}
export default Information;

export function InformationSkeleton() {
  const InfoList = [
    {
      icon: <ClockIcon />,
    },
    { icon: <MarkerIcon /> },
    { icon: <PhoneIcon /> },
  ];
  return (
    <>
      {InfoList.map(({ icon }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Wrapper key={`info_skeleton_ ${i}`}>
          <Icon>{icon}</Icon>
          <Contents>
            <Title>
              <Skeleton />
            </Title>
          </Contents>
          <Description>
            <Skeleton />
          </Description>
        </Wrapper>
      ))}
    </>
  );
}

// export const InformationSkeleton = styled.div`
//   display: flex;
//   padding: 24px 0px;
//   gap: 12px;
//   border-bottom: solid #efefef 1px;
//   background-color: gray;
// `;

export const Wrapper = styled.div`
  display: flex;
  padding: 24px 0px;
  gap: 12px;
  border-bottom: solid #efefef 1px;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
`;

const Contents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #181818;
`;

export const Description = styled.div`
  color: #868686;
`;
