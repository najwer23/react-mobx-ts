import { observer } from "mobx-react";

import store from "../store";
import { Input } from "../inputs/Input";
import { useRef } from "react";
import { Button } from "../buttons/Button";
import { Validation } from "../validation/Validation";
import { useEffect } from 'react'

function List(): JSX.Element {
	const inputTitleTran = useRef<HTMLInputElement>(null)
	const inputAmount = useRef<HTMLInputElement>(null)
	const inputEuro = useRef<HTMLInputElement>(null)

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
			store.tranName = inputTitleTran.current!.value;
			store.amount = Number(inputAmount.current!.value);
			store.addNewTran();
			inputTitleTran.current!.value = store.tranName
			inputAmount.current!.value = store.amount === 0 ? "" : String(store.amount);
		}
	}

	function validInput() {
		return Validation("titleOfTransaction", inputTitleTran.current!.parentNode, inputTitleTran.current!.value);
	}

	function validInput2() {
		return Validation("max2Decimals", inputAmount.current!.parentNode, inputAmount.current!.value);
	}

	function handleChangeEuro(e: React.FormEvent<HTMLInputElement>) : void {
		store.setEuro(inputEuro.current!.value);
	}

	return (
		<div style={{maxWidth: "600px"}}>
			<div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
				<div><h1>List Of Expense</h1></div>
				<div style={{display: "flex", alignItems: "center"}}>

					<span>1 EUR =</span>
					<Input
						innerRef={inputEuro}
						id={"euro"}
						type="text"
						value={store.euroInputTxt}
						className={"input-euro"}
						onChange={handleChangeEuro}
					/>
					<span>PLN</span>

				</div>
			</div>


			<form onSubmit={handleSubmit}>
				<Input
					innerRef={inputTitleTran}
					id={"titleOfTransaction"}
					label={"Title of transaction"}
					type="text"
					onBlur={validInput}
				/>


				<div style={{display: "flex", justifyContent: "space-between"}}>
					<Input
						innerRef={inputAmount}
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
							<td>{item.amount.toFixed(2)}</td>
							<td>{store.convertToEuro(item.amount.toFixed(2)).toFixed(2)}</td>
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
				<span>
						Sum: {store.total().toFixed(2)} PLN
					( {store.convertToEuro(store.total().toFixed(2)).toFixed(2)} EUR)</span>
			</div>

		</div>
	);


}

export default observer(List);

