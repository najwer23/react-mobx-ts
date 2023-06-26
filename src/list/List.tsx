import { observer } from "mobx-react";

import store from "../store";
import { Input } from "../inputs/Input";
import { useRef } from "react";
import { Button } from "../buttons/Button";


function List() {
    const input = useRef<HTMLInputElement>(null)


    return (
        <>
            <div>List Of Expense</div>
            <div>1 EUR = 4.382</div>

            <Input
                innerRef={input}
                id={"titleOfTransaction"}
                label={"Title of transaction"}
                type="text"
            />

            <Input
                innerRef={input}
                id={"amount"}
                label={"Amount (in PLN)"}
                type="text"
            />

            <Button
                type={"submit"}
                className={'noselect'}
                title={"Send"}
                ariaLabel={"Send"}
                text={"Send"}
            />


            <div>
                <div style={{display: "flex", gap: "40px"}}>
                    <span>Title</span>
                    <span>Amount PLN</span>
                    <span>Amount EUR</span>
                    <span>Options</span>
                </div>
                <div style={{display: "flex", gap: "40px"}}>
                    <span>1</span>
                    <span>999</span>
                    <span>88</span>
                    <span>Del</span>
                </div>
            </div>
        </>
    );


}

export default observer(List);