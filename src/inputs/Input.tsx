import { InputHTMLAttributes} from "react";
import "./Input.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	innerRef: React.RefObject<HTMLInputElement>;
	type: string;
	className?: string;
	onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
	onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
	value?: any;
	defaultValue?: any;
}


export const Input = ({
	id, label, innerRef, type, onBlur, className, value, onChange, defaultValue }: InputProps): JSX.Element => {

	function handleBlur(e:  React.FocusEvent<HTMLElement>): void {
		if (onBlur !== undefined) {
			onBlur(e);
		}
	}

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (onChange !== undefined) {
			onChange(e);
		}
	}

	return (
		<>
			<div className="input-with-label">
				{label && (<label htmlFor={id}> {label}</label>)}

				<div>
					<input
						onBlur={handleBlur}
						onChange={handleChange}
						ref={innerRef}
						type={type}
						name={id}
						id={id}
						className={className}
						defaultValue={defaultValue}
						value={value}
					/>
				</div>

			</div>
		</>
	);
	}