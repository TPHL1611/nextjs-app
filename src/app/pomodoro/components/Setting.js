import React from "react";

const Setting = React.forwardRef((props, ref) => {
    return (
        <div className="flex w-full md:flex-col md:w-auto items-center">
            <label
                htmlFor={props.inputID}
                className="text-sm font-mt-semibold text-black min-w-fit mr-7">
                {props.label}
            </label>
            <input
                id={props.inputID}
                type="number"
                className="w-full text-center border border-slate-950 rounded-[5px] mt-1 py-[5px] px-3"
                ref={ref}
                min="0"
                value={props.valueTime}
                onChange={(e) => props.setValueTime(e.target.value)}
            />
        </div>
    );
});

Setting.displayName = "Setting";
export default Setting;
