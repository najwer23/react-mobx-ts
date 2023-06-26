//todo rewrite into typescript

export const Validation = (code: string, parent: ParentNode | null, value: string): boolean => {

	let errorCreated: HTMLParagraphElement = document.createElement("p");
	errorCreated.className = "error";

	let objVR: {
		isError: boolean;
		msg: string;
	} = {
		isError: false,
		msg: "",
	};

	let errorCurrent = parent!.querySelector("." + errorCreated.className) ;

	switch (code) {
		case "emptyString": objVR = testEmptyString(value); break;
		case "titleOfTransaction": objVR = testTitleOfTransaction(value); break;
		case "max2Decimals": objVR = testMax2Decimals(value); break;
		default: {
			// const exhaustiveCheck: never = code;
			// throw new Error(exhaustiveCheck);
		}
	}

	if (objVR.isError) {
		if (errorCurrent) {
			errorCurrent.innerHTML = objVR.msg;
			return false;
		}

		errorCreated.innerHTML = objVR.msg;
		parent!.appendChild(errorCreated);
		return false;
	} else {
		if (errorCurrent) {
			parent!.removeChild(errorCurrent);
		}
	}

	return true;
}

function testMax2Decimals(value: string) {

  if (!/^\d+(\.\d{1,2})?$/.test(value)) {
		return {
			isError: true,
			msg: "Number is inncorect",
		};
	}

  return { isError: false, msg: "" };
}

function testTitleOfTransaction(value: string) {
	let empty = testEmptyString(value);

	if (empty.isError) {
		return empty;
	}

	return (value.length < 5)
		? {
				isError: true,
				msg: "Title should have at least 5 chars",
		  }
		: {
				isError: false,
				msg: "",
		  };

}

function testEmptyString(value: string) {
  return (value === "" || value === null)
    ? {
        isError: true,
        msg: "The field cannot be empty",
      }
    : {
				isError: false,
				msg: ""
			};
}