import { forwardRef } from "react";

const Alarm = forwardRef(function (props, ref) {
    return (
        <audio ref={ref}>
            <source src="./alarm.mp3" type="audio/mp3" />
        </audio>
    );
});
export default Alarm;
