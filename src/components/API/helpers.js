import { trackPromise } from "react-promise-tracker";
import * as cstConstants from "../../utils/constants/constants.js";

export async function getApiCall(dataSource) {
	var fetchOptions = {
		method: "GET", 
		mode: "cors", 
		credentials: "include"
	}

	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}?countOnly=false`,fetchOptions)
		.then(response => {
			if (response.status == 401 ) {
				// unauthorized navigate Tririga login page for authentication
			/* 	var redirect = window.location.href;
				redirect = redirect.replaceAll('/', '%2F');
				redirect = redirect.replaceAll(':', '%3A');
				redirect = cstConstants.REACT_APP_TRIRIGA_URL+'/p/websignon?redirectUrl='+redirect;
				window.location.href=redirect; */
				// SessionTimeout.prototype.handleOpen()

				/* var sessionOut = {
					value:"Session Out"
				} */
				let sessionOut = "Session Out";
				cstConstants.setSessionOut(sessionOut)
				// return sessionOut;
				return {data:{}};
			}
			// return in json format
			return response.json();
		},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
}

export async function getRecordApiCall(dataSource,recordId,childDs,childDsData) {
	let url = null;
	if (childDsData == undefined) {
		if (childDs !== undefined) {
			url = `${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}?countOnly=false`;
		} else {
			url = `${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}?countOnly=false`;
		}
	} else {
		if (childDsData.specId !== undefined && childDsData.dsName == undefined) {
			url = `${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}/${childDsData.specId}?countOnly=false`;
		} else {
			url = `${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}/${childDsData.specId}/${childDsData.dsName}?countOnly=false`;
		}
	}

	var fetchOptions = {
		method: "GET", 
		mode: "cors", 
		credentials: "include"
	}

	return trackPromise(fetch(url, fetchOptions)
		.then(function (response) {
			// check if the request is authorized
			if (response.status == 401) {
				// unauthorized navigate Tririga login page for authentication
				/* var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
				window.open(url, "_self"); */

				/* var sessionOut = {
					value:"Session Out"
				}
				return sessionOut; */
				let sessionOut = "Session Out";
				cstConstants.setSessionOut(sessionOut)
				return {data:{}};
			}
			// get current user data from the response
			return response.json();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
	
}

export async function postApiCall(dataSource, data, recordId, childDs, actionGroup, action) {
	var fetchOptions = {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ data: data }),
	};
	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}?actionGroup=${actionGroup}&action=${action}&refresh=true`, fetchOptions)
		.then(function (response) {
				// check if the request is authorized
				if (response.status == 401) {
					// unauthorized navigate Tririga login page for authentication
					var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
					window.open(url, "_self");
				}

				// get current user data from the response
				return response.json();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	); 
}

export async function performAction(dataSource, data, recordId, actionGroup, action, wfParam) {
	var parameterData = {}
	if(data && wfParam){
		parameterData={
			data :data,
			wfParametersMap:wfParam 
		}
	}
	else{
		parameterData={
			data :data
		}
	}

	var fetchOptions = {
		credentials: "include",
		method: "PUT",
		headers: { 
			"Content-Type": "application/json" 
		},
		body: JSON.stringify(parameterData),
	};

	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}?actionGroup=${actionGroup}&action=${action}&refresh=true&method=update`, fetchOptions)
		.then(function (response) {
				// check if the request is authorized
				if (response.status == 401) {
					// unauthorized navigate Tririga login page for authentication
					var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
					window.open(url, "_self");
				}

				// get current user data from the response
				return response.json();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
}

export async function performActionChildWF(dataSource, data, recordId, childDs, actionGroup, action, wfParam) {
	var parameterData = {}
	if(data && wfParam){
		parameterData={
			data :data,
			wfParametersMap:wfParam 
		}
	}else{
		parameterData={
			data :data
		}
	}
	var fetchOptions = {
		credentials: "include",
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(parameterData),
	}
	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}?actionGroup=${actionGroup}&action=${action}&refresh=true&method=update`, fetchOptions)
		.then(
			function (response) {
				if (response.status == 401) {
					var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
					window.open(url, "_self");
				}
				return response.json();
			},
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
}

export async function performActionChild(dataSource, data, recordId, childDs, childId, actionGroup, action, wfParam) {
	var parameterData = {}
	if(data && wfParam){
		parameterData={
			data :data,
			wfParametersMap:wfParam 
		}
	}else{
		parameterData={
			data :data
		}
	}

	var fetchOptions = {
		credentials: "include",
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(parameterData),
	}
	return trackPromise(fetch(
		`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}/${childId}?actionGroup=${actionGroup}&action=${action}&refresh=true&method=update`, fetchOptions)
		.then(function (response) {
				if (response.status == 401) {
					var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
					window.open(url, "_self");
				}
				return response.json();
			},
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
}

export async function postApiCallWithWF(dataSource, data, actionGroup, action, wfParam) {
	var parameterData = {}
	if(data && wfParam){
		parameterData={
			data :data,
			wfParametersMap:wfParam 
		}
	}else{
		parameterData={
			data :data
		}
	}

	var fetchOptions = {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(parameterData),
	}
	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}?actionGroup=${actionGroup}&action=${action}&refresh=true&method=update`, fetchOptions)
		.then(function (response) {
			// check if the request is authorized
			if (response.status == 401) {
				// unauthorized navigate Tririga login page for authentication
				var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
				window.open(url, "_self");
			}
			// get current user data from the response
			return response.json();
		},
		// Note: it's important to handle errors here
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components.
		(error) => {
			console.log("helper-->error::", error);
		}
		)
	);
}

export async function deleteApiCall(dataSource, data, recordId, childDs, actionGroup, action) {
	var fetchOptions = {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ data: data }),
	}
	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}/${childDs}?actionGroup=${actionGroup}&action=${action}&refresh=true&method=delete`, fetchOptions)
		.then(function (response) {
				// check if the request is authorized
				if (response.status == 401) {
					// unauthorized navigate Tririga login page for authentication
					var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
					window.open(url, "_self");
				}

				// get current user data from the response
				return response.json();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
	);
}
export async function updateRecord(dataSource, data, recordId) {
	var fetchOptions = {
		credentials: "include",
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ data: data }),
	}
	return trackPromise(fetch(`${cstConstants.REACT_APP_TRIRIGA_API_URL}${dataSource}/${recordId}?refresh=true&method=update`,fetchOptions)
		.then(function (response) {
			// check if the request is authorized
			if (response.status == 401) {
				// unauthorized navigate Tririga login page for authentication
				var url = cstConstants.REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT;
				window.open(url, "_self");
			}
			// get current user data from the response
			return response.json();
		},
		// Note: it's important to handle errors here
		// instead of a catch() block so that we don't swallow
		// exceptions from actual bugs in components.
		(error) => {
			console.log("helper-->error::", error);
		}
		)
	);
}

export async function uploadImageApiCall(data) {
	const formData = new FormData();
	formData.append("file", data);
	var fetchOptions = {
		method: "POST", 
		credentials: "include", 
		body: formData
	}
	const response = await fetch(`${process.env.REACT_APP_TRIRIGA_IMAGE_UPLOAD_URL}`,fetchOptions);
	return response.json();
}

export async function resetSessionWCred(data) {
	var fetchOptions = {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify( {
			userName:"paras",
			password:"1Password*",
			normal:true
		} ),
	};
	fetch(`${cstConstants.REACT_APP_TRIRIGA_URL}/p/websignon/signon`, fetchOptions)
		.then(function (response) {
				// check if the request is authorized
				console.log('response', response)
				if(response && response.status === 200) {
					window.location.reload();
				}
				// return response.json();
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log("helper-->error::", error);
			}
		)
}

export async function resetSession() {
	window.location.reload()
}
