export type PopUpWindowState = 'thumbNail' | 'half' | 'full';

export interface TabState {
	onHandling: boolean;
	top: number;
	popUpState: PopUpWindowState;
}

export interface CoordState {
	startX: number;
	startY: number;
}
