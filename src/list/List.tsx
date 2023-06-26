import { observer } from "mobx-react";

import store from "../store";
import { Input } from "../inputs/Input";
import { useRef } from "react";
import { Button } from "../buttons/Button";
import { Validation } from "../validation/Validation";
import { useEffect } from 'react'

function List(): JSX.Element {
	const input = useRef<HTMLInputElement>(null)
	const input2 = useRef<HTMLInputElement>(null)

	useEffect(() => {
		store.loadCurrency();
	}, []);

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>): void {
		e.preventDefault()

		let valid = [
			validInput(),
			validInput2()
		].filter((v) => !v);

		if (valid.length === 0) {
			store.tranName = input.current!.value;
			store.tranValuePLN = Number(input2.current!.value);
			store.addNewTran();
			input.current!.value = store.tranName
			input2.current!.value = store.tranValuePLN === 0 ? "" : String(store.tranValuePLN);
		}
	}

	function validInput() {
		return Validation("titleOfTransaction", input.current!.parentNode, input.current!.value);
	}

	function validInput2() {
		return Validation("max2Decimals", input2.current!.parentNode, input2.current!.value);
	}

	return (
		<div style={{maxWidth: "600px"}}>
			<div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
				<div><h1>List Of Expense</h1></div>
				<div><p>1 EUR = {store.euro} PLN</p></div>
			</div>


			<form onSubmit={handleSubmit}>
				<Input
					innerRef={input}
					id={"titleOfTransaction"}
					label={"Title of transaction"}
					type="text"
					onBlur={validInput}
				/>


				<div style={{display: "flex", justifyContent: "space-between"}}>
					<Input
						innerRef={input2}
						id={"amount"}
						label={"Amount (in PLN)"}
						type="text"
						onBlur={validInput2}
					/>

					<Button
						type={"submit"}
						className={'noselect buttonAdd'}
						title={"Add"}
						ariaLabel={"Add"}
						text={"Add"}
					/>
				</div>

			</form>


			<div style={{marginTop: "20px", marginBottom: "20px"}}>

				<table style={{width: "100%", textAlign: "left"}}>
					<thead>
						<tr>
							<th>Title</th>
							<th>Amount PLN</th>
							<th>Amount EUR</th>
							<th>Options</th>
						</tr>
					</thead>

				<tbody>
				{store.transactions && store.transactions.map((item)=> {
					return (
						<tr key={item.id}>
							<td>{item.tran}</td>
							<td>{item.tranValuePLN.toFixed(2)}</td>
							<td>{item.tranValueEUR.toFixed(2)}</td>
							<td>
								<Button
									onClick={() => { store.removeTran(item.id) }}
									type={"button"}
									className={'noselect'}
									title={"DEL"}
									ariaLabel={"DEL"}
									text={"DEL"}
								/>
							</td>
						</tr>
					)
				})}
				</tbody>

				</table>

			</div>

			<div>
				<span>Sum: {store.sumPLN.toFixed(2)} PLN ({store.sumEUR.toFixed(2)})</span>
			</div>

		</div>
	);


}

export default observer(List);

