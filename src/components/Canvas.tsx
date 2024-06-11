import {CanvasHTMLAttributes, FC, MutableRefObject} from 'react';


type Canvas = {
    forwardRef: MutableRefObject<HTMLCanvasElement>;
} & CanvasHTMLAttributes<HTMLCanvasElement>;


const Canvas: FC<Canvas> = ( {forwardRef ,...props}) => {
    return (
        <canvas ref={forwardRef} {...props}></canvas>
    );
};

export default Canvas;