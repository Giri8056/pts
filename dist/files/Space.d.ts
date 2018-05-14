import { Bound } from "./Bound";
import { Pt, IPt } from "./Pt";
import { Form } from "./Form";
export declare type AnimateFunction = (time?: number, frameTime?: number, currentSpace?: any) => void;
export interface IPlayer {
    animateID?: string;
    animate?: AnimateFunction;
    resize?(size: IPt, evt?: Event): undefined;
    action?(type: string, px: number, py: number, evt: Event): any;
    start?(bound: Bound, space: Space): any;
}
export interface ISpacePlayers {
    [key: string]: IPlayer;
}
export interface ITimer {
    prev: number;
    diff: number;
    end: number;
}
export declare abstract class Space {
    id: string;
    protected bound: Bound;
    protected _time: ITimer;
    protected players: ISpacePlayers;
    protected playerCount: number;
    protected _ctx: any;
    private _animID;
    private _pause;
    private _refresh;
    private _renderFunc;
    protected _pointer: Pt;
    protected _isReady: boolean;
    protected _playing: boolean;
    refresh(b: boolean): this;
    add(p: IPlayer | AnimateFunction): this;
    remove(player: IPlayer): this;
    removeAll(): this;
    play(time?: number): this;
    replay(): void;
    protected playItems(time: number): void;
    pause(toggle?: boolean): this;
    resume(): this;
    stop(t?: number): this;
    playOnce(duration?: number): this;
    protected render(context: any): this;
    customRendering: (context: any, self: Space) => null;
    readonly isPlaying: boolean;
    readonly outerBound: Bound;
    readonly innerBound: Bound;
    readonly size: Pt;
    readonly center: Pt;
    readonly width: number;
    readonly height: number;
    abstract resize(b: IPt, evt?: Event): this;
    abstract clear(): this;
    abstract getForm(): Form;
}
export declare type TouchPointsKey = "touches" | "changedTouches" | "targetTouches";
export interface MultiTouchElement {
    addEventListener(evt: any, callback: Function): any;
    removeEventListener(evt: any, callback: Function): any;
}
export declare abstract class MultiTouchSpace extends Space {
    protected _pressed: boolean;
    protected _dragged: boolean;
    protected _hasMouse: boolean;
    protected _hasTouch: boolean;
    protected _canvas: EventTarget;
    readonly pointer: Pt;
    bindCanvas(evt: string, callback: EventListener): void;
    unbindCanvas(evt: string, callback: EventListener): void;
    bindMouse(_bind?: boolean): this;
    bindTouch(_bind?: boolean): this;
    touchesToPoints(evt: TouchEvent, which?: TouchPointsKey): Pt[];
    protected _mouseAction(type: string, evt: MouseEvent | TouchEvent): void;
    protected _mouseDown(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseUp(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseMove(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseOver(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseOut(evt: MouseEvent | TouchEvent): boolean;
    protected _touchMove(evt: TouchEvent): boolean;
}
