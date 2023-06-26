import { InputHTMLAttributes} from "react";
import "./Input.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	innerRef: React.RefObject<HTMLInputElement>;
	type: string;
	onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
}


export const Input = ({id, label, innerRef, type, onBlur}: InputProps): JSX.Element => {

	function handleBlur(e:  React.FocusEvent<HTMLElement>): void {
		if (onBlur !== undefined) {
			onBlur(e);
		}
	}

	return (
		<>
			<div className="input-with-label">
				<label htmlFor={id}> {label}</label>

				<div>
					<input
						onBlur={handleBlur}
						ref={innerRef}
						type={type}
						name={id}
						id={id}
					/>
				</div>

			</div>
		</>
	);
	}