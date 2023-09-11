import { memo } from "react";
import "./Switch.css";

interface SwitchProps {
  onLabel?: string;
  offLabel?: string;
  onChange?: (state: boolean) => void;
}

const defaultOnLabel = 'ON';
const defaultOffLabel = 'OFF';

const Switch = memo((props: SwitchProps) => {
  const { onChange } = props;
  const onLabel = props.onLabel || defaultOnLabel;
  const offLabel = props.offLabel || defaultOffLabel;

  const generateId = () => {
    const clean = (text: string) => text.replace(/[^a-zA-Z0-9]/, "");
    return `switch_${clean(onLabel)}_${clean(offLabel)}`;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(onChange) {
      onChange(e.target.checked);
    }
  }

  const switchId = generateId();

  return (
    <div>
      <input className="switch switch-skewed" id={switchId} type="checkbox" onChange={handleOnChange}/>
      <label className="switch-btn" data-switch-off={offLabel || defaultOffLabel} data-switch-on={onLabel || defaultOnLabel} htmlFor={switchId} />
    </div>
  )
});

export default Switch;
