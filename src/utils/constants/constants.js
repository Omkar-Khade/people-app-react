// url calls
var windowURL = window.location.href;
var envUrl = window.location.origin;
var modelAndViewName = 'cst-onk-people-react';
var appName = "peopleAppReact";
var indexOfAppName = windowURL.indexOf("/p/web/" + appName);
var contextUrl = windowURL.slice(envUrl.length, indexOfAppName);


export var REACT_APP_TRIRIGA_URL = "";
if (process.env.NODE_ENV === "development") {
  REACT_APP_TRIRIGA_URL = "https://jllsa-dev.iwmsapp.com/tririga";
}
else {
  REACT_APP_TRIRIGA_URL = "".concat(envUrl).concat(contextUrl);
}
console.log(REACT_APP_TRIRIGA_URL);
// export const REACT_APP_TRIRIGA_URL = "https://jllsa-dev.iwmsapp.com/tririga";
export const REACT_APP_TRIRIGA_API_URL =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/p/webapi/rest/v2/cst-onk-people-react/-1/");
export const REACT_APP_LOCAL_TRIRIGA_LOGIN_REDIRECT =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/p/websignon?redirectUrl=http%3A%2F%2Flocalhost%3A3000");
export const REACT_APP_TRIRIGA_IMAGE_UPLOAD_URL =
  "".concat(REACT_APP_TRIRIGA_URL).concat("//p/fileupload/uploadimage");
export const REACT_APP_TRIRIGA_FILE_LOC_URL =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/getCompanyFile.jsp?fileLoc=");
export const REACT_APP_OPEN_IN_TRIRIGA =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/WebProcess.srv?objectId=750000&actionId=750011&specId=");
export const REACT_APP_DOCUMENT_DOWNLOAD =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/WebProcess.srv?objectId=410000&actionId=410014&documentID=");
export const REACT_APP_TRIRIGA_IMAGE_URL =
  "".concat(REACT_APP_TRIRIGA_URL).concat("/p/components/r/1/v/en-US/l/cstview-contract-management/");
// ds calls
export const DS_CURRENT_USER = "cstCurrentUserONK";
export const DS_ALL_EMPLOYEE = "cstAllEmployeeONKQRDS";
// export const ALL_CONTRACTS = "allContracts";
// export const DS_INSTANCE_CONTRACT = "instanceContractDetails";
// export const DS_CHILD_PAR_DATE = "parDetails";
// export const DS_CHILD_DOCUMENT_LOG = "documentLog";
// export const DS_CHILD_DEFINITIONS = "definitions";
// export const DS_CHILD_EXECUTIVE_SUMMARIES = "executiveSummaries";
// export const DS_CHILD_LEASE_CLAUSES = "leaseClauses";
// export const DS_CHILD_TITLE_DATE = "titleDate";
// export const DS_CHILD_ORGANIZATION_CONTACTS = "landlordOrganizations";
// export const DS_CHILD_LANDLORD_CONTACTS = "landlordContacts";
// export const DS_CHILD_SELLER_DETAILS = "sellerDetails";
// export const DS_CHILD_REATAIL_LOCATION = "locationDetails";
// export const DS_BUILDING_AND_LAND_SUMMARY = "buildingandLandSummary";
// export const DS_CHILD_PRIMISE_LOCATION = "premiseLocations";
// export const DS_CHILD_OPTION_TYPE = "optionType";
export var SESSION_OUT = ""

export function setSessionOut(value) {
  SESSION_OUT = value
}