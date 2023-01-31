import { ClockIcon, CopyIcon, MarkerIcon, PhoneIcon } from '@assets/index';
import styled from '@emotion/styled';
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
  return (
    <>
      {InfoList.map(({ title, icon, description }, i) => (
        <Wrapper key={`${title} ${+i}`}>
          <Icon>{icon}</Icon>
          <Contents>
            <Title>{title}</Title>

            {description && <Description>{description}</Description>}
          </Contents>
          {title === address && <CopyIcon />}
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
      {InfoList.map(({ icon }) => (
        <Wrapper>
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

const Icon = styled.div``;

const Contents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.h2`
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #181818;
`;

const Description = styled.div`
  font-family: 'Pretendard';
  line-height: 24px;
  color: #868686;
`;
