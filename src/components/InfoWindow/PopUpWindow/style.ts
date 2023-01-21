import styled from '@emotion/styled';

const BOTTOM_BAR_SIZE = '30px';

export const Layout = styled.div`
	position: fixed;
	min-width: 300px;
	max-width: 600px;
	height: ${(props: { tabState: { popUpState: string } }) =>
		props.tabState.popUpState === 'full' && `calc(100% + ${BOTTOM_BAR_SIZE})`};
	box-sizing: border-box;
	transform: translateX(calc(50vw - 50%));
	top: calc(100% - ${BOTTOM_BAR_SIZE});
	width: 100%;
	z-index: 11;
`;

export const Wrapper = styled.div`
	position: relative;
	background-color: transparent;
	width: 100%;
	height: 100%;
	/* padding: 40px 0px 120px 0px; */
	box-sizing: border-box;
	border-radius: 4px 4px 0px 0px;
	border: 1px solid;
	border-color: #cecacb;
	overflow: scroll;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	//scrollbar 없애는 속성
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

export const ResizeSide = styled.div`
	position: absolute;
	z-index: 0;
	top: 0;
	width: 100%;
	height: ${(props: { tabState: { popUpState: string } }) => (props.tabState.popUpState === 'half' ? 500 : 120)}px;
	transform: translateY(-50%);
	transform: ${(props: { tabState: { popUpState: string } }) =>
		props.tabState.popUpState === 'half' && `translateY(0px)`};
	&:hover {
		cursor: row-resize;
	}
`;

export const ResizeSideStyle = styled.div`
	position: absolute;
	top: 0px;
	height: 30px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid;
	border-color: #e9e7e7;
	border-radius: 4px;
	background-color: white;
`;
